export const useWalletConnectStore = defineStore('wallet-connect', () => {
  const { wallets } = useWallet()
  const currentConnectingWalletAdapterIndex = ref<number>(-1)

  const displayConnectDialog = ref(false)

  const currentConnectingWalletAdapter = computed(() => {
    return wallets.value[currentConnectingWalletAdapterIndex.value]
  })

  return {
    currentConnectingWalletAdapterIndex,
    currentConnectingWalletAdapter,

    displayConnectDialog,
  }
})
