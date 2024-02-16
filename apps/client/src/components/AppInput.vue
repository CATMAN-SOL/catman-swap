<script lang="ts" setup>
const props = defineProps<{
  button?: boolean
  placeholder: string,
  buttonText?: string,
  label?: string
  buttonDisabled?: boolean
}>()

const emit = defineEmits(['button-click'])

const modelValue = defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="text-base font-semibold text-[#A3A5B6]">{{ props.label }}</span>
    <div class="grid grid-cols-[1fr_auto] items-center gap-0">
      <input
        v-model="modelValue"
        :placeholder="props.placeholder"
        :class="[props.button ? '' : 'rounded-r-2xl']"
        type="number"
        class="box-border w-full rounded-l-2xl border border-transparent bg-[#21262C] p-5 text-base tracking-[1px] text-[#A3A5B6] outline-none transition-all placeholder:text-[A3A5B6] hover:bg-[#2D353F] focus:border-[#74D172] focus:placeholder:text-[#E2E4E9]"
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
