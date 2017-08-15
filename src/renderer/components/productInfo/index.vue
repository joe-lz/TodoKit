<template lang="jade" src='./index.jade'>

</template>

<script>
import PmHeader from '@/components/header'
import SideBar from '@/components/productinfo/sidebar'

export default {
  name: 'ProductInfo',
  components: {
    PmHeader, SideBar
  },
  data () {
    return {
      isFullStack: false,
      stateInfo: {}
    }
  },
  created () {
    this.getProductStateInfo(this.$route.params.id)
  },
  methods: {
    getProductStateInfo (productId) {
      let url = this.$api.getProductStateInfo
      let body = {
        data: {
          productId
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.stateInfo = res.data.data
        }
      })
    }
  },
  watch: {
    '$route' () {
      this.getProductStateInfo(this.$route.params.id)
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
