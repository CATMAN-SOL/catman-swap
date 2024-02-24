<script lang="ts" setup>
const SEVERITY_CLASSLIST = {
  warning: 'bg-primary/10 text-primary',
  success: 'bg-theme-green/10 text-theme-green',
} as const

const props = defineProps<{
  severity: keyof typeof SEVERITY_CLASSLIST
  text: string
}>()
</script>

<template>
  <div
    class="rounded-[11px] px-6 py-2"
    :class="SEVERITY_CLASSLIST[props.severity]"
  >
    <span class="text-[16px] font-semibold">{{ props.text }}</span>
  </div>
</template>

<style lang="scss" scoped>

</style>
