import { Token } from '@/models/token.model'

export const tokens = {
  useTokensList: defineDataEndpoint<
    {
      skip: number
      limit: number
      searchQuery?: string
      verifiedOnly?: boolean
    },
    { data: Token[]; meta: { total: number } }
  >({
    method: 'GET',
    url: '/api/v1/tokens',
    queryBuilder: (input) => input,
  }),
  useTokensRouteInfo: defineDataEndpoint<
    {
      from: string
      to: string
      amount: number
      slippage: number
    },
    {
      inAmount: number
      outAmount: number
      quote: any
    }
  >({
    method: 'GET',
    url: '/api/v1/swap/route',
    queryBuilder: ({ amount, from, slippage, to }) => ({
      inputMint: from,
      outputMint: to,
      slippage,
      amount: amount ?? 0,
    }),
  }),
  useTokensPairInfo: defineDataEndpoint<
    {
      from: string
      to: string
      publicKey?: string
    },
    { price: number; fromBalance?: number }
  >({
    method: 'GET',
    url: '/api/v1/tokens/pair',
    queryBuilder: (input) => input,
  }),
}
