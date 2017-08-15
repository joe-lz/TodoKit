<template lang="jade">
.nodata(:class='size')
  i.iconfont.icon-zanwuwenda
  p 暂无数据
</template>

<script>
export default {
  props: ['size']
}
</script>

<style lang="sass" scoped>
@import "../_mixin/mixin.sass"
.nodata
  padding: 200px 0
  text-align: center
  color: $gray-sub-sub
  opacity: 0.6
  i
    font-size: 10rem
  p
    margin-top: 10px
.small
  padding-top: 100px
</style>
