<script lang="ts" setup>
import yellowCheck from '../../assets/icons/swap/yellow-check.svg'
const props = defineProps<{
  selected: boolean,
  name: string,
  url: string
}>()
</script>

<template>
  <SwapBaseDialogItem :selected="props.selected">
    <div class="flex items-center gap-2">
      <span class="text-theme-white-1 text-[18px] font-semibold leading-[28px] tracking-[1.2px]">{{ props.name }}</span>
      <a
        :href="props.url"
        target="_blank"
        class="text-theme-white-1 group-hover:bg-theme-dark-gray-5 group-hover:border-theme-dark-gray-5 bg-theme-dark-gray-4 border-theme-dark-gray-4 cursor-pointer rounded border px-[9px] py-[3px] text-xs"
      >
        Learn more
      </a>
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
