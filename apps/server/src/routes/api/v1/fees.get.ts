import { fetchReferenceFees } from '~/services/jupiter.service'
import { createRoute } from '~core/create-route'

type FeesResponseBody = {
  base: number
}

export default createRoute({
  handler: async (): Promise<FeesResponseBody> => {
    const rawReferenceFees = await fetchReferenceFees()

    if (!rawReferenceFees) {
      return {
        base: 0.0001,
      }
    }

    const minFee = rawReferenceFees.jup.m / 10 ** 9
    const maxFee = rawReferenceFees.jup.h / 10 ** 9

    const avgFee = (minFee + maxFee) / 2

    return {
      base: avgFee,
    }
  },
})
