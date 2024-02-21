<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxValue } from '@vuelidate/validators'

const modelValue = defineModel<boolean>()

const slippage = ref('')

const swapSettingsStore = useSwapSettingsStore()

const rules = {
  slippage: {
    required, numeric, maxValue: maxValue(50)
  }
}

const vuelidate = useVuelidate(rules, computed(() => ({ slippage: slippage.value })))

watch(() => swapSettingsStore.slippage, (newSlippage) => {
  slippage.value = newSlippage.toString()
}, {
  immediate: true
})

const onSaveButtonClick = () => {
  vuelidate.value.$touch()

  if (vuelidate.value.$error) {
    return
  }

  swapSettingsStore.updateSlippage(slippage.value)
  modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    text="Your transaction will revert if price changes unfavorably by more than this percentage."
    title="Slippage Settings"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select Slippage Value
      </p>
      <div class="flex w-full flex-col gap-6">
        <SwapSlippageItem
          v-for="item in swapSettingsStore.defaultSlippageOptions"
          :key="item.value"
          :value="item.value"
          :selected="item.value === slippage"
          @click="slippage = item.value"
        />
      </div>
    </div>
    <AppInput
      v-model="slippage"
      class="mt-8"
      label="Custom (%)"
      placeholder="0%-50%"
      type="number"
      :error="vuelidate.slippage.$errors"
    />
    <AppButton
      class="mt-8 w-full"
      button-style="primary"
      @click="onSaveButtonClick"
    >
      Save Settings
    </AppButton>
  </AppDialog>
</template>
