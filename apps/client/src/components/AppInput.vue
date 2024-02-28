<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

const props = withDefaults(
  defineProps<{
    button?: boolean
    placeholder: string,
    buttonText?: string,
    label?: string
    type?: string
    disabled?: boolean
    loading?: boolean
    buttonDisabled?: boolean
    errorPlacement?: 'right' | 'bottom'
    error?: ErrorObject[] | ErrorObject | string
  }>(),
  {
    buttonDisabled: false,
    type: 'text',
    label: undefined,
    buttonText: undefined,
    error: undefined,
    errorPlacement: 'right'
  }
)

const emit = defineEmits(['button-click'])

const modelValue = defineModel<string>()
const {
  displayedError,
  hasError
} = useErrorDestruct(props)
</script>

<template>
  <div>
    <div
      class="flex flex-row items-center gap-1 text-base font-semibold text-[#A3A5B6]"
    >
      {{ props.label }}
      <LoadingIcon
        v-if="props.loading"
        class="scale-75"
        dot-class="bg-theme-white-2 scale-50"
      />
      <span
        v-if="hasError && props.errorPlacement === 'right'"
        class="text-theme-red"
      >
        <span v-if="props.errorPlacement === 'right'">- </span>Error: {{ displayedError }}
      </span>
    </div>
    <div class="mt-1 grid grid-cols-[1fr_auto] grid-rows-1 items-center gap-0">
      <input
        v-model="modelValue"
        :placeholder="props.placeholder"
        :class="
          {
            'rounded-r-2xl': !props.button,
            'pointer-events-none hover:cursor-not-allowed': props.disabled,
            '!border-theme-red !bg-theme-red/10 hover:!bg-theme-red/20 focus:!bg-theme-red/20': hasError
          }
        "
        :type="props.type"
        class="box-border w-full rounded-l-2xl border border-transparent bg-[#21262C] p-5 text-base tracking-[1px] text-[#E2E4E9] outline-none transition-all placeholder:text-[A3A5B6] hover:bg-[#2D353F] focus:border-[#74D172] focus:placeholder:text-[#E2E4E9]"
        :disabled="props.disabled"
      >
      <button
        v-if="props.button"
        :class="[props.buttonDisabled ? '' : 'hover:text-[#E1D33E] active:bg-[#E1D33E] active:text-[#090A0B]']"
        class="h-full rounded-r-2xl bg-[#2D353F] p-5 transition-all"
        @click="emit('button-click')"
      >
        {{ props.buttonText }}
      </button>
    </div>
    <span
      v-if="hasError && props.errorPlacement === 'bottom'"
      class="text-theme-red font-semibold"
      :class="{
        '': props.errorPlacement === 'bottom'
      }"
    >
      Error: {{ displayedError }}
    </span>
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
