import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// -----------------------------------------------------------------------------------------------
import api from './_api.js'
Vue.prototype.$api = api
// -----------------------------------------------------------------------------------------------
axios.interceptors.response.use((res) => {
  // token 已过期，重定向到登录页面
  if (res.data.code === 2) {
    api.RemoveAuth()
    router.push({ name: 'Sign' })
  }
  return res
}, (err) => {
  // Do something with response error
  return Promise.reject(err)
})
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// -----------------------------------------------------------------------------------------------
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (api.GetAuth() && api.GetAuth().access_token) {
      next()
    } else {
      api.RemoveAuth()
      next({ name: 'Sign', query: { from: to.fullPath } })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
