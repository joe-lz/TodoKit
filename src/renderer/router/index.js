import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/home'], resolve)
const Product = resolve => require(['@/components/product'], resolve)
const ProductTask = resolve => require(['@/components/product/task'], resolve)
const ProductTaskCreate = resolve => require(['@/components/product/create'], resolve)
const ProductNotification = resolve => require(['@/components/product/notification'], resolve)
const ProductSetting = resolve => require(['@/components/product/setting'], resolve)
const ProductUserCenter = resolve => require(['@/components/product/userCenter'], resolve)
// const Sign = resolve => require(['@/components/sign'], resolve)
const SignUpSMS = resolve => require(['@/components/sign/signup-sms'], resolve)

export default new Router({
  linkActiveClass: 'active',
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', name: 'Index', component: Home, meta: { requireAuth: true } },
    { path: '/product/:id',
      component: Product,
      children: [
        { path: '', name: 'ProductTaskHome', redirect: {name: 'ProductTask'} },
        { path: 'task', name: 'ProductTask', component: ProductTask, meta: { requireAuth: true } },
        { path: 'create', name: 'ProductTaskCreate', component: ProductTaskCreate, meta: { requireAuth: true } },
        { path: 'notification', name: 'ProductNotification', component: ProductNotification, meta: { requireAuth: true } },
        { path: 'setting', name: 'ProductSetting', component: ProductSetting, meta: { requireAuth: true } },
        { path: 'user', name: 'ProductUserCenter', component: ProductUserCenter, meta: { requireAuth: true } }
      ]
    },
    // { path: '/sign', name: 'Sign', component: Sign },
    { path: '/signup-sms', name: 'SignUpSMS', component: SignUpSMS },
    { path: '*', redirect: '/' }
  ]
})
