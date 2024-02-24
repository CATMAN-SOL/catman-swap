<script lang="ts" setup>
const props = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <LightningButton :loading="props.loading">
    Connect Wallet
  </LightningButton>
</template>
