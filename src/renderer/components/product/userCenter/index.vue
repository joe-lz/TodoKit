<template lang="pug" src='./index.pug'>

</template>

<script>
import Profile from './profile'
import Donate from './donate'
export default {
  name: 'ProductUserCenter',
  components: {
    Profile, Donate
  },
  data () {
    return {
      selected: 1
    }
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
