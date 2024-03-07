import { Token } from '@/models/token.model'

const BATCH_SIZE = 50

export const useTokenListStore = defineStore('token-list', () => {
  const { fetch: fetchTokensList, loading: tokensListLoading } =
    tokens.useTokensList()

  let currentOffset = 0

  const filter = ref<{
    searchQuery: string
    verifiedOnly: boolean
  }>({
    searchQuery: '',
    verifiedOnly: false,
  })

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
      searchQuery: filter.value.searchQuery.toUpperCase(),
      verifiedOnly: filter.value.verifiedOnly,
      limit: BATCH_SIZE,
      skip,
    })

    currentOffset += response?.data?.length ?? 0

    const _tokensList = [
      ...tokensList.value,
      ...Array.from(
        {
          length: Math.max(
            0,
            response?.meta?.total ?? 0 - tokensList.value.length
          ),
        },
        () => undefined
      ),
    ]

    for (let i = 0; i < (response?.data?.length ?? 0); i++) {
      _tokensList[i + skip] = response?.data[i]
    }

    // console.log(tokensList.value)
    tokensList.value = _tokensList
  }

  const applyFilter = async () => {
    tokensList.value = []
    currentOffset = 0

    await fetchNextTokensBatch({ first: 0, last: BATCH_SIZE })
  }

  return {
    filter,

    tokensList,
    tokensListLoading,

    fetchNextTokensBatch,
    applyFilter,
  }
})
