<script lang="ts" setup>
const props = defineProps<{
  maxFee: string,
  name: string,
  description: string,
  selected: boolean
}>()
</script>

<template>
  <AppSettingsItem
    :selected="props.selected"
    :title="props.name"
    :subtitle="props.description"
    :additional-text="`Max ${props.maxFee} SOL`"
  />
</template>
