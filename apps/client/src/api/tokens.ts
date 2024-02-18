import { Token } from '@/models/token.model'

export const tokens = {
  useTokensList: defineDataEndpoint<
    {
      skip: number
      limit: number
      searchQuery: string
    },
    { data: Token[]; meta: { total: number } }
  >({
    method: 'GET',
    url: '/api/v1/tokens',
    queryBuilder: (input) => input,
  }),
}
