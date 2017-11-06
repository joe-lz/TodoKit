<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapGetters} from 'vuex'
import TodoEdit from '../../task/_todoEdit'

export default {
  name: 'ProductTaskHistoryOperation',
  computed: {
    ...mapGetters(['levelArr'])
  },
  data () {
    return {
      allData: [],
      pageSize: this.$api.pageSize,
      nextPageNo: 1,
      curPost: {},
      isEdit: false,
      selected: '',
      level: ''
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
    reset () {
      this.allData = []
      this.curPost = {}
      this.isEdit = false
      this.selected = ''
      this.nextPageNo = 1
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
    handleChange () {
      this.reset()
      this.getAllData()
    },
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    }
  }
}
</script>

<style lang="sass" scoped src='../../task/todo/index.sass'>
</style>

<style lang='sass'>
@import "../../../mixin/mixin.sass"
.all-wrapper
  position: relative
  .filter-wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 10
    padding-left: 180px
    padding-top: 60px
    width: 100%
    text-align: center
    background-color: white
    .ivu-select
      margin: 0 10px
      display: inline-block
      width: 80px
      .ivu-select-selected-value
        color: $f-color
      .ivu-select-selection
        border: none
        color: $gray-sub-sub
        font-weight: $fw-lg
        &:hover
          .ivu-select-placeholder
            color: $f-color
        .ivu-icon
          &:before
            color: $gray-sub-sub
</style>
