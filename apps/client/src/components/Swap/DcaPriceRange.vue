<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, numeric, minValue, not, sameAs, helpers } from '@vuelidate/validators'

const priceMin = defineModel<number>('priceMin')
const priceMax = defineModel<number>('priceMax')

const priceMinRaw = ref('')
const priceMaxRaw = ref('')

syncRef(priceMinRaw, priceMin, {
  transform: {
    ltr: (left) => {
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

syncRef(priceMaxRaw, priceMax, {
  transform: {
    ltr: (left) => {
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

const rules = computed(() => ({
  priceMin: {
    required,
    numeric,
    nonZero: helpers.withMessage('Value cannot be equal to 0', not(sameAs('0'))),
    minValue: minValue(0),
  },
  priceMax: {
    required,
    numeric,
    nonZero: helpers.withMessage('Value cannot be equal to 0', not(sameAs('0'))),
    minValue: minValue(priceMin.value ?? 0),
  },
}))

const vuelidateData = computed(() => ({
  priceMin: priceMinRaw.value,
  priceMax: priceMaxRaw.value
}))

const vuelidate = useVuelidate(rules, vuelidateData)
</script>

<template>
  <SwapCard>
    <div class="grid grid-rows-2 items-start gap-2.5 md:grid-cols-2 md:grid-rows-1">
      <AppInput
        v-model="priceMinRaw"
        label="Minimum Price"
        placeholder="Optional"
        type="number"
        :error="vuelidate.priceMin.$errors"
        error-placement="bottom"
      />
      <AppInput
        v-model="priceMaxRaw"
        label="Maximim Price"
        placeholder="Optional"
        type="number"
        :error="vuelidate.priceMax.$errors"
        error-placement="bottom"
      />
    </div>
  </SwapCard>
</template>
