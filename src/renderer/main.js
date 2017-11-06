import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import messages from './locale/zh'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import api from './_api.js'
import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'

let bus = new Vue()
Vue.prototype.$bus = bus

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages
})
Vue.use(iView)
Vue.prototype.$api = api
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$_ = _
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    if (api && api.GetAuth() && api.GetAuth().access_token) {
      config.data['access_token'] = api.GetAuth().access_token
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  // token 已过期，重定向到登录页面
  if (res.data.code === 5) {
    api.RemoveAuth()
    // router.push({ name: 'SignUpSMS' })
  }
  return res
}, (err) => {
  Vue.prototype.$Message.error(err)
  return Promise.reject(err)
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

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
  i18n,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
