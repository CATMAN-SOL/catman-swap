<script lang="ts" setup>
import { DcaOptions, SwapSummaryProps } from './types'

const props = defineProps<SwapSummaryProps & {
  // Optional because of TS issues
  dcaOptions?: DcaOptions
}>()
</script>

<template>
  <SwapCard v-if="props.dcaOptions">
    <div class="mb-2 flex flex-row items-center gap-2 text-base font-semibold text-[#E1D33E]">
      Summary <LoadingIcon
        v-if="props.loading"
        dot-class="bg-primary"
        class="scale-75"
      />
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">DCA Input</span>
      <span class="text-[#E2E4E9]">{{ props.inAmount }} {{ props.currentToken.symbol }}</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">Orders count</span>
      <span class="text-[#E2E4E9]">{{ props.dcaOptions.ordersCount }}</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">Time between orders</span>
      <span class="text-[#E2E4E9]">{{ props.dcaOptions.rate * props.dcaOptions.rateDenominator }}s</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">Order amount</span>
      <span class="text-[#E2E4E9]">{{ props.inAmount / props.dcaOptions.ordersCount }} {{ props.currentToken.symbol }}</span>
    </div>
    <div
      v-if="props.dcaOptions.minAmountPerCycle"
      class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]"
    >
      <span class="text-[#A3A5B6]">Minimum output amount per order</span>
      <span class="text-[#E2E4E9]">{{ props.dcaOptions.minAmountPerCycle }} {{ props.currentToken.symbol }}</span>
    </div>
    <div
      v-if="props.dcaOptions.maxAmountPerCycle"
      class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]"
    >
      <span class="text-[#A3A5B6]">Maximum output amount per order</span>
      <span class="text-[#E2E4E9]">{{ props.dcaOptions.maxAmountPerCycle }} {{ props.currentToken.symbol }}</span>
    </div>
  </SwapCard>
</template>

<style lang="scss" scoped>

</style>
