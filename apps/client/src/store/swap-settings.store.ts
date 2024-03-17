import clone from 'lodash/clone'

export type AdditionalOptions = {
  directRouteOnly: boolean
  useWrappedSol: boolean
  versionedTransaction: boolean
}

export const useSwapSettingsStore = defineStore('swap-settings', () => {
  const { fetch: fetchBaseFee, result: baseFeeResult } = fee.useBaseFee()

  const baseMarketFee = computed<number>(
    () => baseFeeResult.value?.base ?? 0.0001
  )
  const customPriorityFee = ref<number>(0.0001)

  const defaultPriorityFeeOptions = computed(
    () =>
      ({
        market: {
          maxFee: baseMarketFee.value,
          name: 'Market',
          description: '85% percentile fees from last 20 blocks',
        },
        high: {
          maxFee: baseMarketFee.value * 5,
          name: 'High',
          description: '5x Market fee',
        },
        turbo: {
          maxFee: baseMarketFee.value * 10,
          name: 'Turbo',
          description: '10x Market fee',
        },
      }) as const
  )

  const customPriorityFeeOption = computed(() => ({
    maxFee: customPriorityFee.value ?? baseMarketFee.value,
    name: 'Custom',
    description: 'Custom value',
  }))

  const priorityFeeOptions = computed(() => ({
    ...defaultPriorityFeeOptions.value,
    custom: customPriorityFeeOption.value,
  }))

  const priorityFee = computed<number>(() => {
    return priorityFeeOptions.value[priorityFeeType.value].maxFee
  })

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

  const priorityFeeType = ref<keyof typeof priorityFeeOptions.value>('market')
  const slippage = ref(0.3)

  const displayedSelectedPriorityFeeName = computed(() => {
    return priorityFeeOptions.value[priorityFeeType.value].name
  })

  const updatePriorityFeeType = (
    value: keyof typeof priorityFeeOptions.value
  ) => {
    priorityFeeType.value = value
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
    priorityFeeType,
    customPriorityFee,

    updatePriorityFeeType,
    defaultPriorityFeeOptions,
    priorityFeeOptions,
    displayedSelectedPriorityFeeName,

    slippage,
    updateSlippage,
    defaultSlippageOptions,

    additionalOptions,
    updateAdditionalOptions,

    fetchBaseFee,
  }
})
