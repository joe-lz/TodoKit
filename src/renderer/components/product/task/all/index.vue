<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapGetters} from 'vuex'
import TodoEdit from '../_todoEdit'

export default {
  name: 'ProductTaskAll',
  data () {
    return {
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
  components: {
    TodoEdit
  },
  computed: {
    ...mapGetters(['curProduct', 'levelArr', 'notification_count', 'typeArr', 'allUser'])
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
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    }
  }
}
</script>

<style lang="sass" scoped src='../todo/index.sass'>
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
