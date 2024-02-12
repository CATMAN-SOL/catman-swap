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

export type CreateSwapTxOptions = {
  quote: object
  publicKey: string
  wrapAndUnwrapSol: boolean
}

export type GetSwapRouteOptions = {
  inputMint: string
  outputMint: string
  amount: number
  slippage: number
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
  })

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
  })

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
