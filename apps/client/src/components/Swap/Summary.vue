<script lang="ts" setup>
import { SwapSummaryProps } from './types'

const props = defineProps<SwapSummaryProps>()
</script>

<template>
  <SwapCard>
    <div class="mb-2 flex flex-row items-center gap-2 text-base font-semibold text-[#E1D33E]">
      Summary <LoadingIcon
        v-if="props.loading"
        dot-class="bg-primary"
        class="scale-75"
      />
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">Price</span>
      <span class="text-[#E2E4E9]">{{ props.inAmount }} {{ props.currentToken.symbol }}</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">You will recieve:</span><span class="text-[#E2E4E9]">
        {{ props.inAmount > 0 && !props.zeroes ? `${outAmount.toFixed(4)} ${props.outToken.symbol}` : `0 ${props.outToken.symbol}` }}
      </span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">
        Fee:
      </span>
      <span class="text-[#E1D33E]">
        {{ props.zeroes ? 0 : (props.outAmount / 0.999) }} {{ props.outToken.symbol }}
      </span>
    </div>
  </SwapCard>
</template>
