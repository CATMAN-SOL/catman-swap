<script lang="ts" setup>
const modelValue = defineModel<boolean>()

const marketItems = ref([
  {
    maxFee: '0.001',
    name: 'Market',
    description: '85% percentile fees from last 20 blocks',
    selected: false
  },
  {
    maxFee: '0.002',
    name: 'Market',
    description: '85% percentile fees from last 20 blocks',
    selected: false
  },
  {
    maxFee: '0.003',
    name: 'Market',
    description: '85% percentile fees from last 20 blocks',
    selected: false
  }

])
const selectedItem = ref()

const selectItem = (index: number) => {
  marketItems.value.forEach((item, i) => {
    if (i === index) {
      item.selected = true
      selectedItem.value = item
    } else {
      item.selected = false
    }
  })
  selectedItem.value = marketItems.value[index].maxFee
  // modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    text="The priority fee is remitted to the Solana network, enhancing transaction prioritization for expedited execution and improved transaction processing times."
    title="Transaction Priority"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select Transaction Priority
      </p>
      <div class="flex w-full flex-col gap-6">
        <SwapMarketItem
          v-for="(item, index) in marketItems"
          :key="item.name"
          :name="item.name"
          :max-fee="item.maxFee"
          :description="item.description"
          :selected="item.selected"
          @click="selectItem(index)"
        />
      </div>
    </div>
    <AppInput
      v-model="selectedItem"
      class="mt-8"
      label="Custom"
      placeholder="Max 2 SOL"
      type="number"
    />
  </AppDialog>
  <AppButton
    class="mt-8"
    text="Save"
  />
</template>
