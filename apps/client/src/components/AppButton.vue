<script lang="ts" setup>
const BUTTON_STYLE_CLASSES = {
  primary: 'bg-primary text-black hover:bg-white active:bg-theme-white-2',
  secondary: 'bg-theme-dark-gray-3 text-theme-white-2 hover:bg-theme-dark-gray-4 hover:text-theme-white-1 active:bg-theme-white-2 active:text-theme-dark-gray-1'
} as const

const props = withDefaults(
  defineProps<{
    buttonStyle?: keyof typeof BUTTON_STYLE_CLASSES
  }>(),
  {
    buttonStyle: 'primary'
  }
)

</script>

<template>
  <button
    class="rounded-[16px] py-4 text-[24px] font-semibold transition-all"
    :class="BUTTON_STYLE_CLASSES[props.buttonStyle]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>

</style>
