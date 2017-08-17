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
      type: 0,
      nextPageNo: 1,
      pageSize: this.$api.pageSize
    }
  },
  created () {
    this.changeType(0)
    // 改变后，刷新页面
    this.busEventRouteName()
    this.$bus.on('changeType', content => {
      this.changeType(content)
    })
  },
  methods: {
    busEventRouteName () {
      this.$bus.off(this.$route.name)
      // this.$bus.emit('hideTodoEdit', 'true')
      this.$bus.once(this.$route.name, content => {
        console.log(content)
        this.changeType(this.type)
      })
    },
    reset () {
      this.allData = []
      this.curPost = {}
      this.selected = ''
      this.type = 0
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
          type: this.type,
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
      this.busEventRouteName()
      this.selected = item._id
      item.direction = this.direction
      this.$bus.emit('curPost', item)
    },
    refresh () {
      this.reset()
      this.getAllData()
    },
    changeType (type) {
      this.reset()
      this.type = type
      this.getAllData()
    }
  }
}
</script>

<style lang="sass" scoped src='./todoMItem.sass'>
</style>
