<template lang="jade" src='./todoM.jade'></template>

<script>
export default {
  name: 'ProductTodoM',
  methods: {
    handleMatrix () {
      // 重要  紧急
      this.getMatrixData('allData1', true, true)
      this.getMatrixData('allData2', false, true)
      this.getMatrixData('allData3', true, false)
      this.getMatrixData('allData4', false, false)
    },
    getMatrixData (wrapper, isImportant, isUrgent) {
      let url = this.$api.postMyMatrix
      let body = {
        data: {
          productId: this.$route.params.id,
          isImportant,
          isUrgent
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this[wrapper] = res.data.data.allData
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
