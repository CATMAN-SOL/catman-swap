import { z } from 'zod'
import { createRoute } from '~core/create-route'
import { createSwapTx } from '~services/swap.service'

export default createRoute({
  body: z.object({
    quote: z.any().refine((val) => typeof val === 'object'),
    publicKey: z.string(),
    wrapAndUnwrapSol: z.boolean().default(true),
  }),
  handler: async ({ body }) => {
    const tx = await createSwapTx({
      quote: body.quote as object,
      publicKey: body.publicKey,
      wrapAndUnwrapSol: body.wrapAndUnwrapSol,
    })

    return {
      tx,
    }
  },
})
