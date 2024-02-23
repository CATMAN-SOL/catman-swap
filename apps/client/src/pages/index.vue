<script lang="ts" setup>
const displayWalletDisconnectDialog = ref(false)

const walletConnectStore = useWalletConnectStore()

const { connected, connecting } = useWallet()
</script>

<template>
  <div class="container">
    <WalletConnectDialog v-model="walletConnectStore.displayConnectDialog" />
    <WalletDisconnectDialog v-model="displayWalletDisconnectDialog" />
  <div class="grid grid-rows-2 gap-20 pt-16 lg:grid-cols-2 lg:grid-rows-1">
      <div class="flex flex-col items-stretch gap-8">
        <h1 class="text-theme-white-1 text-8xl font-semibold tracking-[-4px]">
          Swap & DCA
        </h1>
        <span class="text-theme-white-2 text-lg font-semibold tracking-[1.2px]">Catman : Swap & DCA – Connect your wallet
          for<br> seamless transactions!</span>
        <WalletConnectButton
          v-if="!connected"
          :loading="walletConnectStore.displayConnectDialog || connecting"
          :connected="true"
          class="max-w-[300px]"
          @click="walletConnectStore.displayConnectDialog = true"
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
