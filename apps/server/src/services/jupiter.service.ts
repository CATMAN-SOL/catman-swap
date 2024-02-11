import { SwapQuote } from '~models/swap-quote.model'

const JUPITER_API_BASE_URL = 'https://quote-api.jup.ag'

// https://station.jup.ag/docs/apis/swap-api#4-get-the-route-for-a-swap
export type FetchSwapRouteOptions = {
  inputMint: string
  outputMint: string
  amount: string
  slippageBps: number

  platformFeeBps?: number
  onlyDirectRoutes?: boolean
  asLegacyTransaction?: boolean
  maxAccounts?: number
}

type PlainObject = {
  [key: string]: string | number | boolean | undefined
}

export const fetchSwapRouteQuote = async (options: FetchSwapRouteOptions) => {
  const urlSearchParams = createUrlSearchParamsFromPlainObject(options)
  const url = new URL(`/v6/quote?${urlSearchParams}`, JUPITER_API_BASE_URL)

  const response = await fetch(url)
  const responseBody = await response.json()

  return responseBody as SwapQuote
}

// Is required as URLSearchParams constructor can only accept Record<string,string>
// TODO: move to utils/
const createUrlSearchParamsFromPlainObject = (obj: PlainObject) => {
  const objEntries = Object.entries(obj)

  const searchParamsEntries = objEntries
    .map<[string, string] | []>(([key, value]) => {
      if (typeof value === 'undefined') {
        return []
      }

      if (typeof value === 'object') {
        throw new Error('Cannot convert object to URLSearchParams entry')
      }

      return [key, String(value)]
    })
    .filter((val) => val.length !== 0)

  return new URLSearchParams(searchParamsEntries)
}
