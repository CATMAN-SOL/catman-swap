import { createRoute } from '~core/create-route'
import { z } from 'zod'
import { getTokensList } from '~services/tokens.service'

export default createRoute({
  query: z.object({
    skip: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
    searchQuery: z.string().default(''),
  }),
  handler: async ({ query: { limit, skip, searchQuery } }) => {
    return await getTokensList({ limit, skip, searchQuery })
  },
})
