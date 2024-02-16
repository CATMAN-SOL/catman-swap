<script lang="ts" setup>

</script>

<template>
  <button class="icon-fill-primary-default hover:icon-fill-white group relative size-[58px] [&_path]:transition-all">
    <div class="relative z-[11]">
      <slot />
    </div>

    <svg
      class="absolute left-0 top-0 z-[9] size-full"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="51"
      viewBox="0 0 56 51"
      fill="none"
    >
      <path
        d="M2.55624 31.8044C0.355631 27.9928 0.355631 23.2968 2.55624 19.4852L9.94376 6.68963C12.1444 2.87806 16.2113 0.530037 20.6125 0.530037H35.3875C39.7887 0.530037 43.8556 2.87806 46.0562 6.68963L53.4438 19.4852C55.6444 23.2968 55.6444 27.9928 53.4438 31.8044L46.0562 44.5999C43.8556 48.4115 39.7887 50.7595 35.3875 50.7595H20.6125C16.2113 50.7595 12.1444 48.4115 9.94376 44.5999L2.55624 31.8044Z"
        fill="var(--iconColor)"
      />
    </svg>

    <svg
      class="absolute left-1/2 top-1/2 z-[10] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="45"
      viewBox="0 0 48 45"
      fill="none"
    >
      <g style="mix-blend-mode:screen">
        <path
          d="M2.41757 28.8043C0.216963 24.9928 0.21696 20.2967 2.41757 16.4852L7.87419 7.03402C10.0748 3.22245 14.1417 0.874428 18.5429 0.874428H29.4562C33.8574 0.874428 37.9243 3.22245 40.1249 7.03402L45.5815 16.4852C47.7821 20.2967 47.7821 24.9928 45.5815 28.8043L40.1249 38.2555C37.9243 42.067 33.8574 44.4151 29.4562 44.4151H18.5429C14.1417 44.4151 10.0748 42.0671 7.87419 38.2555L2.41757 28.8043Z"
          fill="url(#paint0_linear_2046_3116)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2046_3116"
          x1="21.0768"
          y1="-2.49345"
          x2="23.9995"
          y2="46.4946"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--iconColor)" />
          <stop
            offset="1"
            stop-color="var(--iconColor)"
            stop-opacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  </button>
</template>
