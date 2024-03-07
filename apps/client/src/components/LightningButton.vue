<script lang="ts" setup>
import lightning from '../assets/icons/lightning.svg'

const props = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button
    :class="[props.loading ? 'bg-[#E2E4E9]' : 'bg-[#E1D33E]']"
    class="active:bg-theme-white-2 group h-[93px] w-full rounded-full p-2.5 text-xl font-bold leading-7 text-[#030303] transition-all duration-500 hover:bg-[#E2E4E9] lg:min-w-[295px]"
  >
    <div
      v-if="!props.loading"
      class="flex items-center gap-[18px]"
    >
      <div
        class="w-fit rounded-full bg-[rgba(215,218,225,0.63)] p-[13px] transition-all duration-500 group-hover:p-[8px]"
      >
        <img
          :src="lightning"
          alt=""
          class="h-[43px] w-auto transition-all duration-500 group-hover:h-[53px]"
        >
      </div>
      <span>
        <slot />
      </span>
    </div>
    <div
      v-if="props.loading"
      class="flex items-center justify-center gap-3 text-[#030303]"
    >
      <span>Loading</span>
      <LoadingIcon />
    </div>
  </button>
</template>
