<script lang="ts" setup>
import { Token } from '@/models/token.model'
import catmanLogo from '@/assets/catman-logo.png'
import LinkIcon from '../../../assets/icons/link.svg'
import VirtualScroller from 'primevue/virtualscroller'

const modelValue = defineModel<boolean>()
const emit = defineEmits<{(e: 'select', val: Token): void }>()

const tokenListStore = useTokenListStore()

const throttledFilterApply = useThrottleFn(() => {
  tokenListStore.applyFilter()
}, 1000, true)

watch([() => tokenListStore.filter.verifiedOnly, () => tokenListStore.filter.searchQuery], () => {
  throttledFilterApply()
})

const onVirtualScrollerLazyLoad = async (data: {first: number, last: number}) => {
  await tokenListStore.fetchNextTokensBatch(data)
}

const shortenPublicKey = (publicKey: string) => {
  if (!publicKey) return ''

  const publicKeyString = publicKey.toString()

  return `${publicKeyString.slice(0, 4)}...${publicKeyString.slice(-5, -1)}`
}

const onTokenButtonClick = (token: Token) => {
  modelValue.value = false
  emit('select', token)
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Select Token"
  >
    <div class="flex flex-col items-stretch gap-8 py-8">
      <AppInput
        v-model="tokenListStore.filter.searchQuery"
        placeholder="Search for tokens.."
      />
      <div class="flex flex-col items-stretch gap-4">
        <div class="flex flex-row items-end justify-between">
          <span class="text-theme-white-2 text-[16px] font-semibold">All tokens</span>
          <AppSwitch
            v-model="tokenListStore.filter.verifiedOnly"
            label="Verified tokens only"
          />
        </div>
        <VirtualScroller
          style="width: 100%; height: 400px;"
          :items="tokenListStore.tokensList"
          :item-size="80"
          :delay="0"
          :loading="tokenListStore.tokensListLoading"
          show-loader
          lazy
          @lazy-load="onVirtualScrollerLazyLoad"
        >
          <template #item="{ item }">
            <div style="height: 80px; padding-block: 10px;">
              <button
                v-if="item"
                class="group relative box-border size-full overflow-hidden rounded-[16px] p-2"
                @click="onTokenButtonClick(item)"
              >
                <div class="relative z-[11] box-border grid size-full grid-flow-col grid-cols-[36px_auto_auto_1fr] grid-rows-[1fr_auto] gap-x-3">
                  <div
                    class="row-span-2 aspect-square w-full place-self-center rounded-full bg-cover"
                    :style="{
                      backgroundImage: `url(${item.symbol === 'CATMAN' ? catmanLogo : (item.logoUrl ?? '/unknown-token.svg')})`
                    }"
                  />
                  <div class="font-dmSans text-theme-white-1 self-end text-left text-[16px]">
                    {{ item.symbol }}
                  </div>
                  <div class="self-start text-left text-[10px] text-white/75">
                    {{ item.name }}
                  </div>
                  <div class="row-span-2 hidden h-full place-items-center pl-2 lg:grid">
                    <a
                      target="_blank"
                      :href="`https://solscan.io/token/${item.address}`"
                      class="bg-theme-dark-gray-2 font-inter hover:bg-theme-dark-gray-3 flex flex-row items-center gap-2 rounded-[4px] px-2 py-1 text-[10px] text-white/75 transition-all"
                      @click.stop=""
                    >
                      {{ shortenPublicKey(item.address) }}
                      <img :src="LinkIcon">
                    </a>
                  </div>
                  <div class="row-span-2 lg:hidden" />
                  <div class="row-span-2 flex flex-row items-center justify-end">
                    <AppBadge
                      v-if="!item.tags.find((value: string) => value === 'unknown')"
                      text="Verified"
                      severity="warning"
                    />
                  </div>
                </div>
                <div
                  class="group-hover:bg-theme-dark-gray-4 group-active:bg-primary/10 absolute left-0 top-0 z-[10] size-full transition-all"
                />
                <div
                  class="absolute left-0 top-0 z-[9] size-full"
                  style="background: linear-gradient(90deg, #16191D -3.31%, rgba(22, 25, 29, 0.00) 99.93%);"
                />
              </button>
              <div
                v-else
                style="height: 60px"
              />
            </div>
          </template>
        </VirtualScroller>
      </div>
    </div>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
