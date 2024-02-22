<script lang="ts" setup>
import yellowCheck from '../assets/icons/swap/yellow-check.svg'

const props = defineProps<{
  title: string
  subtitle?: string
  additionalText?: string
  additionalTextHref?: string

  selected: boolean
}>()

const onAdditionalTextClick = (ev: Event) => {
  if (props.additionalTextHref) {
    ev.stopPropagation()
  }
}
</script>

<template>
  <div
    :class="{ 'border-primary': props.selected }"
    class="bg-theme-dark-gray-3 hover:bg-theme-dark-gray-4 group box-border flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-solid border-transparent p-[18px] transition-all"
  >
    <div class="flex flex-col">
      <div class="flex items-start gap-2">
        <span class="text-theme-white-1 text-[18px] font-semibold leading-[28px] tracking-[1.2px]">{{ props.title }}</span>
        <component
          :is="props.additionalTextHref ? 'a' : 'div'"
          v-if="props.additionalText"
          :href="props.additionalTextHref"
          class="border-theme-dark-gray-4 bg-theme-dark-gray-5 text-theme-white-1 block cursor-default rounded-md border px-[9px] py-[3px] text-xs"
          :class="{
            'hover:cursor-pointer': props.additionalTextHref
          }"
          target="_blank"
          @click="onAdditionalTextClick"
        >
          {{ props.additionalText }}
        </component>
      </div>
      <span
        v-if="props.subtitle"
        class="text-theme-white-2 text-xs leading-4"
      >{{ props.subtitle }}</span>
    </div>
    <div>
      <div
        v-if="!props.selected"
        class="border-theme-dark-gray-5 bg-theme-dark-gray-3 box-border size-4 rounded-full border"
      />
      <img
        v-if="props.selected"
        class="size-4"
        :src="yellowCheck"
        alt=""
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
