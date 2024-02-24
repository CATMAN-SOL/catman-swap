import { Buffer } from 'buffer'

import './fonts'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

import SolanaWallets from 'solana-wallets-vue'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import PrimeVue from 'primevue/config'

globalThis.Buffer = Buffer

const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
})

const pinia = createPinia()

app.use(pinia)

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolflareWalletAdapter(),
    new CoinbaseWalletAdapter(),
  ],
  autoConnect: true,
}

app.use(SolanaWallets, walletOptions)

app.mount('#app')
