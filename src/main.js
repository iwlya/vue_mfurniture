import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import App from './App.vue'
import router from './router'

// подгружаем заказы при запуске системы

const app = createApp(App)

app.use(createPinia())

import { useOrdersStore } from './stores/ordersStore'
useOrdersStore().load()

app.use(router)
app.mount('#app')
