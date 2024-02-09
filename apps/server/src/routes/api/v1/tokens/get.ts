import { createRoute } from '~core/create-route'
import { z } from 'zod'
import { getTokensList } from '~services/tokens.service'

export default createRoute({
  query: z.object({
    skip: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
  }),
  handler: async ({ query: { limit, skip } }) => {
    return await getTokensList({ limit, skip })
  },
})
