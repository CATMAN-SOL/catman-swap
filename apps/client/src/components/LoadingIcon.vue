<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    dotClass?: string
  }>(),
  {
    dotClass: 'bg-[#030303]'
  }
)

</script>

<template>
  <div id="wave">
    <span
      class="dot"
      :class="props.dotClass"
    />
    <span
      class="dot"
      :class="props.dotClass"
    />
    <span
      class="dot"
      :class="props.dotClass"
    />
  </div>
</template>

<style lang="scss" scoped>
div#wave {
  position: relative;
  text-align: center;

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 3px;
    animation: wave 0.7s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.1s;
    }

    &:nth-child(3) {
      animation-delay: -0.9s;
    }
  }
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-8px);
  }
}
</style>
