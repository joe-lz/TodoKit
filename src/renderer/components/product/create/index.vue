<template lang="pug" src='./index.pug'>

</template>

<script>
import Create from './create'
import History from './history'
export default {
  name: 'ProductTaskCreate',
  data () {
    return {
      selected: 1
    }
  },
  components: {
    Create, History
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
