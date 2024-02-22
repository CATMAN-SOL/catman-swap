<script lang="ts" setup>
import { SwapSummaryProps } from './types'

const props = defineProps<SwapSummaryProps>()
const modelValue = defineModel<boolean>()

const emit = defineEmits(['proceed'])
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Confirmation"
  >
    <div class="flex flex-col items-stretch gap-4 py-4">
      <span class="text-primary text-[16px] font-semibold">
        Are you sure you want to complete following transaction?
      </span>
      <SwapSummary v-bind="props" />
      <AppButton
        button-style="primary"
        @click="emit('proceed')"
      >
        Proceed
      </AppButton>
      <AppButton
        button-style="secondary"
        @click="modelValue = false"
      >
        Cancel
      </AppButton>
    </div>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
