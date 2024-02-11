<script lang="ts" setup>

</script>

<template>
  <div class="container">
    <div class="grid grid-cols-2 pt-16">
      <div class="flex flex-col items-stretch gap-8">
        <h1 class="text-theme-white-1 text-8xl font-semibold tracking-[-4px]">
          Swap & DCA
        </h1>
        <span class="text-theme-white-2 text-lg font-semibold tracking-[1.2px]">Catman : Swap & DCA – Connect your wallet
          for<br> seamless transactions!</span>
        <WalletConnectButton
          :loading="true"
          class="w-1/3"
        />
      </div>
      <div />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
