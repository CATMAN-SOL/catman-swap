<script lang="ts" setup>
const modelValue = defineModel<boolean>()

const slippageItems = ref([
  {
    value: '0.3',
    selected: false
  },
  {
    value: '0.5',
    selected: false
  },
  {
    value: '1',
    selected: false
  }
])
const selectedItem = ref()

const selectItem = (index: number) => {
  slippageItems.value.forEach((item, i) => {
    if (i === index) {
      item.selected = true
      selectedItem.value = item
    } else {
      item.selected = false
    }
  })
  selectedItem.value = slippageItems.value[index].value
  // modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    text="Your transaction will revert if price changes unfavorably by more than this percentage."
    title="Slippage Settings"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select Slippage Value
      </p>
      <div class="flex w-full flex-col gap-6">
        <SwapSlippageItem
          v-for="(item, index) in slippageItems"
          :key="item.value"
          :value="item.value"
          :selected="item.selected"
          @click="selectItem(index)"
        />
      </div>
    </div>
  </AppDialog>
</template>
