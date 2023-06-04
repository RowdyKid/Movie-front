import { createApp } from 'vue'
import { createPinia } from 'pinia'

import store from './stores/store'
import user from './stores/user'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(ElementPlus)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(store)
app.use(user)

app.mount('#app')
