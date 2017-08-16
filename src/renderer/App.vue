<template lang='jade'>
#app
  transition(name='fade')
    router-view.absolute
</template>

<script>
export default {
  name: 'pm_vue',
  data () {
    return {
      curUserId: ''
    }
  },
  created () {
    if (this.$api.GetAuth()) {
      this.curUserId = this.$api.GetAuth().userInfo._id
    }
  },
  sockets: {
    connect () {  // 这里是监听connect事件
      // this.id = this.$socket.id
      console.log('socket connect')
      console.log(this.$socket.id)
    },
    NewPost (val) {
      console.log(val)
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新任务', {
          body: val.content
        })
        console.log(myNotification)
      }
      // myNotification.onclick = () => {
      //   console.log('Notification clicked')
      // }
    },
    NewLog (val) {
      console.log(this.curUserId)
      console.log(val.to)
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新消息', {
          body: val.content
        })
        console.log(myNotification)
      }
    }
  },
  watch: {
    $route () {
      if (this.$api.GetAuth()) {
        this.curUserId = this.$api.GetAuth().userInfo._id
      }
    }
  }
}
</script>

<style lang='sass' src='./components/_mixin/common.sass'></style>
