<template lang="pug" src='./index.pug'>

</template>

<script>
import TodoEdit from '../_todoEdit'
export default {
  name: 'ProductTaskTodo',
  data () {
    return {
      allData: [],
      type: 0,
      nextPageNo: 1,
      pageSize: this.$api.pageSize,
      curPost: {},
      isEdit: false,
      selected: ''
    }
  },
  components: {
    TodoEdit
  },
  created () {
    this.getAllData()
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    this.$bus.$on('TaskOperateSuccess', (content) => {
      if (content) {
        this.allData = []
        this.nextPageNo = 1
        this.getAllData()
      }
    })
  },
  methods: {
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
          pageSize: this.pageSize,
          type: this.type
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
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
