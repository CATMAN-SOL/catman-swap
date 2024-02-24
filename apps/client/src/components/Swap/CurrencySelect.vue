<script lang="ts" setup>
import { Token } from '@/models/token.model'
import catmanLogo from '@/assets/catman-logo.png'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'

const props = defineProps<{
  label?: string
  currentToken: Token
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="text-base font-semibold text-[#A3A5B6]">{{ props.label }}</span>
    <button class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[#21262C] p-4 transition-all hover:bg-[#2D353F]">
      <div class="flex items-center gap-4">
        <img
          class="aspect-square size-8 rounded-full object-cover"
          :src="currentToken.symbol === 'CATMAN' ? catmanLogo : (currentToken.logoUrl ?? '/unknown-token.svg')"
          alt=""
        >
        <span class="whitespace-nowrap">{{ props.currentToken.symbol }}</span>
      </div>
      <img
        class="size-4"
        :src="ArrowDown"
        alt=""
      >
    </button>
  </div>
</template>
