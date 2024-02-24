export const useSwapSelectorStore = defineStore('swap-selector', () => {
  const active = ref('swap')

  const setActive = (value: string) => {
    active.value = value
  }

  return {
    active,
    setActive,
  }
})
