<script lang="ts" setup>
const props = defineProps<{
  label: string
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <label class="group flex flex-row-reverse items-center gap-2 transition-all hover:cursor-pointer">
    <input
      v-model="modelValue"
      class="hidden"
      type="checkbox"
    >
    <div
      class="relative h-[28px] w-[48px] rounded-full p-[3px] transition-all"
      :class="{
        'bg-primary': modelValue,
        'bg-theme-dark-gray-3': !modelValue
      }"
    >
      <div
        class="aspect-square h-full rounded-full transition-all"
        :class="{
          'translate-x-[90%] bg-white': modelValue,
          'bg-theme-dark-gray-4 group-hover:bg-theme-dark-gray-5': !modelValue
        }"
      />
    </div>
    <span class="text-theme-white-2 select-none text-[18px] font-semibold">{{ props.label }}</span>
  </label>
</template>

<style lang="scss" scoped>

</style>
