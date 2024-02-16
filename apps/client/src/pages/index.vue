<script lang="ts" setup>
const displayConnectWalletDialog = ref(false)

const loading = ref(false)

const connectWallet = () => {
  displayConnectWalletDialog.value = true

  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}
</script>

<template>
  <div class="container">
    <AppDialog
      v-model="displayConnectWalletDialog"
      title="Transaction Priority"
      text="The priority fee is remitted to the Solana network, enhancing transaction prioritization for expedited execution and improved transaction processing times."
    />
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
