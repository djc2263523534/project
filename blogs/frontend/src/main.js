import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入样式
import 'normalize.css'

createApp(App).use(store).use(router).mount('#app')
