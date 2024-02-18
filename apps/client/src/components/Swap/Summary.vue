<script lang="ts" setup>
import { Token } from '@/models/token.model'

const props = defineProps<{
  price: number
  currentToken: Token
}>()
</script>

<template>
  <SwapCard>
    <span class="mb-2 text-base font-semibold text-[#E1D33E]">Summary</span>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">Price</span>
      <span class="text-[#E2E4E9]">{{ props.price }} {{ props.currentToken.symbol }}</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">You will recieve:</span><span class="text-[#E2E4E9]">0.004938 BTC ≈ 299 USDT</span>
    </div>
    <div class="flex items-center justify-between text-[18px] font-semibold tracking-[1.2px]">
      <span class="text-[#A3A5B6]">
        Fee:
      </span>
      <span class="text-[#E1D33E]">
        1 USDT
      </span>
    </div>
  </SwapCard>
</template>
