<script lang="ts" setup>
import lightning from '../../assets/icons/lightning.svg'
const props = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button
    :class="[props.loading ? 'bg-[#E2E4E9]' : 'bg-[#E1D33E]']"
    class="group h-[93px] rounded-full p-2.5 text-xl font-bold leading-7 text-[#030303] transition-all duration-500 hover:bg-[#E2E4E9]"
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
      <span>Connect Wallet</span>
    </div>
    <div
      v-else
      class="flex items-center justify-center gap-3 text-[#030303]"
    >
      <span>Loading</span>
      <div id="wave">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
div#wave {
  position: relative;
  text-align: center;

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 3px;
    background: #030303;
    animation: wave 1.3s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.1s;
    }

    &:nth-child(3) {
      animation-delay: -0.9s;
    }
  }
}

@keyframes wave {

  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-15px);
  }
}
</style>
