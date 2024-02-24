<script lang="ts" setup>

const selectorStore = useSwapSelectorStore()

</script>

<template>
  <div class="flex w-full flex-col gap-6 ">
    <ChoiceSwap
      :active="selectorStore.active === 'swap'"
      @activate-swap="selectorStore.setActive('swap')"
    />
    <ChoiceDca
      :active="selectorStore.active === 'dca'"
      @activate-dca="selectorStore.setActive('dca')"
    />
  </div>
</template>
