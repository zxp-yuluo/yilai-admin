import { createApp } from 'vue'
import './assets/css/reset.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import pinia from './pinia'

createApp(App).use(router).use(pinia).mount('#app')
