<template lang="jade" src='./todoL.jade'></template>

<script>
import TodoEdit from './todoEdit'
import NoData from '@/components/_include/nodata'
export default {
  name: 'ProductTodoL',
  components: {
    TodoEdit, NoData
  },
  data () {
    return {
      allData: [],
      curPost: {},
      isEdit: false,
      selected: '',
      nextPageNo: 1,
      pageSize: this.$api.pageSize
    }
  },
  created () {
    this.getAllData()
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    // 改变后，刷新页面
    this.$bus.on(this.$route.name, content => {
      this.isEdit = false
      this.refresh()
    })
    // 改变模式
    this.$bus.on('changeMode', content => {
      if (content) {
        this.$router.push({name: 'ProductTodoM'})
      }
    })
  },
  methods: {
    reset () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.nextPageNo = 1
      this.pageSize = this.$api.pageSize
    },
    getAllData () {
      if (this.nextPageNo === 0) {
        this.$Message.error('没有更多数据了!')
        return
      }
      let url = this.$api.postMy
      let body = {
        data: {
          productId: this.$route.params.id,
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
      this.isEdit = true
      this.curPost = item
    },
    refresh () {
      this.reset()
      this.getAllData()
    }
  }
}
</script>

<style lang="sass" scoped src='./todoL.sass'>
</style>
