<script lang="ts" setup>
import leftShape from '../../assets/icons/swap/left-shape.svg'
import cog from '../../assets/icons/swap/cog.svg'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'
import MiddleShape from '../../assets/icons/swap/middle-shape.svg'
import { Token } from '@/models/token.model'

const { fetch: fetchTokenPairInfo, result: tokenPairInfo } = tokens.useTokensPairInfo()
const {
  fetch: fetchTokensRouteInfo,
  result: tokensRouteInfo,
  loading: tokensRouteInfoLoading
} = tokens.useTokensRouteInfo()

const swapSettingsStore = useSwapSettingsStore()

const { publicKey, connected } = useWallet()
const { inc: refreshSwapData, count: refreshSwapDataKey } = useCounter()
const displayTokenSelectDialog = ref(false)
const displayMarketSettingsDialog = ref(false)
const displaySlippageSettingsDialog = ref(false)
const displayGeneralSettingsDialog = ref(false)
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

throttledWatch([tokenFrom, tokenTo, fromAmount, publicKey, connected, refreshSwapDataKey], async ([from, to, amount]) => {
  fetchTokenPairInfo({
    from: from.address,
    to: to.address,
    publicKey: publicKey.value?.toBase58()
  })

  const parsedAmount = parseFloat(amount)

  if (Number.isNaN(parsedAmount) || parsedAmount === 0) {
    toAmount.value = ''
    return
  }

  const response = await fetchTokensRouteInfo({
    from: from.address,
    to: to.address,
    amount: parseFloat(amount),
    slippage: 0.05
  })

  toAmount.value = response.outAmount.toString()
}, {
  immediate: true,
  trailing: true,
  throttle: 500
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
            {{ swapSettingsStore.displayedSelectedPriorityFeeName }}
            <img
              class="size-4"
              :src="ArrowDown"
              alt=""
            >
          </SwapNavButton>
          <SwapNavButton @click="displaySlippageSettingsDialog = true">
            <span class="whitespace-nowrap">{{ swapSettingsStore.slippage }}% Slippage</span>
            <img
              class="size-4"
              :src="ArrowDown"
              alt=""
            >
          </SwapNavButton>
          <SwapNavButton @click="refreshSwapData()">
            Refresh
          </SwapNavButton>
          <SwapNavButton @click="displayGeneralSettingsDialog = true">
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
            :model-value="toAmount"
            :loading="(fromAmount.length > 0 && tokensRouteInfo?.inAmount !== parseFloat(fromAmount)) || tokensRouteInfoLoading"
            label="Amount"
            placeholder="The output amount will be displayed here"
            :disabled="true"
            :button="true"
            button-text="MAX"
            type="number"
          />
        </div>
      </div>
      <SwapSummary
        v-if="choice === 'swap'"
        :current-token="tokenFrom"
        :out-token="tokenTo"
        :price="tokenPairInfo?.price ?? 0"
        :in-amount-raw="parseFloat(fromAmount)"
        :loading="(fromAmount.length > 0 && tokensRouteInfo?.inAmount !== parseFloat(fromAmount)) || tokensRouteInfoLoading"
        :in-amount="tokensRouteInfo?.inAmount ?? 0"
        :out-amount="tokensRouteInfo?.outAmount ?? 0"
        :zeroes="Number.isNaN(parseFloat(fromAmount))"
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
  <SwapSlippageSettingsDialog v-model="displaySlippageSettingsDialog" />
  <SwapGeneralSettingsDialog v-model="displayGeneralSettingsDialog" />
</template>
