<template lang="jade" src='./setting.jade'>

</template>

<script>
import Basic from './settingBasic'
import Versions from './settingVersions'
import Tags from './settingTags'
export default {
  name: 'ProductSetting',
  components: {
    Basic, Versions, Tags
  },
  data () {
    return {
      comName: 'Basic'
    }
  },
  created () {
    if (this.$route.query.comName) {
      this.comName = this.$route.query.comName
    }
  },
  methods: {
    changeType (comName) {
      this.comName = comName
    }
  }
}
</script>

<style lang="sass" scoped src='./setting.sass'>
</style>
