<script lang="ts" setup>
import leftShape from '../../assets/icons/swap/left-shape.svg'
import cog from '../../assets/icons/swap/cog.svg'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'
import MiddleShape from '../../assets/icons/swap/middle-shape.svg'
</script>

<template>
  <div class="flex w-full flex-col gap-0">
    <div class="flex items-end gap-0">
      <div
        class="!-z-10 mb-[1px] flex h-12 w-[409px] items-center justify-center rounded-tl-3xl bg-[#E1D33E] px-[53px] text-xl font-bold text-[#030303]"
      >
        Swap
      </div>
      <div class="relative ml-[-46px] flex w-full items-end gap-0">
        <img
          class="h-[65px]"
          :src="leftShape"
          alt=""
        >
        <div class="flex h-[65px] w-full items-center gap-1.5 rounded-tr-3xl !bg-[#090A0B] pr-6 pt-3">
          <SwapNavButton>
            Market
            <img
              class="size-4"
              :src="ArrowDown"
              alt=""
            >
          </SwapNavButton>
          <SwapNavButton>
            <span class="whitespace-nowrap">0.5% Slippage</span>
            <img
              class="size-4"
              :src="ArrowDown"
              alt=""
            >
          </SwapNavButton>
          <SwapNavButton>
            Refresh
          </SwapNavButton>
          <SwapNavButton>
            <img
              :src="cog"
              alt=""
            >
          </SwapNavButton>
        </div>
      </div>
    </div>
    <div class="rounded-b-[72px] bg-[#090A0B] p-6">
      <div class="flex w-full flex-col gap-0">
        <div class="rounded-t-[20px] bg-[#16191D] px-6 pb-[18px] pt-6">
          fas
        </div>
        <div class="flex items-center gap-0">
          <div class="h-[50px] w-full rounded-bl-[20px] bg-[#16191D]" />
          <img
            :src="MiddleShape"
            alt=""
          >
          <div class="flex h-[50px] w-full items-center justify-end rounded-br-[20px] bg-[#16191D] pr-5">
            <span class="text-base text-[#A3A5B6]">Balance: <strong class="text-[#E1D33E]">500 USDT</strong></span>
          </div>
        </div>
      </div>

      <div
        style="clip-path: polygon( 25.00% 0.00%, 75.00% 0.20%, 100% 50.00%, 75.00% 100%, 25.00% 100%, 0.00% 50.00% );"
        class="size-10 bg-white"
      />
      <div class="mt-5 flex w-full flex-col gap-0">
        <div class="flex items-center gap-0">
          <div class="h-[50px] w-full rounded-tl-[20px] bg-[#16191D]" />
          <img
            class="rotate-180"
            :src="MiddleShape"
            alt=""
          >
          <div class="h-[50px] w-full rounded-tr-[20px] bg-[#16191D]" />
        </div>
        <div class="rounded-b-[20px] bg-[#16191D] px-6 pb-[18px] pt-6">
          fas
        </div>
      </div>
    </div>
  </div>
</template>
