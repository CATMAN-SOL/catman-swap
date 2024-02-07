import './style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

app.use(router)

const pinia = createPinia()

app.use(pinia)

app.mount('#app')
