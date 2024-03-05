import clone from 'lodash/clone'

export type AdditionalOptions = {
  directRouteOnly: boolean
  useWrappedSol: boolean
  versionedTransaction: boolean
}

export const useSwapSettingsStore = defineStore('swap-settings', () => {
  const defaultPriorityFeeOptions = ref([
    {
      maxFee: '0.0001',
      name: 'Market',
      description: '85% percentile fees from last 20 blocks',
    },
    {
      maxFee: '0.0005',
      name: 'High',
      description: '5x Market fee',
    },
    {
      maxFee: '0.001',
      name: 'Turbo',
      description: '10x Market fee',
    },
  ])

  const defaultSlippageOptions = ref([
    {
      value: '0.3',
    },
    {
      value: '0.5',
    },
    {
      value: '1',
    },
  ])

  const additionalOptions = ref<AdditionalOptions>({
    directRouteOnly: false,
    useWrappedSol: false,
    versionedTransaction: true,
  })

  const priorityFee = ref(0.0001)
  const slippage = ref(0.5)

  const displayedSelectedPriorityFeeName = computed(() => {
    const priorityFeeString = priorityFee.value.toString()
    return (
      defaultPriorityFeeOptions.value.find(
        (val) => val.maxFee === priorityFeeString
      )?.name ?? 'Custom'
    )
  })

  const updatePriorityFee = (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value
    if (Number.isNaN(parsedValue)) return
    priorityFee.value = parsedValue
  }

  const updateSlippage = (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value
    if (Number.isNaN(parsedValue)) return
    slippage.value = parsedValue
  }

  const updateAdditionalOptions = (options: AdditionalOptions) => {
    additionalOptions.value = clone(options)
  }

  return {
    priorityFee,
    updatePriorityFee,
    defaultPriorityFeeOptions,
    displayedSelectedPriorityFeeName,

    slippage,
    updateSlippage,
    defaultSlippageOptions,

    additionalOptions,
    updateAdditionalOptions,
  }
})
