<template lang="jade" src='./todoM.jade'></template>

<script>
import TodoMItem from './todoMItem'
import TodoEdit from './todoEdit'
export default {
  name: 'ProductTodoM',
  components: {
    TodoMItem, TodoEdit
  },
  data () {
    return {
      curPost: {},
      isEdit: false,
      direction: 'left',
      type: 0
    }
  },
  created () {
    // 点击关闭窗口
    this.$nextTick(() => {
      window.addEventListener('click', () => {
        this.isEdit = false
      })
    })
    // 更新完成后刷新
    // this.$bus.on('hideTodoEdit', content => {
    //   console.log('ss')
    //   this.isEdit = false
    // })
    // 子组建传递curPost过来
    this.$bus.on('curPost', content => {
      this.curPost = content
      this.isEdit = true
      this.direction = content.direction
    })
    // 改变模式
    this.busEventChangeMode()
  },
  methods: {
    busEventChangeMode () {
      this.$bus.off('changeMode')
      this.$bus.once('changeMode', content => {
        console.log(content)
        if (!content) {
          this.$router.push({name: 'ProductTodoL'})
        }
      })
    },
    changeType (type) {
      this.type = type
      this.$bus.emit('changeType', type)
    }
  }
}
</script>

<style lang="sass" scoped src='./todoM.sass'>
</style>
