<template lang="jade" src='./allpost.jade'>

</template>

<script>
import TodoEdit from './todoEdit'
import NoData from '@/components/_include/nodata'
export default {
  name: 'AllPost',
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
    // 改变后，刷新页面
    this.$bus.on(this.$route.name, content => {
      this.isEdit = false
      this.changeType(this.type)
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
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    },
    getAllData () {
      let url = this.$api.postAllByLevel
      let body = {
        data: {
          productId: this.$route.params.id,
          level: this.$route.query.level,
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
    changeType (type) {
      this.reset()
      this.type = type
      this.getAllData()
    }
  },
  watch: {
    '$route' () {
      this.changeType(0)
    }
  }
}
</script>

<style lang="sass" scoped src='./allpost.sass'>
</style>
