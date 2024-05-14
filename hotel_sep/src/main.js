import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clerkPlugin } from 'vue-clerk/plugin'
import './index.css'
import App from './App.vue'
import { frFR } from "@clerk/localizations";

import router from '@/router/index.js'
const app = createApp(App)
app.use(router)
app.use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    localization: frFR,
})
app.use(createPinia())
app.mount('#app')
