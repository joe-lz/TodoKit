<template lang='pug'>
#app
  router-view
  //- Loading
</template>

<script>
import Loading from './components/loading'
export default {
  components: {
    Loading
  },
  name: 'todokit-electron'
}
</script>

<style lang='sass' src='./components/mixin/common.sass'></style>
