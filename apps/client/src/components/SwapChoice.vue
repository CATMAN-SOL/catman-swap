<script lang="ts" setup>
import SwapChoice from '../assets/swap-choice.svg'
import StateIndicator from '../assets/state-indicator.svg'
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="relative flex items-center gap-0">
      <div class="size-full rounded-l-3xl bg-[#21262C]" />
      <img
        :src="StateIndicator"
        class="absolute inset-x-0 top-5 -z-10 mx-auto"
        alt=""
      >
      <img
        :src="SwapChoice"
        alt=""
      >
      <div class="size-full w-full rounded-r-3xl bg-[#21262C]" />
    </div>
    <div class="flex items-center gap-0" />
  </div>
</template>

<style lang="scss" scoped>
  .swap-right {
    background:  linear-gradient(270deg, #21262C 12.7%, rgba(33, 38, 44, 0.00) 144.02%)
  }
</style>
