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
      allDataRead: [],
      selected: '',
      isEdit: false,
      curPost: {}
    }
  },
  created () {
    this.getAllData(false, 'allData')
    this.getAllData(true, 'allDataRead')
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
  },
  methods: {
    getAllData (isRead, valName) {
      let url = this.$api.logMy
      let body = {
        data: {
          isRead: isRead,
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          let allData = res.data.data.allData
          this[valName] = this.$_.chain(allData).map((obj) => {
            obj.createdAt = this.$moment(obj.createdAt).format('YYYY/MM/DD h:mm:ss')
            return obj
          }).value()
        }
      })
    },
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item.postId
    }
  }
}
</script>

<style lang="sass" scoped src='./notification.sass'>
</style>
