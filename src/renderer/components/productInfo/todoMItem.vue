<template lang="jade" src='./todoMItem.jade'>

</template>

<script>
import NoData from '@/components/_include/nodata'
export default {
  name: 'TodoMItem',
  components: {
    NoData
  },
  props: ['isImportant', 'isUrgent', 'direction'],
  data () {
    return {
      allData: [],
      curPost: {},
      selected: '',
      nextPageNo: 1,
      pageSize: this.$api.pageSize
    }
  },
  created () {
    this.getAllData()
    // 改变后，刷新页面
    this.$bus.on('refreshTodoMItem', content => {
      this.refresh()
    })
  },
  methods: {
    reset () {
      this.allData = []
      this.curPost = {}
      this.selected = ''
      this.nextPageNo = 1
      this.pageSize = this.$api.pageSize
    },
    getAllData () {
      if (this.nextPageNo === 0) {
        this.$Message.error('没有更多数据了!')
        return
      }
      let url = this.$api.postMyMatrix
      let body = {
        data: {
          productId: this.$route.params.id,
          isImportant: this.isImportant,
          isUrgent: this.isUrgent,
          nextPageNo: this.nextPageNo,
          pageSize: this.pageSize
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
    handleEdit (item) {
      this.selected = item._id
      item.direction = this.direction
      this.$bus.emit('curPost', item)
    },
    refresh () {
      this.reset()
      this.getAllData()
    }
  }
}
</script>

<style lang="sass" scoped src='./todoMItem.sass'>
</style>
