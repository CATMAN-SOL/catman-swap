<script lang="ts" setup>
import leftShape from '../../assets/icons/swap/left-shape.svg'
import cog from '../../assets/icons/swap/cog.svg'
import ArrowDown from '../../assets/icons/swap/arrow-down.svg'
import MiddleShape from '../../assets/icons/swap/middle-shape.svg'
import { VersionedTransaction, Transaction } from '@solana/web3.js'
import { decode as decodeBase58, encode as encodeBase58 } from 'bs58'
import { Token } from '@/models/token.model'

import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxValue, minValue, helpers } from '@vuelidate/validators'
import { DcaOptions } from './types'

const { fetch: fetchTokenPairInfo, result: tokenPairInfo } = tokens.useTokensPairInfo()
const {
  fetch: fetchTokensRouteInfo,
  result: tokensRouteInfo,
  loading: tokensRouteInfoLoading
} = tokens.useTokensRouteInfo()
const { fetch: fetchSwapTransactionCreate } = swap.useCreateSwapTransaction()
const { fetch: fetchSwapTransactionExecute } = swap.useExecuteSwapTransaction()
const { fetch: fetchDcaTransactionCreate } = dca.useCreateDcaTransaction()
const { fetch: fetchDcaTransactionExecute } = dca.useExecuteDcaTransaction()

const swapSettingsStore = useSwapSettingsStore()
const walletConnectStore = useWalletConnectStore()
const selectorStore = useSwapSelectorStore()

const { publicKey, connected, connecting, signTransaction, disconnect } = useWallet()
const { inc: refreshSwapData, count: refreshSwapDataKey } = useCounter()
const displayTokenSelectDialog = ref(false)
const displayMarketSettingsDialog = ref(false)
const displaySlippageSettingsDialog = ref(false)
const displayGeneralSettingsDialog = ref(false)
const displaySwapConfirmDialog = ref(false)
const swapConfirmDialogState = ref<'awaiting-confirmation' | 'processing' | 'success' | 'error'>('awaiting-confirmation')
const currentSelectingToken = ref<'from' | 'to'>()

const dcaOptions = reactive<DcaOptions>({
  rate: 0,
  rateDenominator: 1,
  ordersCount: 0,

  minAmountPerCycle: undefined as number | undefined,
  maxAmountPerCycle: undefined as number | undefined,
})

const enablePricingStrategy = ref(false)

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
const toAmountError = ref('')

const rules = computed(() => ({
  fromAmount: {
    required,
    numeric,
    maxValue: helpers.withMessage(
      'Insufficient balance',
      maxValue(tokenPairInfo.value?.fromBalance ?? 0)
    ),
    ...(
      selectorStore.active === 'dca'
    ? {
        minValue: helpers.withMessage('Minimum of 1 USD equivalent per order is allowed', minValue(
          (tokenPairInfo.value?.price ?? 0) * dcaOptions.ordersCount
        ))
      }
    : {}
    )
  }
}))

const amountVuelidate = useVuelidate(rules, computed(() => ({ fromAmount: fromAmount.value })))

throttledWatch([tokenFrom, tokenTo, fromAmount, publicKey, connected, refreshSwapDataKey, () => swapSettingsStore.slippage, () => swapSettingsStore.additionalOptions], async ([from, to, amount]) => {
  // Fetches FROM token -> USDC rate. Is required for DCA order limit
  fetchTokenPairInfo({
    from: tokenFrom.value.address,
    // USDC
    to: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    publicKey: publicKey.value?.toBase58(),
    useWrappedSol: swapSettingsStore.additionalOptions.useWrappedSol
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
    slippage: swapSettingsStore.slippage,
    onlyDirectRoute: swapSettingsStore.additionalOptions.directRouteOnly
  })

  if (!response) return

  if ('error' in response) {
    toAmount.value = ''
    toAmountError.value = 'No swap route found'
  } else {
    toAmount.value = response.outAmount.toString()
    toAmountError.value = ''
  }
}, {
  immediate: true,
  trailing: true,
  deep: true,
  throttle: 500
})

watch(enablePricingStrategy, (newValue) => {
  if (!newValue) {
    dcaOptions.minAmountPerCycle = undefined
    dcaOptions.maxAmountPerCycle = undefined
  }
})

watch(publicKey, (newValue, oldValue) => {
  if (newValue && oldValue) {
    disconnect()
  }
})

