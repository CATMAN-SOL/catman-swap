<script lang="ts" setup>
const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits(['activate-swap'])

const choose = () => {
  emit('activate-swap')
}
</script>

<template>
  <div
    :class="{'group': !props.active}"
    class="relative grid cursor-pointer grid-cols-[1fr_auto_1fr] grid-rows-1 gap-0 transition-all duration-300"
    @click="choose"
  >
    <div
      :class="[active ? 'bg-[#21262C]' : 'bg-[#090A0B] group-hover:bg-[#21262C]']"
      class="relative flex w-full min-w-[115px] items-end rounded-l-3xl px-6 py-12 transition-all"
    >
      <span class="absolute z-[15] text-[32px] font-semibold text-[#E2E4E9] lg:text-[48px]">Swap</span>
    </div>
    <div class="absolute left-1/2 top-0 z-[-10] h-full w-[135px] -translate-x-1/2 overflow-hidden">
      <div
        class="bg-primary absolute left-0 flex h-fit w-full flex-col items-center justify-end py-1 transition-all"
        :class="{
          'top-[25px]': props.active,
          'top-[60px]': !props.active,
        }"
      >
        <span class="font-secondary text-[16px] font-semibold text-black">Selected</span>
      </div>
    </div>
    <div class="relative h-full min-w-[168px] overflow-hidden">
      <!-- <div> -->
      <svg
        class="absolute left-[-4px] top-0"
        width="176"
        height="214"
        viewBox="0 0 168 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :class="[active ? 'fill-[#21262C]' : 'fill-[#090A0B] group-hover:fill-[#21262C]']"
          class="transition-all"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m 408.42399,187.696 c 0,14.229 -11.0574,26.304 -24.69726,26.304 h -615.0255 c -13.64082,0 -24.69822,-12.075 -24.69822,-26.304 V 25.9092 c 0,-14.2293 11.0574,-25.764333 24.69822,-25.764333 H -1.348272 c 8.9488852,0 17.197746,5.049883 21.561754,13.200033 L 35.723083,42.31 c 4.364103,8.1501 12.612916,13.2 21.561792,13.2 h 52.778085 c 8.94849,0 17.19721,-5.0499 21.56169,-13.2 l 15.50912,-28.9651 c 4.36449,-8.15015 12.61321,-13.200033 21.5617,-13.200033 h 215.03126 c 13.63986,0 24.69726,11.535133 24.69726,25.764333 z"
          fill="#21262C"
        />
      </svg>
    </div>
    <div
      :class="[active ? 'bg-[#21262C]' : 'bg-[#090A0B] group-hover:bg-[#21262C]']"
      class="flex w-full min-w-[115px] items-end rounded-r-3xl px-[18px] py-12 transition-all"
    >
      <span
        :class="[props.active ? 'text-[#E2E4E9]' : 'text-[#A3A5B6]']"
        class="text-start text-xs font-semibold lg:text-lg"
      >Token Exchanges Made Simple</span>
    </div>
  </div>
</template>
