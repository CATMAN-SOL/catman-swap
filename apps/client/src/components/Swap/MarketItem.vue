<script lang="ts" setup>
import yellowCheck from '../../assets/icons/swap/yellow-check.svg'

const props = defineProps<{
  maxFee: string,
  name: string,
  description: string,
  selected: boolean
}>()
</script>

<template>
  <SwapBaseDialogItem :selected="props.selected">
    <div class="flex flex-col">
      <div class="flex items-start gap-2">
        <span class="text-theme-white-1 text-[18px] font-semibold leading-[28px] tracking-[1.2px]">{{ props.name }}</span>
        <div
          class="bg-theme-dark-gray-5 text-theme-white-1 border-theme-dark-gray-4 cursor-default rounded-md border px-[9px] py-[3px] text-xs"
        >
          Max: {{ props.maxFee }} SOL
        </div>
      </div>
      <span class="text-theme-white-2 text-xs leading-4">{{ props.description }}</span>
    </div>
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
