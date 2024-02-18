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
