<template lang="jade" src='./todoL.jade'></template>

<script>
export default {
  name: 'ProductTodoL',
  data () {
    return {
    }
  },
  methods: {
    getAllData () {
      let url = this.$api.postMy
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allData = res.data.data.allData
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
