<script setup lang="ts">
const swapSettingsStore = useSwapSettingsStore()

onMounted(() => {
  swapSettingsStore.fetchBaseFee()
})
</script>

<template>
  <div>
    <AppHeader />
    <RouterView />
  </div>
</template>
