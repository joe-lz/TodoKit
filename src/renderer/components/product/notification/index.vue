<template lang="pug" src='./index.pug'>

</template>

<script>
import TodoEdit from '../task/_todoEdit'
export default {
  name: 'ProductTask',
  data () {
    return {
      allData: [],
      curPost: {},
      isEdit: false,
      selected: '',
      type: 0,
      nextPageNo: 1,
      pageSize: this.$api.pageSize
    }
  },
  components: {
    TodoEdit
  },
  created () {
    this.changeType(0)
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
  },
  methods: {
    reset () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.type = 0
      this.nextPageNo = 1
      this.pageSize = this.$api.pageSize
    },
    getAllData () {
      let url = this.$api.logMyAll
      let body = {
        data: {
          productId: this.$route.params.id,
          nextPageNo: this.nextPageNo,
          pageSize: this.pageSize,
          isRead: this.type
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          let { allData, nextPageNo } = res.data.data
          allData = this.$_.chain(allData).map((obj) => {
            obj.createdAt = this.$moment(obj.createdAt).format('H:mm')
            return obj
          }).value()
          this.allData = this.allData.concat(allData)
          this.nextPageNo = nextPageNo
        }
      })
    },
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item.postId
    },
    changeType (type) {
      this.reset()
      this.type = type
      this.getAllData()
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
