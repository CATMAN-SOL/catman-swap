<script lang="ts" setup>
const props = defineProps<{
  selected: boolean
}>()
</script>

<template>
  <div
    :class="{ 'border-bg-yellow': props.selected }"
    class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 group box-border flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-transparent p-[18px] transition-all"
  >
    <slot />
  </div>
</template>
