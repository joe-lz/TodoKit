<template lang="pug" src='./index.pug'>

</template>

<script>
import Basic from './basic'
import Version from './version'
import Tag from './tag'
import Member from './member'
export default {
  name: 'ProductSetting',
  components: {
    Basic, Version, Tag, Member
  },
  data () {
    return {
      selected: 1
    }
  },
  created () {
  },
  methods: {
    changeNav (index) {
      this.selected = index
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
<style lang='sass'>
.setting-wrapper
  input
    border: solid 1px #F1F4FB
    &:hover, &:active
      border: 1px solid #57a3f3
</style>
