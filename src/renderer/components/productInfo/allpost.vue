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
      selected: ''
    }
  },
  created () {
    this.getAllData(this.$route.query.level)
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    // 改变后，刷新页面
    this.$bus.on('changeAllPostLevel', content => {
      this.getAllData(this.$route.query.level)
      this.isEdit = false
    })
  },
  methods: {
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    },
    getAllData (level) {
      let url = this.$api.postAllByLevel
      let body = {
        data: {
          productId: this.$route.params.id,
          level
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allData = res.data.data.allData
        }
      })
    }
  },
  watch: {
    '$route' () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.getAllData(this.$route.query.level)
    }
  }
}
</script>

<style lang="sass" scoped src='./todo.sass'>
</style>
