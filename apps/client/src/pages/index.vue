<script lang="ts" setup>
const displayWalletConnectDialog = ref(false)

const loading = ref(false)

const connectWallet = () => {
  displayWalletConnectDialog.value = true

  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}
</script>

<template>
  <div class="container">
    <WalletConnectDialog v-model="displayWalletConnectDialog" />
    <div class="grid grid-cols-2 pt-16">
      <div class="flex flex-col items-stretch gap-8">
        <h1 class="text-theme-white-1 text-8xl font-semibold tracking-[-4px]">
          Swap & DCA
        </h1>
        <span class="text-theme-white-2 text-lg font-semibold tracking-[1.2px]">Catman : Swap & DCA – Connect your wallet
          for<br> seamless transactions!</span>
        <WalletConnectButton
          :loading="loading"
          :connected="true"
          class="w-1/3"
          @click="connectWallet"
        />
      </div>
      <div>
        <SwapContainer />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
