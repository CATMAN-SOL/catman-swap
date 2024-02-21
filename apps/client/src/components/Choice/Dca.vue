<script lang="ts" setup>
import StateIndicatorBottom from '../../assets/state-indicator-bottom.svg'
const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits(['activate-dca'])

const choose = () => {
  emit('activate-dca')
}
</script>

<template>
  <div
    :class="{'group': !props.active}"
    class="relative flex cursor-pointer items-center gap-0 transition-all duration-300"
    @click="choose"
  >
    <div
      :class="[active ? 'bg-[#21262C]' : 'bg-[#090A0B] group-hover:bg-[#21262C]']"
      class="flex size-full items-start rounded-l-3xl px-6 py-12"
    >
      <span class="text-[48px] font-semibold text-[#E2E4E9]">DCA</span>
    </div>
    <img
      :src="StateIndicatorBottom"
      :class="[props.active ? 'bottom-6' : 'bottom-14']"
      class="absolute inset-x-0 -z-10 mx-auto transition-all"
      alt=""
    >
    <div>
      <svg
        class="rotate-180"
        width="168"
        height="214"
        viewBox="0 0 168 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :class="[active ? 'fill-[#21262C]' : 'fill-[#090A0B] group-hover:fill-[#21262C]']"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M422.773 187.696C422.773 201.925 411.238 213.46 397.009 213.46H-244.581C-258.811 213.46 -270.346 201.925 -270.346 187.696V25.9092C-270.346 11.6799 -258.811 0.144867 -244.581 0.144867H-4.69836C4.63705 0.144867 13.2422 5.19475 17.7947 13.3449L33.9742 42.31C38.5268 50.4601 47.1319 55.51 56.4673 55.51H111.525C120.86 55.51 129.465 50.4601 134.018 42.31L150.197 13.3449C154.75 5.19475 163.355 0.144867 172.69 0.144867H397.009C411.238 0.144867 422.773 11.68 422.773 25.9092V187.696Z"
          fill="#21262C"
        />
      </svg>
    </div>
    <div
      :class="[active ? 'bg-[#21262C]' : 'bg-[#090A0B] group-hover:bg-[#21262C]']"
      class="flex size-full items-start rounded-r-3xl px-[18px] py-12"
    >
      <span
        :class="[props.active ? 'text-[#E2E4E9]' : 'text-[#A3A5B6]']"
        class="text-start text-lg font-semibold"
      >Effortless Crypto Accumulation Strategy</span>
    </div>
  </div>
</template>
