import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'

Vue.config.productionTip = false


//1.引入css样式
import 'normalize.css'

//2.使用element组件
import './plugins/element.js'

import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


