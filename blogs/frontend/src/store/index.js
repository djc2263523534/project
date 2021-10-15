import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'

export default createStore({
  modules: {
    user
  },
  getters,
  state: {
    home: '首页'
  }

})

