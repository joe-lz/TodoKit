import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Index = resolve => require(['@/components/index'], resolve)
const Sign = resolve => require(['@/components/sign'], resolve)

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index, meta: { requireAuth: true } },
    { path: '/sign', name: 'Sign', component: Sign },
    { path: '*', redirect: '/' }
  ]
})
