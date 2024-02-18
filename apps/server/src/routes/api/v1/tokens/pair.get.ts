import { PublicKey } from '@solana/web3.js'
import { z } from 'zod'
import { NotFoundException } from '~/exceptions'
import { createRoute } from '~core/create-route'

export default createRoute({
  query: z.object({
    from: z.string(),
    to: z.string(),
    publicKey: z.string().optional(),
  }),
  handler: async ({ query }) => {
    const queryUrl = new URL('https://price.jup.ag/v4/price')

    queryUrl.searchParams.set('ids', query.from)
    queryUrl.searchParams.set('vsToken', query.to)

    const response = await fetch(queryUrl)
    const priceData = (await response.json()) as {
      data: {
        [key: string]: {
          price: number
        }
      }
    }

    if (!priceData.data[query.from]) {
      throw new NotFoundException()
    }

    const tokenFromPrice = priceData.data[query.from].price

    let fromBalance: null | number = null

    if (query.publicKey) {
      const account = new PublicKey(query.publicKey)
      const info = await rpcConnection.getTokenAccountsByOwner(account, {
        mint: new PublicKey(query.from),
      })

      if (info.value.length > 0) {
        const accountPubKey = info.value[0].pubkey
        const balanceResult =
          await rpcConnection.getTokenAccountBalance(accountPubKey)
        fromBalance = balanceResult.value.uiAmount
      }
    }

    return {
      price: tokenFromPrice,
      fromBalance,
    }
  },
})
