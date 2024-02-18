<script lang="ts" setup>
import arrowDown from '../../assets/icons/arrow-down.svg'

const { publicKey } = useWallet()

const emit = defineEmits(['more-button-click'])

const shortPublicKey = computed(() => {
  if (!publicKey.value) return ''

  const publicKeyString = publicKey.value.toString()

  return `${publicKeyString.slice(0, 6)}...${publicKeyString.slice(-7, -1)}`
})
</script>

<template>
  <div class="flex flex-row items-stretch gap-2">
    <LightningButton class="">
      {{ shortPublicKey }}
    </LightningButton>
    <AppButton
      class="grid aspect-square h-full place-items-center rounded-full"
      @click="emit('more-button-click')"
    >
      <img :src="arrowDown">
    </AppButton>
  </div>
</template>

<style lang="scss" scoped>

</style>
