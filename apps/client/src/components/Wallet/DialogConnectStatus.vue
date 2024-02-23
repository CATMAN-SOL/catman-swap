<script lang="ts" setup>
import { useWalletConnectStore } from '../../store/wallet-connect.store'

const { connecting, connected, publicKey, wallet: connectedWallet } = useWallet()
const walletConnectStore = useWalletConnectStore()

const wallet = computed(() => {
  if (connectedWallet.value) return connectedWallet.value.adapter
  return walletConnectStore.currentConnectingWalletAdapter?.adapter
})

const shortPublicKey = computed(() => {
  if (!publicKey.value) return ''

  const publicKeyString = publicKey.value.toString()

  return `${publicKeyString.slice(0, 8)}...${publicKeyString.slice(-9, -1)}`
})
</script>

<template>
  <div
    v-if="wallet"
    class="flex flex-col items-stretch gap-8"
  >
    <div
      class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 group flex flex-col items-center justify-center gap-3 rounded-2xl border border-transparent py-8 text-white transition-all"
    >
      <img
        class="w-[37px] transition-all group-hover:w-[45px]"
        :src="wallet.icon"
      >
      <span class="text-[16px] font-semibold">{{ wallet.name }}</span>
    </div>
    <div
      v-if="connecting"
      class="bg-theme-dark-gray-3 flex w-full flex-row items-center justify-between rounded-[16px] px-3 py-2"
    >
      <div class="flex flex-row items-center gap-3 text-[16px] font-semibold">
        <span>Connecting</span>
        <LoadingIcon dot-class="bg-white" />
      </div>
      <AppBadge
        severity="warning"
        text="Please wait"
      />
    </div>
    <div
      v-else-if="connected"
      class="bg-theme-dark-gray-3 flex w-full flex-row items-center justify-between rounded-[16px] px-3 py-2"
    >
      <div class="text-theme-white-2 flex flex-row items-center gap-3 text-[16px] font-semibold">
        <span class="overflow-hidden">{{ shortPublicKey }}</span>
      </div>
      <AppBadge
        severity="success"
        text="Connected"
      />
    </div>
    <slot name="after" />
  </div>
</template>

<style lang="scss" scoped>

</style>
