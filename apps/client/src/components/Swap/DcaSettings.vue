<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, numeric, minValue, helpers } from '@vuelidate/validators'

const dcaOptions = [
  {
    name: 'Seconds',
    denominator: 1
  },
  {
    name: 'Minutes',
    denominator: 60
  },
  {
    name: 'Hours',
    denominator: 3600
  },
  {
    name: 'Days',
    denominator: 86_400
  },
  {
    name: 'Weeks',
    denominator: 604_800
  },
]

const rate = defineModel<number>('rate')
const rateDenominator = defineModel<number>('rateDenominator')
const ordersCount = defineModel<number>('ordersCount')

const rateRaw = ref<string>('')
const ordersCountRaw = ref<string>('')
const selectedDenominatorOptionIndex = ref(-1)

syncRef(rateRaw, rate, {
  transform: {
    ltr: (left) => {
      console.log('SYNCING')

      if (!left) {
        return 0
      }

      return parseFloat(left)
    },
    rtl: (right) => {
      return right?.toString() ?? ''
    }
  }
})

syncRef(ordersCountRaw, ordersCount, {
  transform: {
    ltr: (left) => {
      console.log('SYNCING')

      if (!left) {
        return 0
      }

      return parseFloat(left)
    },
    rtl: (right) => {
      return right?.toString() ?? ''
    }
  }
})

syncRef(selectedDenominatorOptionIndex, rateDenominator, {
  transform: {
    ltr: (val) => {
      if (val < 0) {
        return 0
      }

      return dcaOptions[val].denominator
    },
    rtl: (val) => {
      return dcaOptions.findIndex(elem => elem.denominator === val)
    }
  }
})

const rules = computed(() => ({
  rate: {
    required,
    numeric,
    minValue: selectedDenominatorOptionIndex.value === 0 ? minValue(30) : minValue(1)
  },
  ordersCount: {
    required, numeric, minValue: minValue(2)
  },
  rateDenominator: {
    minValue: helpers.withMessage('This field is required', minValue(0))
  }
}))

const vuelidateData = computed(() => ({
  rate: rateRaw.value,
  rateDenominator: selectedDenominatorOptionIndex.value,
  ordersCount: ordersCountRaw.value
}))

const vuelidate = useVuelidate(rules, vuelidateData)

const dcaSelectOptions = computed(() => {
  return dcaOptions.map(value => value.name)
})

</script>

<template>
  <SwapCard>
    <div class="grid w-full grid-rows-3 items-start gap-2.5 md:grid-cols-3 md:grid-rows-1">
      <AppInput
        v-model="rateRaw"
        placeholder="1"
        label="Every"
        type="number"
        :error="vuelidate.rate.$errors"
        error-placement="bottom"
      />
      <AppSelectInput
        v-model="selectedDenominatorOptionIndex"
        placeholder="Minutes"
        label="Interval"
        :options="dcaSelectOptions"
        :error="vuelidate.rateDenominator.$errors"
        error-placement="bottom"
      />
      <AppInput
        v-model="ordersCountRaw"
        placeholder="2"
        :button="true"
        button-text="Orders"
        :button-disabled="true"
        label="Over"
        type="number"
        :error="vuelidate.ordersCount.$errors"
        error-placement="bottom"
      />
    </div>
  </SwapCard>
</template>
