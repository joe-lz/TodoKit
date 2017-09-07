<template lang="jade" src='./index.jade'>

</template>

<script>
import PmHeader from '@/components/header'

export default {
  name: 'ProductInfo',
  components: {
    PmHeader
  },
  data () {
    return {
      isFullStack: false,
      stateInfo: {},
      isMatrix: false
    }
  },
  created () {
    this.changeMode()
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
    },
    changeMode () {
      this.isMatrix = this.$api.GetLocal('isMatrix')
      this.$bus.emit('changeMode', this.isMatrix)
    },
    handleIsMatrix () {
      this.$api.SetLocal('isMatrix', this.isMatrix)
      this.changeMode()
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
