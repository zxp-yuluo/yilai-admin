import { createApp } from 'vue'
import 'element-plus/theme-chalk/src/index.scss'
import ElementPlus from 'element-plus'
import router from './router/router'
import pinia from './pinia'
import App from './App.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(ElementPlus,{
  locale: zhCn
})
app.use(router)
app.use(pinia)
app.mount('#app')
