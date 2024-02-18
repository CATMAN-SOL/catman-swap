<script lang="ts" setup>
import { Token } from '@/models/token.model'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'

const props = defineProps<{
  label?: string
  currentToken: Token
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="text-base font-semibold text-[#A3A5B6]">{{ props.label }}</span>
    <button class="flex cursor-pointer items-center gap-4 rounded-2xl bg-[#21262C] p-4 transition-all hover:bg-[#2D353F]">
      <img
        class="size-8"
        :src="props.currentToken.logoUrl ?? '/unknown-token.svg'"
        alt=""
      >
      <span class="whitespace-nowrap">{{ props.currentToken.symbol }}</span>
      <img
        class="size-4"
        :src="ArrowDown"
        alt=""
      >
    </button>
  </div>
</template>
