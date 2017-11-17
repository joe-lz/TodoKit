<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ProductSideBar',
  computed: {
    ...mapGetters(['curProduct', 'notification_count'])
  },
  data () {
    return {
      showAll: false
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['getStateInfo'])
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
