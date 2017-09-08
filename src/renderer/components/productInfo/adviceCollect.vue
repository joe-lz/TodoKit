<template lang="jade" src='./adviceCollect.jade'>

</template>

<script>
export default {
  name: 'AdviceCollect',
  data () {
    return {
      pageSize: this.$api.pageSize,
      nextPageNo: 1,
      allData: []
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    reset () {
      this.nextPageNo = 1
      this.allData = []
    },
    getAllData () {
      let url = this.$api.adviceAll
      let body = {
        data: {
          productId: this.$route.params.id,
          pageSize: this.pageSize,
          nextPageNo: this.nextPageNo
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          let { allData, nextPageNo } = res.data.data
          this.allData = this.allData.concat(allData)
          this.nextPageNo = nextPageNo
        }
      })
    },
    changeLevel (level) {
      let url = this.$api.adviceChangeLevel
      let body = {
        data: {
          productId: this.$route.params.id,
          level
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('操作成功')
          this.reset()
          this.getAllData()
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped src='./adviceCollect.sass'>
</style>
