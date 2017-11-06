<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ProductSideBar',
  computed: {
    ...mapGetters(['curProduct'])
  },
  data () {
    return {
      showAll: false
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
