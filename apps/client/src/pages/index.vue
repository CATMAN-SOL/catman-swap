<script lang="ts" setup>
const displayWalletDisconnectDialog = ref(false)

const walletConnectStore = useWalletConnectStore()

const { connected, connecting } = useWallet()

const sectionRefEl = ref<HTMLElement | null>(null)

const scrollTo = (view: HTMLElement | null) => {
  console.log('test')
  console.log(view)
  view?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="container px-3 pb-28 lg:px-0">
    <WalletConnectDialog v-model="walletConnectStore.displayConnectDialog" />
    <WalletDisconnectDialog v-model="displayWalletDisconnectDialog" />
    <div class="grid grid-rows-1 gap-5 pt-16 lg:grid-cols-2 lg:grid-rows-1 lg:gap-20">
      <div class="flex flex-col gap-8">
        <h1 class="text-theme-white-1 text-[56px] font-semibold tracking-[-4px] lg:text-8xl">
          Swap & DCA
        </h1>
        <span class="text-theme-white-2 text-sm font-semibold tracking-[1.2px] lg:text-lg">Catman : Swap & DCA – Connect your wallet
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
        <SwapChoice @click="scrollTo(sectionRefEl)" />
      </div>
      <section ref="sectionRefEl">
        <SwapContainer />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
