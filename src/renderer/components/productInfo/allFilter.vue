<template lang="jade" src='./allFilter.jade'>

</template>

<script>
import TodoEdit from './todoEdit'
import NoData from '../_include/nodata'
export default {
  name: 'ProductAllFilter',
  components: {
    TodoEdit, NoData
  },
  data () {
    return {
      stateInfo: {},
      allUser: [],
      allData: [],
      formData: {
        productId: this.$route.params.id,
        type: '',
        level: '',
        tag: '',
        version: '',
        createrId: '',
        to: '',
        finisherId: ''
      },
      pageSize: this.$api.pageSize,
      nextPageNo: 1,
      curPost: {},
      isEdit: false,
      selected: ''
    }
  },
  created () {
    this.getAllUser()
    this.getAllData()
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    this.busEventStateInfo()
    this.busEventRouteName()
  },
  methods: {
    reset () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.nextPageNo = 1
    },
    resetForm () {
      this.formData = {
        productId: this.$route.params.id,
        type: '',
        level: '',
        tag: '',
        version: '',
        createrId: '',
        to: '',
        finisherId: ''
      }
    },
    busEventStateInfo () {
      this.$bus.off('StateInfo')
      this.$bus.once('StateInfo', content => {
        this.stateInfo = content
      })
    },
    busEventRouteName () {
      this.$bus.off(this.$route.name)
      this.$bus.once(this.$route.name, content => {
        this.isEdit = false
        this.getAllData()
      })
    },
    getAllUser () {
      let url = this.$api.productAllUser
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allUser = res.data.data.allData
        }
      })
    },
    getAllData () {
      let url = this.$api.postAllByFilter
      let body = {
        data: {
          formData: this.formData,
          pageSize: this.pageSize,
          nextPageNo: this.nextPageNo
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
    handleChange () {
      this.reset()
      this.getAllData()
    },
    handleReset () {
      // this.reset()
      // this.resetForm()
      // this.getAllData()
      window.location.reload()
    },
    handleEdit (item) {
      this.busEventRouteName()
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    }
  }
}
</script>

<style lang="sass" scoped src='./allFilter.sass'>
</style>
<style lang='sass'>
.allFilter-wrapper
  .filter-wrapper
    .ivu-tooltip
      flex: 1
    .ivu-tooltip-rel
      min-width: 80px
    .ivu-select-selection
      border: none
      box-shadow: none
      height: 44px
    .ivu-select-placeholder, .ivu-select-selected-value
      text-align: right
      height: 44px
      line-height: 44px
</style>
