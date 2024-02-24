<script lang="ts" setup>
import { SwapSummaryProps } from './types'

const props = defineProps<SwapSummaryProps & {
  currentState: 'awaiting-confirmation' | 'processing' | 'success' | 'error'
}>()
const modelValue = defineModel<boolean>()

const emit = defineEmits(['proceed'])

const dialogTitle = computed(() => {
  if (props.currentState === 'awaiting-confirmation') {
    return 'Confirmation'
  }

  if (props.currentState === 'processing') {
    return 'Loading'
  }

  if (props.currentState === 'success') {
    return 'Successful swap'
  }

  return 'Confirmation'
})
</script>

<template>
  <AppDialog
    v-model="modelValue"
    :title="dialogTitle"
  >
    <div class="flex flex-col items-stretch gap-4 py-4">
      <template
        v-if="props.currentState !== 'success'"
      >
        <span class="text-primary text-[16px] font-semibold">
          Are you sure you want to complete following transaction?
        </span>
        <SwapSummary
          v-bind="props"
        />
      </template>
      <template v-if="props.currentState === 'awaiting-confirmation'">
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
      </template>
      <div
        v-else-if="props.currentState === 'processing'"
        class="bg-theme-dark-gray-3 flex w-full flex-row items-center justify-between rounded-[16px] px-3 py-2"
      >
        <div class="flex flex-row items-center gap-3 text-[16px] font-semibold">
          <span>Performing swap</span>
          <LoadingIcon dot-class="bg-white" />
        </div>
        <AppBadge
          severity="warning"
          text="Please wait"
        />
      </div>
      <template
        v-else-if="props.currentState === 'success'"
      >
        <div
          class="border-theme-green bg-theme-green/10 text-theme-green flex flex-col items-stretch gap-2 rounded-[24px] border p-6 font-semibold"
        >
          <span class="text-[16px]">Summary</span>
          <div class="flex flex-row items-center justify-between text-white">
            <span class="text-[18px]">Paid</span>
            <span>{{ props.inAmount }} {{ props.currentToken.symbol }}</span>
          </div>
          <div class="flex flex-row items-center justify-between text-white">
            <span class="text-[18px]">Received</span>
            <span>{{ props.outAmount }} {{ props.outToken.symbol }}</span>
          </div>
        </div>
        <AppButton
          button-style="primary"
          @click="modelValue = false"
        >
          OK
        </AppButton>
      </template>
    </div>
  </AppDialog>
</template>

<style lang="scss" scoped>

</style>
