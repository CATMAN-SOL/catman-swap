<script lang="ts" setup>
import yellowCheck from '../../assets/icons/swap/yellow-check.svg'

const props = defineProps<{
  selected: boolean,
  value: string,
}>()
</script>

<template>
  <SwapBaseDialogItem :selected="props.selected">
    <span class="text-theme-white-1 text-[18px] font-semibold leading-[28px] tracking-[1.2px]">{{ props.value }}% Slippage</span>
    <div>
      <div
        v-if="!props.selected"
        class="bg-theme-dark-gray-3 border-theme-dark-gray-5 box-border size-4 rounded-full border"
      />
      <img
        v-if="props.selected"
        class="size-4"
        :src="yellowCheck"
        alt=""
      >
    </div>
  </SwapBaseDialogItem>
</template>
