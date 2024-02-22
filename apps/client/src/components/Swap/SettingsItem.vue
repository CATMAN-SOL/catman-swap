<script lang="ts" setup>
const props = defineProps<{
  selected: boolean,
  name: string,
  url: string
}>()
</script>

<template>
  <AppSettingsItem
    :title="props.name"
    :selected="props.selected"
    additional-text="Learn more"
    :additional-text-href="props.url"
  />
</template>
