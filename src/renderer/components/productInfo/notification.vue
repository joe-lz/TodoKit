<template lang="jade" src='./notification.jade'>

</template>

<script>
import TodoEdit from './todoEdit'
import NoData from '@/components/_include/nodata'
export default {
  name: 'ProdcutNotification',
  components: {
    TodoEdit, NoData
  },
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
  created () {
    this.changeType(0)
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    this.busEventRouteName()
  },
  methods: {
    busEventRouteName () {
      this.$bus.off(this.$route.name)
      this.$bus.once(this.$route.name, content => {
        this.isEdit = false
      })
    },
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
      let url = this.$api.logMy
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
            obj.createdAt = this.$moment(obj.createdAt).format('YYYY/MM/DD h:mm:ss')
            return obj
          }).value()
          this.allData = this.allData.concat(allData)
          this.nextPageNo = nextPageNo
        }
      })
    },
    handleEdit (item) {
      this.busEventRouteName()
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

<style lang="sass" scoped src='./notification.sass'>
</style>
