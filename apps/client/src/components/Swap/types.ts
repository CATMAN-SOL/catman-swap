import { Token } from '@/models/token.model'

export type SwapSummaryProps = {
  price: number

  zeroes: boolean

  inAmount: number
  outAmount: number

  loading: boolean

  currentToken: Token
  outToken: Token
}
