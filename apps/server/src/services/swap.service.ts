import { config } from '~config'
import { floatToStringInteger, stringIntegerToFloat } from '~utils/crypto'
import { ReferralProvider } from '@jup-ag/referral-sdk'
import {
  createSerializedSwapTransaction,
  fetchSwapRouteQuote,
} from './jupiter.service'
import { findTokenByAddress } from './tokens.service'
import { decode as decodeBase58, encode as encodeBase58 } from 'bs58'
import {
  Keypair,
  PublicKey,
  Signer,
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import { swapRequests } from '~/db/schema'
import { SwapQuote } from '~/models/swap-quote.model'
import { createUserIfNotExists } from './users.service'
import { executeSignedTransaction } from './transactions.service'
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'

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
  quote: SwapQuote
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
    platformFeeBps: config.FEE_ACCOUNT ? 10 : undefined,
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
  let feeAccount: string | undefined

  if (config.FEE_ACCOUNT) {
    const mint = new PublicKey(options.quote.outputMint)

    const programFindResult = PublicKey.findProgramAddressSync(
      [
        Buffer.from('referral_ata'),
        // your referral account public key
        new PublicKey(config.FEE_ACCOUNT).toBuffer(),
        // the token mint, output mint for ExactIn, input mint for ExactOut.
        mint.toBuffer(),
      ],
      new PublicKey('REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3')
    )

    const feeAccountPubKey = programFindResult[0]
    const accountInfo = await rpcConnection.getAccountInfo(feeAccountPubKey)

    if (accountInfo) {
      feeAccount = feeAccountPubKey.toString()
    } else if (
      config.FEE_ACCOUNT_PRIVATE_KEY &&
      config.FEE_ACCOUNT_PUBLIC_KEY
    ) {
      const keypair = Keypair.fromSecretKey(
        decodeBase58(config.FEE_ACCOUNT_PRIVATE_KEY)
      )

      const provider = new ReferralProvider(rpcConnection)

      const createTokenAccountTransaction =
        await provider.initializeReferralTokenAccount({
          mint,
          payerPubKey: new PublicKey(config.FEE_ACCOUNT_PUBLIC_KEY),
          referralAccountPubKey: new PublicKey(config.FEE_ACCOUNT),
        })

      await sendAndConfirmTransaction(
        rpcConnection,
        createTokenAccountTransaction.tx,
        [keypair]
      )

      feeAccount = feeAccountPubKey.toString()
    }
  }

  const base64SerializedTransaction = await createSerializedSwapTransaction({
    quoteResponse: options.quote,
    userPublicKey: options.publicKey,
    wrapAndUnwrapSol: !options.wrapAndUnwrapSol,
    feeAccount: feeAccount || undefined,
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
  const senderPublicKey = new PublicKey(options.senderPublicKey)

  const executeResult = await executeSignedTransaction({
    transaction: tx,
    senderPublicKey,
  })

  const outputToken = await findTokenByAddress(options.quote.outputMint)

  if (outputToken?.symbol === 'CATMAN' && config.FEE_ACCOUNT) {
    sendSwapRewards(
      options.quote,
      new PublicKey(options.senderPublicKey)
    ).catch((err) => logger.error(err))
  }

  return executeResult
}

const sendSwapRewards = async (
  quote: SwapQuote,
  senderPublicKey: PublicKey
) => {
  logger.info(`Sending swap rewards for ${senderPublicKey.toString()}`)

  const outputToken = await findTokenByAddress(quote.outputMint)

  if (
    !(
      config.CATPOINT_TOKEN_ADDRESS &&
      config.FEE_ACCOUNT_PRIVATE_KEY &&
      config.FEE_ACCOUNT_PUBLIC_KEY &&
      outputToken
    )
  ) {
    logger.info('Invalid configuration. Could not send swap rewards')
    return
  }

  const catpointTokenAddress = new PublicKey(config.CATPOINT_TOKEN_ADDRESS)
  const feeAccountPublicKey = new PublicKey(config.FEE_ACCOUNT_PUBLIC_KEY)

  const keypair = new Keypair({
    publicKey: decodeBase58(config.FEE_ACCOUNT_PUBLIC_KEY),
    secretKey: decodeBase58(config.FEE_ACCOUNT_PRIVATE_KEY),
  })

  const ownerAta = getAssociatedTokenAddressSync(
    catpointTokenAddress,
    feeAccountPublicKey
  )

  const ownerAtaAccountInfo = await rpcConnection.getAccountInfo(ownerAta)

  if (!ownerAtaAccountInfo) {
    logger.info(
      'No CATPOINT owner associated account. Could not send swap rewards'
    )
    return
  }

  const transaction = new Transaction()

  const senderAta = getAssociatedTokenAddressSync(
    catpointTokenAddress,
    senderPublicKey
  )

  const senderAtaInfo = await rpcConnection.getAccountInfo(senderAta)

  if (!senderAtaInfo) {
    logger.info('Sender ATA not found. Creating one')
    transaction.add(
      createAssociatedTokenAccountInstruction(
        feeAccountPublicKey,
        senderAta,
        senderPublicKey,
        catpointTokenAddress
      )
    )
  }

  const outAmount = stringIntegerToFloat(quote.outAmount, outputToken.decimals)
  const feeAmount = (outAmount / 0.999) * 0.001
  const catmanRewardAmount = feeAmount / 5
  const rewardAmount = catmanRewardAmount * 100

  transaction.add(
    createTransferInstruction(
      ownerAta,
      senderAta,
      feeAccountPublicKey,
      BigInt(floatToStringInteger(rewardAmount, 8))
    )
  )

  transaction.feePayer = new PublicKey(feeAccountPublicKey)

  logger.info(
    `Sending swap reward transaction for ${senderPublicKey.toString()}`
  )
  await trySendAndConfirmTx(transaction, keypair)
  logger.info(
    `Successfully sended swap reward for ${senderPublicKey.toString()}`
  )
}

const trySendAndConfirmTx = async (
  tx: Transaction,
  signer: Signer,
  maxRetries: number = 3
) => {
  for (; maxRetries >= 0; maxRetries--) {
    const blockhashData = await rpcConnection.getLatestBlockhash()
    tx.recentBlockhash = blockhashData.blockhash

    try {
      await sendAndConfirmTransaction(rpcConnection, tx, [signer])
      break
    } catch (e) {
      logger.info(e, 'Failed to send CATPoint reward tx. Retrying...')
    }
  }
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
