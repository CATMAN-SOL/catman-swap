import { Token } from '@/models/token.model'

export type SwapSummaryProps = {
  zeroes: boolean

  inAmount: number
  outAmount: number

  loading: boolean

  currentToken: Token
  outToken: Token
}

export type DcaOptions = {
  rate: number
  rateDenominator: number
  ordersCount: number

  minAmountPerCycle?: number
  maxAmountPerCycle?: number
}
