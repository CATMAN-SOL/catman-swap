export const useSwapSelectorStore = defineStore('swap-selector', () => {
  const active = ref<'swap' | 'dca'>('swap')

  const setActive = (value: 'swap' | 'dca') => {
    active.value = value
  }

  return {
    active,
    setActive,
  }
})
