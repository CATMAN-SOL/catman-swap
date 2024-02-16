<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue'

const props = defineProps<{
  panelClass?: string;

  title: string;
  text?: string;
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <TransitionRoot
    appear
    :show="modelValue"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="modelValue = false"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/90 backdrop-blur-lg" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-50"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-50"
          >
            <DialogPanel
              class="w-full self-stretch overflow-hidden rounded-3xl border border-black bg-[#090A0B] p-10 text-left shadow-xl transition-all md:self-center lg:w-[800px]"
              :class="props.panelClass"
            >
              <div>
                <div class="border-b-theme-dark-gray-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-y-4 border-b pb-5">
                  <div class="text-theme-white-1 text-5xl font-semibold">
                    {{ props.title }}
                  </div>
                  <HexagonButtonClose @click="modelValue = false" />
                  <div
                    v-if="props.text"
                    class="text-theme-white-2 col-span-2 text-[16px] font-semibold leading-8"
                  >
                    {{ props.text }}
                  </div>
                </div>
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped></style>
