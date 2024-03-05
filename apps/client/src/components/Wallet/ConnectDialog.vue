<script lang="ts" setup>
import { useWalletConnectStore } from '../../store/wallet-connect.store'

const modelValue = defineModel<boolean>()
const windowFocus = useWindowFocus()

const { wallets, connected, connecting, connect, select } = useWallet()

const priorityWalletNames = [
  'Phantom',
  'Solflare',
  'Coinbase Wallet',
  'Ledger'
]

const selectedWalletIndex = ref(-1)
const walletConnectStore = useWalletConnectStore()

watch(modelValue, (newValue) => {
  if (newValue) {
    selectedWalletIndex.value = -1
    walletConnectStore.currentConnectingWalletAdapterIndex = -1
  }
})

watch([wallets, windowFocus], ([newWallets]) => {
  for (let i = 0; i < newWallets.length; i++) {
    if (newWallets[i].adapter.publicKey !== null) {
      select(newWallets[i].adapter.name)
      walletConnectStore.currentConnectingWalletAdapterIndex = i

      connect()
    }
  }
}, { deep: true, immediate: true })

const onWalletClick = async (index: number) => {
  selectedWalletIndex.value = index

  if (currentSelectedWallet.value?.adapter.name) {
    select(currentSelectedWallet.value?.adapter.name)
    walletConnectStore.currentConnectingWalletAdapterIndex = index

    await nextTick()
    await connect()
  }
}

const currentSelectedWallet = computed(() => {
  if (selectedWalletIndex.value < 0) return undefined
  return wallets.value[selectedWalletIndex.value]
})

const priorityWallets = computed(() => {
  return priorityWalletNames.map(name => {
    const walletIndex = wallets.value.findIndex(wallet => wallet.adapter.name === name)
    return [wallets.value[walletIndex]!, walletIndex] as const
  })
})

const nonPriorityWallets = computed(() => {
  return wallets.value
    .map((value, index) => ([value, index] as const))
    .filter(([value]) => !priorityWalletNames.includes(value.adapter.name))
})
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Connect Wallet"
  >
    <div
      v-if="!currentSelectedWallet"
      class="flex flex-col items-stretch gap-4 pt-8"
    >
      <span class="font-semibold text-[#A3A7B7]">Popular</span>
      <div class="grid grid-cols-2 grid-rows-[140px_140px] gap-[20px]">
        <button
          v-for="([wallet, index]) of priorityWallets"
          :key="wallet.adapter.url"
          class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 active:border-theme-dark-gray-5 active:bg-primary-default/10 active:text-primary-default group flex flex-col items-center justify-center gap-3 rounded-2xl border border-transparent py-8 text-white transition-all"
          @click="onWalletClick(index)"
        >
          <img
            class="w-[37px] transition-all group-hover:w-[45px] group-active:!w-[37px]"
            :src="wallet.adapter.icon"
          >
          <span class="text-[16px] font-semibold">{{ wallet.adapter.name }}</span>
        </button>
      </div>
      <span class="font-semibold text-[#A3A7B7]">All wallets</span>
      <div class="flex flex-col items-stretch gap-3">
        <button
          v-for="([wallet, index]) of nonPriorityWallets"
          :key="wallet.adapter.url"
          class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 active:border-theme-dark-gray-5 active:bg-primary-default/10 active:text-primary-default flex flex-row items-center justify-start gap-4 rounded-[16px] p-4 text-white transition-all"
          @click="onWalletClick(index)"
        >
          <img
            class="w-[37px] transition-all group-hover:w-[45px] group-active:!w-[37px]"
            :src="wallet.adapter.icon"
          >
          <span class="text-[16px] font-semibold">{{ wallet.adapter.name }}</span>
        </button>
      </div>
    </div>
    <WalletDialogConnectStatus>
      <template #after>
        <AppButton
          v-if="connected || (!connecting && !connected)"
          @click="modelValue = false"
        >
          Proceed
        </AppButton>
      </template>
    </WalletDialogConnectStatus>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
