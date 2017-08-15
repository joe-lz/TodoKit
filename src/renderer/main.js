import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import moment from 'moment'
import _ from 'lodash'
import VueSocketio from 'vue-socket.io'
// -----------------------------------------------------------------------------------------------
import api from './_api.js'
Vue.prototype.$api = api
Vue.use(iView)
Vue.prototype.$moment = moment
Vue.prototype.$_ = _
Vue.use(VueSocketio, 'http://127.0.0.1:4100')
// -----------------------------------------------------------------------------------------------
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (api.GetAuth() && api.GetAuth().access_token) {
    config.data['access_token'] = api.GetAuth().access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  // token 已过期，重定向到登录页面
  if (res.data.code === 5) {
    api.RemoveAuth()
    router.push({ name: 'SignUpSMS' })
  }
  return res
}, (err) => {
  // Do something with response error
  Vue.prototype.$Message.error(err)
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
      next({ name: 'SignUpSMS', query: { from: to.fullPath } })
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
