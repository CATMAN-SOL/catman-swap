<script lang="ts" setup>
const props = defineProps<{
  selected: boolean,
  value: string,
}>()
</script>

<template>
  <AppSettingsItem
    :title="`${props.value}% Slippage`"
    :selected="props.selected"
  />
</template>
