<template lang="jade" src='./index.jade'>

</template>

<script>
import PmHeader from '../header'

export default {
  name: 'ProductInfo',
  components: {
    PmHeader
  },
  data () {
    return {
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
          this.$bus.emit('StateInfo', this.stateInfo)
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
