<script lang="ts" setup>
const props = defineProps<{
  icon: string
  color?: string
}>()

const icon = computed(() => useIcon(props.icon))
</script>

<template>
  <div
    class="[&>svg]:h-full [&>svg]:w-auto [&_*]:transition-all"
    :style="{ '--svgFillColor': props.color }"
    v-html="icon"
  />
</template>

<style lang="scss" scoped></style>
