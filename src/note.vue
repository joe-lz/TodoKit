import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Index = resolve => require(['@/components/index'], resolve)

export default new Router({
  routes: [{
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


.one_wrapper


let url = this.$api.productMy
let body = {}
this.$http.post(url, body).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})


  this.$Message.error('表单验证失败!')
