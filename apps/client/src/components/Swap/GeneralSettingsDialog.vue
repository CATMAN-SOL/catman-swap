<script lang="ts" setup>
import clone from 'lodash/clone'

const modelValue = defineModel<boolean>()

const swapSettingsStore = useSwapSettingsStore()

const additionalOptions = ref({
  directRouteOnly: false,
  useWrappedSol: false,
  versionedTransaction: true,
})

watch([() => swapSettingsStore.additionalOptions, modelValue], ([newAdditionalOptions]) => {
  additionalOptions.value = clone(newAdditionalOptions)
}, {
  immediate: true,
  deep: true
})

const onSaveButtonClick = () => {
  swapSettingsStore.updateAdditionalOptions(additionalOptions.value)
  modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="General Settings"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select All Necessary Settings
      </p>
    </div>
    <div class="flex flex-col items-stretch gap-4">
      <SwapSettingsItem
        :selected="additionalOptions.directRouteOnly"
        name="Direct Route Only"
        url="https://google.com"
        @click="additionalOptions.directRouteOnly = !additionalOptions.directRouteOnly"
      />
      <SwapSettingsItem
        :selected="additionalOptions.useWrappedSol"
        name="Use wSOL"
        url="https://google.com"
        @click="additionalOptions.useWrappedSol = !additionalOptions.useWrappedSol"
      />
      <SwapSettingsItem
        :selected="additionalOptions.versionedTransaction"
        name="Versioned Transaction"
        url="https://google.com"
        @click="additionalOptions.versionedTransaction = !additionalOptions.versionedTransaction"
      />
    </div>
    <AppButton
      class="mt-8 w-full"
      button-style="primary"
      @click="onSaveButtonClick"
    >
      Save Settings
    </AppButton>
  </AppDialog>
</template>
