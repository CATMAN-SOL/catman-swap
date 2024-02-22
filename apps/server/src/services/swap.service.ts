import { config } from '~config'
import { floatToStringInteger, stringIntegerToFloat } from '~utils/crypto'
import { BadRequestException } from '../exceptions'
import {
  createSerializedSwapTransaction,
  fetchSwapRouteQuote,
} from './jupiter.service'
import { findTokenByAddress } from './tokens.service'
import { decode as decodeBase58, encode as encodeBase58 } from 'bs58'
import { VersionedTransaction } from '@solana/web3.js'
import { swapRequests } from '~/db/schema'
import { SwapQuote } from '~/models/swap-quote.model'
import { createUserIfNotExists } from './users.service'

export type CreateSwapTxOptions = {
  quote: SwapQuote
  publicKey: string
  wrapAndUnwrapSol: boolean
  prioritizationFee?: number
}

export type GetSwapRouteOptions = {
  inputMint: string
  outputMint: string
  amount: number
  slippage: number
  onlyDirectRoute: boolean
}

export type ExecuteSwapTxOptions = {
  txHash: string
  senderPublicKey: string
}

export const getSwapRoute = async (options: GetSwapRouteOptions) => {
  const inputMintToken = await findTokenByAddress(options.inputMint)

  if (!inputMintToken) {
    throw new Error("Input mint token hasn't been found")
  }

  const outputMintToken = await findTokenByAddress(options.outputMint)

  if (!outputMintToken) {
    throw new Error("Output mint token hasn't been found")
  }

  const amount = floatToStringInteger(options.amount, inputMintToken.decimals)

  const quote = await fetchSwapRouteQuote({
    inputMint: options.inputMint,
    outputMint: options.outputMint,
    amount: amount.toString(),
    slippageBps: Math.round(options.slippage * 100),
    platformFeeBps: 80,
    onlyDirectRoutes: options.onlyDirectRoute,
  })

  if ('error' in quote) {
    return {
      error: 'No routes found',
    }
  }

  const parsedInAmount = stringIntegerToFloat(
    quote.inAmount,
    inputMintToken.decimals
  )

  const parsedOutAmount = stringIntegerToFloat(
    quote.outAmount,
    outputMintToken.decimals
  )

  return {
    inAmount: parsedInAmount,
    outAmount: parsedOutAmount,
    quote,
  }
}

export const createSwapTx = async (options: CreateSwapTxOptions) => {
  const base64SerializedTransaction = await createSerializedSwapTransaction({
    quoteResponse: options.quote,
    userPublicKey: options.publicKey,
    wrapAndUnwrapSol: options.wrapAndUnwrapSol,
    feeAccount: config.FEE_ACCOUNT,
    prioritizationFeeLamports: options.prioritizationFee
      ? options.prioritizationFee * 10 ** 9
      : 'auto',
  })

  await saveCreateSwapTransactionRequest(options)

  // Re-serializing base64 -> base58 due to issues with decoding base64 on front-end side and bs58 package
  // already being a dependency of @solana/web3.js
  const serializedTransaction = Buffer.from(
    base64SerializedTransaction,
    'base64'
  )

  return encodeBase58(serializedTransaction)
}

export const executeSwapTx = async (options: ExecuteSwapTxOptions) => {
  const serializedTx = decodeBase58(options.txHash)
  const tx = VersionedTransaction.deserialize(serializedTx)

  const simulationResult = await trySimulateTransaction(tx)

  if (!simulationResult.success) {
    throw new BadRequestException({
      reason: 'simulation_failed',
      simulationResult,
    })
  }

  const txSignature = await rpcConnection.sendRawTransaction(tx.serialize())

  const blockhashData = await rpcConnection.getLatestBlockhash()

  const response = await rpcConnection.confirmTransaction({
    blockhash: blockhashData.blockhash,
    lastValidBlockHeight: blockhashData.lastValidBlockHeight,
    signature: txSignature,
  })

  const responseError = response.value.err

  if (responseError) {
    throw new BadRequestException({
      reason: 'transaction_failed',
      responseError,
    })
  }

  return txSignature
}

const saveCreateSwapTransactionRequest = async (
  options: CreateSwapTxOptions
) => {
  await createUserIfNotExists(options.publicKey)

  await dbClient.insert(swapRequests).values({
    userAddress: options.publicKey,
    tokenFromAddress: options.quote.inputMint,
    tokenToAddress: options.quote.outputMint,
    amountFrom: options.quote.inAmount,
    amountTo: options.quote.outAmount,
  })
}

const trySimulateTransaction = async (
  tx: VersionedTransaction
): Promise<
  | ({ success: false } & ({ simulationError: any } | { error: any }))
  | { success: true }
> => {
  try {
    const simulationResult = await rpcConnection.simulateTransaction(tx, {
      sigVerify: true,
    })

    const simulationError = simulationResult.value.err

    if (simulationError) {
      return {
        success: false,
        simulationError,
      }
    }

    return {
      success: true,
    }
  } catch (e) {
    return {
      success: false,
      error: (e as any).message,
    }
  }
}
