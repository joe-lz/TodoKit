<template lang="jade" src='./todoT.jade'></template>

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
      level: 0,
      nextPageNo: 1,
      pageSize: this.$api.pageSize
    }
  },
  created () {
    this.changeLevel(0)
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    // 改变后，刷新页面
    this.busEventRouteName()
    // 改变模式
    this.busEventChangeMode()
  },
  methods: {
    busEventRouteName () {
      this.$bus.off(this.$route.name)
      this.$bus.once(this.$route.name, content => {
        this.isEdit = false
        console.log(content)
        this.changeLevel(this.level)
      })
    },
    busEventChangeMode () {
      this.$bus.off('changeMode')
      this.$bus.once('changeMode', content => {
        if (content) {
          this.$router.push({name: 'ProductTodoM'})
        }
      })
    },
    reset () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.level = 0
      this.nextPageNo = 1
      this.pageSize = this.$api.pageSize
    },
    getAllData () {
      if (this.nextPageNo === 0) {
        this.$Message.error('没有更多数据了!')
        return
      }
      let url = this.$api.postMycreate
      let body = {
        data: {
          productId: this.$route.params.id,
          nextPageNo: this.nextPageNo,
          pageSize: this.pageSize,
          level: this.level
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
      this.isEdit = true
      this.curPost = item
    },
    changeLevel (level) {
      this.reset()
      this.level = level
      this.getAllData()
    }
  }
}
</script>

<style lang="sass" scoped src='./todoL.sass'>
</style>
