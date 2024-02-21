<script lang="ts" setup>
const modelValue = defineModel<boolean>()

const settings = ref([
  {
    name: 'Direct Route Only',
    url: 'https://google.com',
    selected: false
  },
  {
    name: 'Use wSOL',
    url: 'https://google.com',
    selected: false,
  },
  {
    name: 'Versioned Transaction',
    url: 'https://google.com',
    selected: false
  }
])
const selectItem = (index: number) => {
  settings.value[index].selected = !settings.value[index].selected
}
</script>

<template>
  <AppDialog
    v-model="modelValue"
    title="General Settings"
  >
    <div class="mt-8 w-full">
      <p class="text-theme-white-2 mb-[18px] text-base font-semibold">
        Select All Necessary Settings
      </p>
    </div>
    <div class="flex w-full flex-col gap-6">
      <SwapSettingsItem
        v-for="(setting, index) in settings"
        :key="setting.name"
        :selected="setting.selected"
        :name="setting.name"
        :url="setting.url"
        @click.stop="selectItem(index)"
      />
    </div>
    <AppButton
      class="mt-8 w-full"
      button-style="primary"
      @click="modelValue = false"
    >
      Save Settings
    </AppButton>
  </AppDialog>
</template>
