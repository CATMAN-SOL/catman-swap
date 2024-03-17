<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxValue } from '@vuelidate/validators'

const modelValue = defineModel<boolean>()

const swapSettingsStore = useSwapSettingsStore()

const priorityFee = ref('')

const rules = {
  priorityFee: {
    required, numeric, maxValue: maxValue(2)
  }
}

const vuelidate = useVuelidate(rules, computed(() => ({ priorityFee: priorityFee.value })))

const priorityFeeType = ref<keyof typeof swapSettingsStore.priorityFeeOptions>(swapSettingsStore.priorityFeeType)

// Store value changes -> update local value
watch([() => swapSettingsStore.customPriorityFee, () => swapSettingsStore.priorityFeeType, modelValue], ([newPriorityFee, newPriorityFeeType]) => {
  if (!newPriorityFee) {
    return
  }

  priorityFee.value = newPriorityFee.toString()
  priorityFeeType.value = newPriorityFeeType
}, {
  immediate: true
})

watch(priorityFeeType, (newPriorityFeeType) => {
  if (newPriorityFeeType !== 'custom') {
    vuelidate.value.$reset()
  }
})

const onSaveButtonClick = () => {
  if (priorityFeeType.value === 'custom') {
    vuelidate.value.$touch()

    if (vuelidate.value.$error) {
      return
    }
  }

  swapSettingsStore.priorityFeeType = priorityFeeType.value
  if (priorityFeeType.value === 'custom') {
    swapSettingsStore.customPriorityFee = parseFloat(priorityFee.value)
  }

  modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    text="The priority fee is remitted to the Solana network, enhancing transaction prioritization for expedited execution and improved transaction processing times."
    title="Transaction Priority"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select Transaction Priority
      </p>
      <div class="flex w-full flex-col gap-6">
        <SwapMarketItem
          v-for="(item, key) in swapSettingsStore.defaultPriorityFeeOptions"
          :key="item.name"
          :name="item.name"
          :max-fee="item.maxFee.toString()"
          :description="item.description"
          :selected="key === priorityFeeType"
          @click="swapSettingsStore.updatePriorityFeeType(key)"
        />
      </div>
    </div>
    <AppInput
      v-model="priorityFee"
      class="mt-8"
      label="Custom"
      placeholder="Max 2 SOL"
      type="number"
      :error="vuelidate.priorityFee.$errors"
      @click="priorityFeeType = 'custom'"
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
