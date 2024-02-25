<script lang="ts" setup>
import ArrowDown from '@/assets/icons/swap/arrow-down.svg'
import type { ErrorObject } from '@vuelidate/core'

const props = withDefaults(
  defineProps<{
    options: string[],
    placeholder: string,
    label?: string
    disabled?: boolean
    loading?: boolean
    error?: ErrorObject[] | ErrorObject | string
    errorPlacement?: 'right' | 'bottom'
  }>(),
  {
    buttonDisabled: false,
    label: undefined,
    buttonText: undefined,
    error: undefined,
    errorPlacement: 'right'
  }
)

// The model value is the index of the selected element
const modelValue = defineModel<number>()

const {
  displayedError,
  hasError
} = useErrorDestruct(props)
</script>

<template>
  <div class="flex flex-col gap-1">
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
    <div class="relative grid grid-cols-[1fr_auto] grid-rows-1 items-center gap-0">
      <select
        v-model="modelValue"
        :placeholder="props.placeholder"
        :class="
          {
            'pointer-events-none hover:cursor-not-allowed': props.disabled,
            '!border-theme-red !bg-theme-red/10 hover:!bg-theme-red/20 focus:!bg-theme-red/20': hasError
          }
        "
        class="box-border w-full rounded-2xl border border-transparent bg-[#21262C] p-5 text-base tracking-[1px] text-[#E2E4E9] outline-none transition-all placeholder:text-[A3A5B6] hover:bg-[#2D353F] focus:border-[#74D172] focus:placeholder:text-[#E2E4E9]"
        :disabled="props.disabled"
      >
        <option
          v-for="(option, index) of props.options"
          :key="index"
          :value="index"
          :selected="modelValue === index"
        >
          {{ option }}
        </option>
      </select>
      <img
        class="absolute right-[15px] top-1/2 size-4 -translate-y-1/2"
        :src="ArrowDown"
        alt=""
      >
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

select {
  appearance: none;
}

select::-ms-expand {
  display: none;
}
</style>
