export interface Token {
  address: string
  chainId: number
  decimals: number
  name: string
  symbol: string
  logoUrl: string
  tags: string[]
  extensions: any
  removed: boolean
  createdAt: string
}