watch(() => selectorStore.active, (newActive) => {
  if (newActive === 'swap') {
    swapSettingsStore.additionalOptions.useWrappedSol = false
  }

  if (newActive === 'dca') {
    swapSettingsStore.additionalOptions.useWrappedSol = true
  }
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

const onMaxButtonClick = () => {
  fromAmount.value = (tokenPairInfo.value?.fromBalance ?? 0).toString()
}

const balanceTokenSymbol = computed(() => {
  if (tokenFrom.value.address !== 'So11111111111111111111111111111111111111112') {
    return tokenFrom.value.symbol
  }

  if (swapSettingsStore.additionalOptions.useWrappedSol) {
    return 'wSOL'
  }

  return 'SOL'
})

const onSwapButtonClick = () => {
  amountVuelidate.value.$touch()

  if (amountVuelidate.value.$error) {
    return
  }

  refreshSwapDataKey.value++

  swapConfirmDialogState.value = 'awaiting-confirmation'
  displaySwapConfirmDialog.value = true
}

const onSwapConfirm = async () => {
  if (selectorStore.active === 'dca') {
    return await onDcaConfirm()
  }

  if (!publicKey.value || !tokensRouteInfo.value || 'error' in tokensRouteInfo.value || !signTransaction.value) {
    return
  }

  try {
    swapConfirmDialogState.value = 'processing'

    const result = await fetchSwapTransactionCreate({
      quote: tokensRouteInfo.value.quote,
      prioritizationFee: swapSettingsStore.priorityFee,
      publicKey: publicKey.value.toString(),
      useWrappedSol: swapSettingsStore.additionalOptions.useWrappedSol
    })

    if (!result) {
      return
    }

    const { tx: txEncoded } = result
    const txSerialized = decodeBase58(txEncoded)
    const tx = VersionedTransaction.deserialize(txSerialized)

    const signedTx = await signTransaction.value(tx)

    const signedTxSerialized = signedTx.serialize()
    const signedTxEncoded = encodeBase58(signedTxSerialized)

    await fetchSwapTransactionExecute({
      txHash: signedTxEncoded,
      senderPublicKey: publicKey.value.toString(),
      quote: tokensRouteInfo.value.quote
    })

    fromAmount.value = ''
    amountVuelidate.value.$reset()

    refreshSwapData()

    swapConfirmDialogState.value = 'success'
  } catch (e) {
    swapConfirmDialogState.value = 'error'
  }
}

const onDcaConfirm = async () => {
  if (!publicKey.value || !signTransaction.value) {
    return
  }

  const amount = parseFloat(fromAmount.value)

  if (Number.isNaN(amount)) {
    return
  }

  try {
    swapConfirmDialogState.value = 'processing'

    const result = await fetchDcaTransactionCreate({
      cycleSeconds: dcaOptions.rate * dcaOptions.rateDenominator,
      inAmount: amount,
      inAmountPerCycle: amount / dcaOptions.ordersCount,
      publicKey: publicKey.value.toString(),
      tokenFrom: tokenFrom.value.address,
      tokenTo: tokenTo.value.address,
      minOutAmountPerCycle: dcaOptions.minAmountPerCycle,
      maxOutAmountPerCycle: dcaOptions.maxAmountPerCycle,
    })

    if (!result) {
      throw new Error()
    }

    const encodedTx = result.tx
    const serializedTx = decodeBase58(encodedTx)
    const tx = Transaction.from(serializedTx)

    const signedTx = await signTransaction.value(tx)

    const signedTxSerialized = signedTx.serialize()
    const signedTxEncoded = encodeBase58(signedTxSerialized)

    await fetchDcaTransactionExecute({
      senderPublicKey: publicKey.value.toString(),
      txHash: signedTxEncoded
    })

    fromAmount.value = ''
    swapConfirmDialogState.value = 'success'
  } catch (e) {
    swapConfirmDialogState.value = 'error'
  }
}
</script>

<template>
  <div class="flex w-full flex-col gap-0">
    <SwapTokenSelectDialog
      v-model="displayTokenSelectDialog"
      @select="onTokenSelect"
    />
    <SwapConfirmDialog
      v-model="displaySwapConfirmDialog"
      :current-token="tokenFrom"
      :out-token="tokenTo"
      :price="tokenPairInfo?.price ?? 0"
      :current-process="selectorStore.active"
      :in-amount-raw="parseFloat(fromAmount)"
      :loading="(fromAmount.length > 0 && tokensRouteInfo && 'inAmount' in tokensRouteInfo && tokensRouteInfo?.inAmount !== parseFloat(fromAmount)) || tokensRouteInfoLoading"
      :in-amount="tokensRouteInfo && 'inAmount' in tokensRouteInfo && tokensRouteInfo?.inAmount ? tokensRouteInfo.inAmount : 0"
      :out-amount="tokensRouteInfo && 'outAmount' in tokensRouteInfo && tokensRouteInfo?.outAmount ? tokensRouteInfo.outAmount : 0"
      :zeroes="Number.isNaN(parseFloat(fromAmount))"
      :current-state="swapConfirmDialogState"
      :dca-options="dcaOptions"
      class="mt-[18px]"
      @proceed="onSwapConfirm"
    />
    <div class="flex items-end gap-0">
      <div
        class="!-z-10 hidden h-12 basis-[40%] items-center justify-center rounded-tl-3xl bg-[#E1D33E] text-xl font-bold  text-[#030303] xl:flex"
      >
        {{ selectorStore.active === 'swap' ? 'Swap' : 'DCA' }}
      </div>
      <div class="relative ml-0 flex w-full items-end gap-0 xl:ml-[-8%]">
        <img
          class="hidden h-[65px] translate-y-[2px] xl:block"
          :src="leftShape"
          alt=""
        >
        <div
          class="flex h-[65px] w-full items-center justify-end gap-1.5 rounded-t-3xl !bg-[#090A0B] px-3  pt-3 md:pl-0 md:pr-6 xl:rounded-tl-none"
        >
          <div
            v-if="selectorStore.active === 'swap'"
            class="flex size-full items-center justify-end gap-1.5"
          >
            <SwapNavButton @click="displayMarketSettingsDialog = true">
              {{ swapSettingsStore.displayedSelectedPriorityFeeName }}
              <img
                class="size-3 xl:size-4"
                :src="ArrowDown"
                alt=""
              >
            </SwapNavButton>
            <SwapNavButton @click="displaySlippageSettingsDialog = true">
              <span class="whitespace-nowrap">{{ swapSettingsStore.slippage }}% Slippage</span>
              <img
                class="size-3 xl:size-4"
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
          <AppSwitch
            v-if="selectorStore.active === 'dca'"
            v-model="enablePricingStrategy"
            label="Enable Pricing Strategy"
          />
        </div>
      </div>
    </div>

    <div class="w-full rounded-b-[72px] bg-[#090A0B] p-6">
      <div class="flex w-full flex-col gap-0">
        <div
          class="grid grid-rows-2 items-end gap-3 rounded-t-[20px] bg-[#16191D] px-6 pb-[18px] pt-6 md:grid-cols-[auto_1fr] md:grid-rows-1"
        >
          <SwapCurrencySelect
            class="w-full md:w-[175px]"
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
            :error="amountVuelidate.fromAmount.$errors"
            @button-click="onMaxButtonClick"
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
              class="text-xs text-[#A3A5B6] md:text-base"
            >Balance: <strong
              class="text-[#E1D33E]"
            >{{ tokenPairInfo.fromBalance?.toFixed(4) ?? 0 }} {{ balanceTokenSymbol
            }}</strong></span>
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
        <div
          class="grid items-end gap-3 rounded-b-[20px] bg-[#16191D] px-6 pb-[18px] pt-6 md:grid-rows-1"
          :class="{
            'grid-rows-2 md:grid-cols-[auto_1fr]': selectorStore.active === 'swap',
            'grid-rows-1 md:grid-cols-1': selectorStore.active === 'dca',
          }"
        >
          <SwapCurrencySelect
            :class="[selectorStore.active === 'swap' ? 'w-full md:w-[175px]' : 'w-full']"
            label="To"
            :current-token="tokenTo"
            @click="onToCurrencySelectClick"
          />
          <AppInput
            v-if="selectorStore.active === 'swap'"
            :model-value="toAmount"
            :loading="(fromAmount.length > 0 && tokensRouteInfo && 'inAmount' in tokensRouteInfo && tokensRouteInfo?.inAmount !== parseFloat(fromAmount)) || tokensRouteInfoLoading"
            label="Amount"
            placeholder="The output amount will be displayed here"
            :disabled="true"
            :button="true"
            button-text="MAX"
            type="number"
            :error="toAmountError"
            @button-click="onMaxButtonClick"
          />
        </div>
      </div>
      <SwapSummary
        v-if="selectorStore.active === 'swap'"
        :current-token="tokenFrom"
        :out-token="tokenTo"
        :price="tokenPairInfo?.price ?? 0"
        :in-amount-raw="parseFloat(fromAmount)"
        :loading="(fromAmount.length > 0 && tokensRouteInfo && 'inAmount' in tokensRouteInfo && tokensRouteInfo?.inAmount !== parseFloat(fromAmount)) || tokensRouteInfoLoading"
        :in-amount="tokensRouteInfo && 'inAmount' in tokensRouteInfo && tokensRouteInfo?.inAmount ? tokensRouteInfo.inAmount : 0"
        :out-amount="tokensRouteInfo && 'outAmount' in tokensRouteInfo && tokensRouteInfo?.outAmount ? tokensRouteInfo.outAmount : 0"
        :zeroes="Number.isNaN(parseFloat(fromAmount))"
        class="mt-[18px]"
      />
      <SwapDcaSettings
        v-if="selectorStore.active === 'dca'"

        v-model:rate="dcaOptions.rate"
        v-model:rate-denominator="dcaOptions.rateDenominator"
        v-model:orders-count="dcaOptions.ordersCount"

        class="mt-[18px]"
      />
      <SwapDcaPriceRange
        v-if="selectorStore.active === 'dca' && enablePricingStrategy"

        v-model:price-min="dcaOptions.minAmountPerCycle"
        v-model:price-max="dcaOptions.maxAmountPerCycle"

        class="mt-[18px]"
      />
      <SwapButton
        v-if="connected"
        :loading="false"
        class="mt-[18px]"
        @click="onSwapButtonClick"
      />
      <WalletConnectButton
        v-else
        class="mt-[18px]"
        :loading="connecting"
        @click="walletConnectStore.displayConnectDialog = true"
      />
    </div>
  </div>
  <SwapMarketSettingsDialog v-model="displayMarketSettingsDialog" />
  <SwapSlippageSettingsDialog v-model="displaySlippageSettingsDialog" />
  <SwapGeneralSettingsDialog v-model="displayGeneralSettingsDialog" />
</template>
