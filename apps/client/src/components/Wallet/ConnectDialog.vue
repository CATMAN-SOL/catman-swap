<script lang="ts" setup>
const modelValue = defineModel<boolean>()
const { wallets } = useWallet()
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Connect Wallet"
  >
    <div class="pt-8">
      <span class="font-semibold text-[#A3A7B7]">Popular</span>
      <div class="grid grid-cols-2 grid-rows-[140px_140px] gap-[20px]">
        <button
          v-for="wallet of wallets"
          :key="wallet.adapter.url"
          class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 active:border-theme-dark-gray-5 active:bg-primary-default/10 active:text-primary-default group flex flex-col items-center justify-center gap-3 rounded-2xl border border-transparent py-8 text-white transition-all"
        >
          <img
            class="w-[37px] transition-all group-hover:w-[45px] group-active:!w-[37px]"
            :src="wallet.adapter.icon"
          >
          <span class="text-[16px] font-semibold">{{ wallet.adapter.name }}</span>
        </button>
      </div>
    </div>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
