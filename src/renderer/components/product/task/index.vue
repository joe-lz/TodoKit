<template lang="pug" src='./index.pug'>

</template>

<script>
import Todo from './todo'
import All from './all'
import Statistic from './statistic'
export default {
  name: 'ProductTask',
  components: {
    Todo, All, Statistic
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
