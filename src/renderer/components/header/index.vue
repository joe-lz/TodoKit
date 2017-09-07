<template lang="jade" src='./index.jade'>

</template>

<script>
export default {
  name: 'PmHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = this.$api.GetAuth().userInfo
  },
  methods: {
    signout () {
      this.$api.RemoveAuth()
      this.$router.push({name: 'SignUpSMS'})
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
<style lang='sass'>
@import "../_mixin/mixin.sass"
header
  .ivu-dropdown .ivu-select-dropdown
    position: absolute !important
    top: 50px !important
    right: 10px !important
    .ivu-dropdown-item
      padding: 0
    a
      padding: 10px 15px
      display: block
      color: $f-color
  .ivu-dropdown-item-divided
    &:before
      display: none
</style>
