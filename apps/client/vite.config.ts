import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import TsconfigPaths from 'vite-tsconfig-paths'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    AutoImport({
      dts: 'src/auto-import.d.ts',
      imports: [
        'vue',
        '@vueuse/head',
        '@vueuse/core',
        'vue-router',
        'pinia',
        {
          from: 'solana-wallets-vue',
          imports: ['useWallet'],
        },
      ],
      dirs: ['./src/composables/*', './src/store/*', './src/api/*'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Pages(),
    TsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
