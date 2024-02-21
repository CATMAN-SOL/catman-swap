<script lang="ts" setup>
// import StateIndicatorTop from '../assets/state-indicator-top.svg'
// import StateIndicatorBottom from '../assets/state-indicator-bottom.svg'

const active = ref('swap')
</script>

<template>
  <div class="flex w-full flex-col gap-6 ">
    <ChoiceSwap
      :active="active === 'swap'"
      @activate-swap="active = 'swap'"
    />
    <ChoiceDca
      :active="active === 'dca'"
      @activate-dca="active = 'dca'"
    />
    <!-- <div
      :class="{'group': active !== 'swap'}"
      class="relative flex cursor-pointer items-center gap-0 transition-all duration-300"
      @click="active = 'swap'"
    >
      <div class="flex size-full items-end rounded-l-3xl bg-[#21262C] px-6 py-12 group-hover:bg-[#090A0B]">
        <span class="text-[48px] font-semibold text-white">Swap</span>
      </div>
      <img
        :class="[active === 'swap' ? 'top-6' : 'top-14']"
        :src="StateIndicatorTop"
        class="absolute inset-x-0 top-5 -z-10 mx-auto transition-all"
        alt=""
      >
      <div>
        <svg
          width="168"
          height="214"
          viewBox="0 0 168 214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:fill-[#090A0B]"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M422.773 187.696C422.773 201.925 411.238 213.46 397.009 213.46H-244.581C-258.811 213.46 -270.346 201.925 -270.346 187.696V25.9092C-270.346 11.6799 -258.811 0.144867 -244.581 0.144867H-4.69836C4.63705 0.144867 13.2422 5.19475 17.7947 13.3449L33.9742 42.31C38.5268 50.4601 47.1319 55.51 56.4673 55.51H111.525C120.86 55.51 129.465 50.4601 134.018 42.31L150.197 13.3449C154.75 5.19475 163.355 0.144867 172.69 0.144867H397.009C411.238 0.144867 422.773 11.68 422.773 25.9092V187.696Z"
            fill="#21262C"
          />
        </svg>
      </div>
      <div class="flex size-full w-full items-end rounded-r-3xl bg-[#21262C] px-[18px] py-12 group-hover:bg-[#090A0B]">
        <span class="text-start text-lg font-semibold text-[#A3A5B6]">Instant Token Exchanges Made Simple</span>
      </div>
    </div>
    <div
      :class="{'group': active !== 'dca'}"
      class="relative flex cursor-pointer items-center gap-0 transition-all duration-300"
      @click="active = 'dca'"
    >
      <div class="flex size-full items-start rounded-l-3xl bg-[#21262C] px-6 py-12 group-hover:bg-[#090A0B]">
        <span class="text-[48px] font-semibold text-white">DCA</span>
      </div>
      <img
        :src="StateIndicatorBottom"
        :class="[active === 'dca' ? 'bottom-6' : 'bottom-14']"
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
            class="group-hover:fill-[#090A0B]"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M422.773 187.696C422.773 201.925 411.238 213.46 397.009 213.46H-244.581C-258.811 213.46 -270.346 201.925 -270.346 187.696V25.9092C-270.346 11.6799 -258.811 0.144867 -244.581 0.144867H-4.69836C4.63705 0.144867 13.2422 5.19475 17.7947 13.3449L33.9742 42.31C38.5268 50.4601 47.1319 55.51 56.4673 55.51H111.525C120.86 55.51 129.465 50.4601 134.018 42.31L150.197 13.3449C154.75 5.19475 163.355 0.144867 172.69 0.144867H397.009C411.238 0.144867 422.773 11.68 422.773 25.9092V187.696Z"
            fill="#21262C"
          />
        </svg>
      </div>
      <div class="flex size-full items-start rounded-r-3xl bg-[#21262C] px-[18px] py-12 group-hover:bg-[#090A0B]">
        <span class="text-start text-lg font-semibold text-[#D7DAE1]">Effortless Crypto Accumulation Strategy</span>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
  .mask {
  &:hover {
    mask-image: linear-gradient(90deg, rgba(9, 10, 11, 1) 50%, rgba(9, 10, 11, 1) 50%);
  }
}
</style>
