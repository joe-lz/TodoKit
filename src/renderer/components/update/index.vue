<template lang="pug" src='./index.pug'>

</template>

<script>
// import {shell} from 'electron'
import {markdown} from 'markdown'
export default {
  name: 'UpdateCom',
  props: ['versionData'],
  computed: {
    updateInfo () {
      return markdown.toHTML(this.versionData.githubResult.body)
    }
  },
  data () {
    return {
      showModel: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
<style lang='sass'>
@import "../mixin/mixin.sass"
.update-wrapper
  .update-info
    margin: 0 auto
    width: 300px
    .title, h2
      line-height: 30px
      font-size: 14px
      font-weight: $fw-lg
    img
      margin: 15px
      box-shadow: $box-shadow
      border: $border
    ul
      padding-left: 20px
      list-style: decimal
      line-height: 20px
      color: $gray
      li

</style>
