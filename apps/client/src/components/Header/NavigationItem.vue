<script lang="ts" setup>
const props = defineProps<{
  icon: string
  href: string
}>()
</script>

<template>
  <a
    :href="props.href"
    class="group relative z-[10] size-12"
  >
    <div class="icon-fill-white group-hover:icon-fill-navlinks-hover absolute left-0 top-0 z-[5] grid size-full place-items-center rounded-[10px] bg-[#16191D] transition-all group-active:bg-[#2D353F]">
      <AppIcon
        :icon="props.icon"
      />
    </div>

    <div class="absolute left-[-1px] top-[-1px] z-[4] size-[calc(100%+2px)] overflow-hidden rounded-[11px] bg-[#16191D] transition-all group-active:bg-[#2D353F]">
      <div class="absolute left-0 top-0 size-full bg-gradient-to-tr from-transparent to-white opacity-0 transition-opacity group-hover:opacity-10" />
    </div>
  </a>
</template>

<style scoped>
</style>
