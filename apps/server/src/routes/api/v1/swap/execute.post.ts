import { z } from 'zod'
import { createRoute } from '~core/create-route'
import { executeSwapTx } from '~services/swap.service'

export default createRoute({
  body: z.object({
    txHash: z.string(),
    senderPublicKey: z.string(),
  }),
  handler: async ({ body }) => {
    return await executeSwapTx({
      senderPublicKey: body.senderPublicKey,
      txHash: body.txHash,
    })
  },
})
