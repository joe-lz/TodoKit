<template lang="pug" src='./productItem.pug'>

</template>

<script>
export default {
  name: 'ProductItem',
  props: ['item'],
  data () {
    return {
      stateInfo: {}
    }
  },
  created () {
    // this.getProductStateInfo(this.item.productId._id)
  },
  methods: {
    // getProductStateInfo (productId) {
    //   let url = this.$api.getProductStateInfo
    //   let body = {
    //     data: {
    //       productId
    //     }
    //   }
    //   this.$http.post(url, body).then((res) => {
    //     if (res.data.code === 0) {
    //       this.stateInfo = res.data.data
    //     }
    //   })
    // }
  }
}
</script>

<style lang="sass" scoped src='./productItem.sass'>
</style>
