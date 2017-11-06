<template lang="pug" src='./index.pug'>

</template>

<script>
import SideBar from './_sidebar'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Product',
  components: {
    SideBar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['curProduct'])
  },
  created () {
    this.getStateInfo(this.$route.params.id)
    this.getAllUser(this.$route.params.id)
  },
  methods: {
    ...mapActions(['getStateInfo', 'getAllUser'])
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
