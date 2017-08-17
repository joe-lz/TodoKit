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
      direction: 'left'
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
    this.$bus.on(this.$route.name, content => {
      this.isEdit = false
      // this.refresh()
    })
    // 子组建传递curPost过来
    this.$bus.on('curPost', content => {
      this.curPost = content
      this.isEdit = true
      this.direction = content.direction
    })
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
@import "../_mixin/mixin.sass"
.section-wrapper
  height: 100%
  .section-content
    height: 100%
    .matrix-wrapper
      display: flex
      height: 50%
      border-top: $border
      border-top-color: $red
      &:first-child
        border: none

.todoEdit-wrapper
  right: -600px
  transition: $transition
  &.isEdit
    right: 0
.todoEdit-wrapper.right
  left: -600px
  right: initial
  &.isEdit
    left: 0
    right: initial
</style>
