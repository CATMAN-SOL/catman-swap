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
      onlyDirectRoute?: boolean
    },
    | {
        inAmount: number
        outAmount: number
        quote: any
      }
    | {
        error: string
      }
  >({
    method: 'GET',
    url: '/api/v1/swap/route',
    queryBuilder: ({ amount, from, slippage, to, onlyDirectRoute }) => ({
      inputMint: from,
      outputMint: to,
      slippage,
      amount: amount ?? 0,
      onlyDirectRoute,
    }),
  }),
  useTokensPairInfo: defineDataEndpoint<
    {
      from: string
      to: string
      publicKey?: string
      useWrappedSol?: boolean
    },
    { price: number; fromBalance?: number }
  >({
    method: 'GET',
    url: '/api/v1/tokens/pair',
    queryBuilder: (input) => input,
  }),
}
