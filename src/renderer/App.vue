<template lang='jade'>
#app
  transition(name='fade')
    router-view.absolute
</template>

<script>
export default {
  name: 'pm_vue',
  created () {
  }
}
</script>

<style lang='sass' src='./components/_mixin/common.sass'></style>
