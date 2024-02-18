<script lang="ts" setup>
const { disconnect } = useWallet()

const modelValue = defineModel<boolean>()
const displayConfirmation = ref(false)

watch(modelValue, (newValue) => {
  if (newValue) displayConfirmation.value = false
})

const onDisconnectButtonClick = async () => {
  if (displayConfirmation.value) {
    await disconnect()
    modelValue.value = false
  }

  displayConfirmation.value = true
}

const onCancelButtonClick = () => {
  displayConfirmation.value = false
  modelValue.value = false
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="Disconnect"
  >
    <WalletDialogConnectStatus>
      <template #after>
        <AppButton
          @click="onDisconnectButtonClick"
        >
          Disconnect
        </AppButton>
        <AppButton
          v-if="displayConfirmation"
          button-style="secondary"
          @click="onCancelButtonClick"
        >
          Cancel
        </AppButton>
      </template>
    </WalletDialogConnectStatus>
  </AppDialog>
</template>
