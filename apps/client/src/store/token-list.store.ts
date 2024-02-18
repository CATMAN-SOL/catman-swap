import { Token } from '@/models/token.model'

const BATCH_SIZE = 50

export const useTokenListStore = defineStore('token-list', () => {
  const { fetch: fetchTokensList, loading: tokensListLoading } =
    tokens.useTokensList()

  let currentOffset = 0

  const searchQuery = ref<string>('')
  const tokensList = ref<(Token | undefined)[]>([])

  const fetchNextTokensBatch = async ({
    first,
    last,
  }: {
    first: number
    last: number
  }) => {
    if (
      !(first > currentOffset || last > currentOffset) &&
      currentOffset !== 0
    ) {
      return
    }

    const skip = currentOffset

    const response = await fetchTokensList({
      searchQuery: searchQuery.value,
      limit: BATCH_SIZE,
      skip,
    })

    currentOffset += response.data.length

    const _tokensList = [
      ...tokensList.value,
      ...Array.from(
        {
          length: Math.max(0, response.meta.total - tokensList.value.length),
        },
        () => undefined
      ),
    ]

    for (let i = 0; i < response.data.length; i++) {
      _tokensList[i + skip] = response.data[i]
    }

    // console.log(tokensList.value)
    tokensList.value = _tokensList
  }

  const updateTokenSearchQueryAndFetch = async (newSearchQuery: string) => {
    searchQuery.value = newSearchQuery
    tokensList.value = []
    currentOffset = 0

    await fetchNextTokensBatch()
  }

  return {
    tokensList,
    tokensListLoading,

    fetchNextTokensBatch,
    updateTokenSearchQueryAndFetch,
  }
})
