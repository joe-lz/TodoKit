<template lang="jade" src='./todo.jade'>

</template>

<script>
import TodoEdit from './todoEdit'
import NoData from '@/components/_include/nodata'
export default {
  name: 'ProductTodo',
  components: {
    TodoEdit, NoData
  },
  data () {
    return {
      isMatrix: false,
      pageStyle: 'matrix',  // list matrix
      allData1: [],
      allData2: [],
      allData3: [],
      allData4: [],
      allData: [],
      curPost: {},
      isEdit: false,
      selected: ''
    }
  },
  created () {
    this.changeMode()
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    // 改变后，刷新页面
    this.$bus.on('changeLevel', content => {
      this.changeMode()
      this.isEdit = false
    })
  },
  methods: {
    handleEdit (item) {
      this.selected = item._id
      this.isEdit = true
      this.curPost = item
    },
    getAllData () {
      let url = this.$api.postMy
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allData = res.data.data.allData
        }
      })
    },
    handleMatrix () {
      // 重要  紧急
      this.getMatrixData('allData1', true, true)
      this.getMatrixData('allData2', false, true)
      this.getMatrixData('allData3', true, false)
      this.getMatrixData('allData4', false, false)
    },
    getMatrixData (wrapper, isImportant, isUrgent) {
      let url = this.$api.postMyMatrix
      let body = {
        data: {
          productId: this.$route.params.id,
          isImportant,
          isUrgent
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this[wrapper] = res.data.data.allData
        }
      })
    },
    changeMode () {
      this.isMatrix = this.$api.GetLocal('isMatrix')
      if (this.isMatrix) {
        this.handleMatrix()
      } else {
        this.getAllData()
      }
    },
    handleIsMatrix () {
      this.$api.SetLocal('isMatrix', this.isMatrix)
      this.changeMode()
    }
  }
}
</script>

<style lang="sass" scoped src='./todo.sass'>
</style>
