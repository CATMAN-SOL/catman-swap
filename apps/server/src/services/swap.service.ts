import { floatToStringInteger, stringIntegerToFloat } from '../utils/crypto'
import { fetchSwapRouteQuote } from './jupiter.service'
import { findTokenByAddress } from './tokens.service'

export type GetSwapRouteOptions = {
  inputMint: string
  outputMint: string
  amount: number
  slippage: number
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
