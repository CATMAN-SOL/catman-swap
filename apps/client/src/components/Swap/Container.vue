<script lang="ts" setup>
import leftShape from '../../assets/icons/swap/left-shape.svg'
import cog from '../../assets/icons/swap/cog.svg'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'
import MiddleShape from '../../assets/icons/swap/middle-shape.svg'
import { Token } from '@/models/token.model'

const { fetch: fetchTokenPairInfo, result: tokenPairInfo } = tokens.useTokensPairInfo()

const { publicKey } = useWallet()
const displayTokenSelectDialog = ref(false)
const displayMarketSettingsDialog = ref(false)
const currentSelectingToken = ref<'from' | 'to'>()

const tokenFrom = ref<Token>({
    address: 'So11111111111111111111111111111111111111112',
    chainId: 101,
    decimals: 9,
    name: 'Wrapped SOL',
    symbol: 'SOL',
    logoUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: [
      'old-registry'
    ],
    extensions: {
      coingeckoId: 'wrapped-solana'
    },
    removed: false,
    createdAt: '2024-02-17T20:09:03.453Z'
})

const tokenTo = ref<Token>({
    address: 'EavJDLh8cYTAnt3QDitpKGMsPL2hq1My5g9R2P6at6Lc',
    chainId: 101,
    decimals: 9,
    name: 'CATMAN',
    symbol: 'CATMAN',
    logoUrl: null,
    tags: [
      'unknown'
    ],
    extensions: {
      coingeckoId: 'catman'
    },
    removed: false,
    createdAt: '2024-02-17T20:09:03.453Z'
})

const fromAmount = ref('')
const toAmount = ref('')

syncRef(fromAmount, toAmount, {
  transform: {
    ltr: (value) => {
      return convertFromAmount(value)
    },
    rtl: (value) => {
      return convertToAmount(value)
    }
  }
})

const convertFromAmount = (value: string) => {
  const parsedValue = parseFloat(value)

  if (!tokenPairInfo.value) {
    return ''
  }

  return (parsedValue / (tokenPairInfo.value.price ?? 0)).toString()
}

const convertToAmount = (value: string) => {
  const parsedValue = parseFloat(value)

  if (!tokenPairInfo.value) {
    return ''
  }

  return (parsedValue / (tokenPairInfo.value.price ?? 0)).toString()
}

watch(tokenPairInfo, () => {
  toAmount.value = convertFromAmount(fromAmount.value)
})

watch([tokenFrom, tokenTo], ([from, to]) => {
  fetchTokenPairInfo({
    from: from.address,
    to: to.address,
    publicKey: publicKey.value?.toString()
  })
}, {
  immediate: true
})

const onTokenSelect = (token: Token) => {
  if (currentSelectingToken.value === 'from') {
    tokenFrom.value = token
  } else {
    tokenTo.value = token
  }
}

const onFromCurrencySelectClick = () => {
  currentSelectingToken.value = 'from'
  displayTokenSelectDialog.value = true
}

const onToCurrencySelectClick = () => {
  currentSelectingToken.value = 'to'
  displayTokenSelectDialog.value = true
}
const onRotateButtonClick = () => {
  const temp = tokenFrom.value
  tokenFrom.value = tokenTo.value
  tokenTo.value = temp
}

const choice = ref('swap')
</script>

<template>
  <div class="flex w-full flex-col gap-0">
    <SwapTokenSelectDialog
      v-model="displayTokenSelectDialog"
      @select="onTokenSelect"
    />
    <div class="flex items-end gap-0">
      <div
        class="!-z-10 flex h-12 w-[340px] items-center justify-center rounded-tl-3xl bg-[#E1D33E] px-[53px] text-xl font-bold text-[#030303]"
      >
        Swap
      </div>
      <div class="relative ml-[-7%] flex w-full items-end gap-0">
        <img
          class="h-[65px]"
          :src="leftShape"
          alt=""
        >
        <div
          class="flex h-[65px] w-full items-center gap-1.5 rounded-tr-3xl !bg-[#090A0B] pr-6 pt-3"
        >
          <SwapNavButton @click="displayMarketSettingsDialog = true">
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
    <div class="w-full rounded-b-[72px] bg-[#090A0B] p-6">
      <div class="flex w-full flex-col gap-0">
        <div class="grid grid-cols-[auto_1fr] items-end gap-3 rounded-t-[20px] bg-[#16191D] px-6 pb-[18px] pt-6">
          <SwapCurrencySelect
            label="From"
            :current-token="tokenFrom"
            @click="onFromCurrencySelectClick"
          />
          <AppInput
            v-model="fromAmount"
            label="Amount"
            placeholder="Enter amount here"
            :button="true"
            button-text="MAX"
            type="number"
          />
        </div>
        <div class="flex items-center gap-0">
          <div class="h-[50px] w-full rounded-bl-[20px] bg-[#16191D]" />
          <img
            :src="MiddleShape"
            alt=""
          >
          <div class="flex h-[50px] w-full items-center justify-end rounded-br-[20px] bg-[#16191D] pr-5">
            <span
              v-if="publicKey && tokenPairInfo"
              class="text-base text-[#A3A5B6]"
            >Balance: <strong class="text-[#E1D33E]">{{ tokenPairInfo.fromBalance ?? 0 }} {{ tokenFrom.symbol }}</strong></span>
          </div>
        </div>
      </div>

      <div class="relative w-full">
        <HexagonButtonRotate
          class="absolute left-1/2 my-[-10px] -translate-x-[calc(50%+2px)]"
          @click="onRotateButtonClick"
        />
      </div>

      <div class="flex w-full flex-col gap-0">
        <div class="flex items-center gap-0">
          <div class="h-[50px] w-full rounded-tl-[20px] bg-[#16191D]" />
          <img
            class="rotate-180"
            :src="MiddleShape"
            alt=""
          >
          <div class="h-[50px] w-full rounded-tr-[20px] bg-[#16191D]" />
        </div>
        <div class="grid grid-cols-[auto_1fr] items-end gap-3 rounded-b-[20px] bg-[#16191D] px-6 pb-[18px] pt-6">
          <SwapCurrencySelect
            label="To"
            :current-token="tokenTo"
            @click="onToCurrencySelectClick"
          />
          <AppInput
            v-model="toAmount"
            label="Amount"
            placeholder="Enter amount here"
            :button="true"
            button-text="MAX"
            type="number"
          />
        </div>
      </div>
      <SwapSummary
        v-if="choice === 'swap'"
        :current-token="tokenFrom"
        :price="tokenPairInfo?.price ?? 0"
        class="mt-[18px]"
      />
      <SwapDcaSettings
        v-if="choice === 'dca'"
        class="mt-[18px]"
      />
      <SwapDcaPriceRange
        v-if="choice === 'dca'"
        class="mt-[18px]"
      />
      <SwapButton
        :loading="false"
        class="mt-[18px]"
      />
    </div>
  </div>
  <SwapMarketSettingsDialog
    v-model="displayMarketSettingsDialog"
  />
</template>
