<script lang="ts" setup>
const modelValue = defineModel<boolean>()

const { wallets, connecting, connected, connect, select, publicKey } = useWallet()

const selectedWalletIndex = ref(-1)

watch(modelValue, (newValue) => {
  if (newValue) {
    selectedWalletIndex.value = -1
  }
})

const onWalletClick = async (index: number) => {
  selectedWalletIndex.value = index

  if (currentSelectedWallet.value?.adapter.name) {
    select(currentSelectedWallet.value?.adapter.name)

    await connect()
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
    <div
      v-else
      class="flex flex-col items-stretch gap-8"
    >
      <div
        class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 group flex flex-col items-center justify-center gap-3 rounded-2xl border border-transparent py-8 text-white transition-all"
      >
        <img
          class="w-[37px] transition-all group-hover:w-[45px]"
          :src="currentSelectedWallet.adapter.icon"
        >
        <span class="text-[16px] font-semibold">{{ currentSelectedWallet.adapter.name }}</span>
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
          <span>{{ publicKey }}</span>
        </div>
        <AppBadge
          severity="success"
          text="Connected"
        />
      </div>
      <AppButton
        v-if="connected"
        @click="modelValue = false"
      >
        Proceed
      </AppButton>
    </div>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
