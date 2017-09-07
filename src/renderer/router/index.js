import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Index = resolve => require(['@/components/index'], resolve)
const About = resolve => require(['@/components/about'], resolve)
const SignIn = resolve => require(['@/components/sign'], resolve)
const SignUp = resolve => require(['@/components/sign/signup'], resolve)
const SignUpSMS = resolve => require(['@/components/sign/signup-sms'], resolve)
const UserSetting = resolve => require(['@/components/user/setting'], resolve)
const ProductInfo = resolve => require(['@/components/productInfo'], resolve)
const ProductCreate = resolve => require(['@/components/productInfo/create'], resolve)
const ProductTodoL = resolve => require(['@/components/productInfo/todoL'], resolve)
const ProductTodoT = resolve => require(['@/components/productInfo/todoT'], resolve)
const ProductMember = resolve => require(['@/components/productInfo/member'], resolve)
const ProductSetting = resolve => require(['@/components/productInfo/setting'], resolve)
const ProductNotification = resolve => require(['@/components/productInfo/notification'], resolve)
const ProductAllFilter = resolve => require(['@/components/productInfo/allFilter'], resolve)
const ProductStatistics = resolve => require(['@/components/productInfo/statistics'], resolve)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/', name: 'Index', component: Index, meta: { requireAuth: true } },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/about', name: 'About', component: About },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/signup-sms', name: 'SignUpSMS', component: SignUpSMS },
    { path: '/user/setting', name: 'UserSetting', component: UserSetting, meta: { requireAuth: true } },
    { path: '/product/:id',
      component: ProductInfo,
      children: [
        { path: '', name: 'ProductInfo', redirect: {name: 'ProductTodoL'} },
        { path: 'create', name: 'ProductCreate', component: ProductCreate, meta: { requireAuth: true } },
        { path: 'todoL', name: 'ProductTodoL', component: ProductTodoL, meta: { requireAuth: true } },
        { path: 'todoT', name: 'ProductTodoT', component: ProductTodoT, meta: { requireAuth: true } },
        { path: 'member', name: 'ProductMember', component: ProductMember, meta: { requireAuth: true } },
        { path: 'setting', name: 'ProductSetting', component: ProductSetting, meta: { requireAuth: true } },
        { path: 'notification', name: 'ProductNotification', component: ProductNotification, meta: { requireAuth: true } },
        { path: 'allfilter', name: 'ProductAllFilter', component: ProductAllFilter, meta: { requireAuth: true } },
        { path: 'statistics', name: 'ProductStatistics', component: ProductStatistics, meta: { requireAuth: true } }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
