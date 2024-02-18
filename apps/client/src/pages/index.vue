<script lang="ts" setup>
const displayWalletConnectDialog = ref(false)
const displayWalletDisconnectDialog = ref(false)

const { connected, connecting } = useWallet()

const connectWallet = () => {
  displayWalletConnectDialog.value = true
}
</script>

<template>
  <div class="container">
    <WalletConnectDialog v-model="displayWalletConnectDialog" />
    <WalletDisconnectDialog v-model="displayWalletDisconnectDialog" />
    <div class="grid grid-cols-2 pt-16">
      <div class="flex flex-col items-stretch gap-8">
        <h1 class="text-theme-white-1 text-8xl font-semibold tracking-[-4px]">
          Swap & DCA
        </h1>
        <span class="text-theme-white-2 text-lg font-semibold tracking-[1.2px]">Catman : Swap & DCA – Connect your wallet
          for<br> seamless transactions!</span>
        <WalletConnectButton
          v-if="!connected"
          :loading="displayWalletConnectDialog || connecting"
          :connected="true"
          class="max-w-[300px]"
          @click="connectWallet"
        />
        <WalletAddressButton
          v-else
          class="max-w-[450px]"
          @more-button-click="displayWalletDisconnectDialog = true"
        />
        <SwapChoice />
      </div>
      <div>
        <SwapContainer />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
