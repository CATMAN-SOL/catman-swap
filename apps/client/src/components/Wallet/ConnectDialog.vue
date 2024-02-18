<script lang="ts" setup>
import { useWalletConnectStore } from '../../store/wallet-connect.store'

const modelValue = defineModel<boolean>()

const { wallets, connected, connecting, connect, select } = useWallet()

const selectedWalletIndex = ref(-1)
const walletConnectStore = useWalletConnectStore()

watch(modelValue, (newValue) => {
  if (newValue) {
    selectedWalletIndex.value = -1
    walletConnectStore.currentConnectingWalletAdapterIndex = -1
  }
})

const onWalletClick = async (index: number) => {
  selectedWalletIndex.value = index

  if (currentSelectedWallet.value?.adapter.name) {
    select(currentSelectedWallet.value?.adapter.name)
    walletConnectStore.currentConnectingWalletAdapterIndex = index

    await nextTick()
    connect()
  }
}

const currentSelectedWallet = computed(() => {
  if (selectedWalletIndex.value < 0) return undefined
  return wallets.value[selectedWalletIndex.value]
})
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Connect Wallet"
  >
    <div
      v-if="!currentSelectedWallet"
      class="pt-8"
    >
      <span class="font-semibold text-[#A3A7B7]">Popular</span>
      <div class="grid grid-cols-2 grid-rows-[140px_140px] gap-[20px]">
        <button
          v-for="(wallet, index) of wallets"
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
