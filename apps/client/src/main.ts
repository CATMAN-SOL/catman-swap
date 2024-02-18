import './fonts'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

import SolanaWallets from 'solana-wallets-vue'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import PrimeVue from 'primevue/config'

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
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
}

app.use(SolanaWallets, walletOptions)

app.mount('#app')
