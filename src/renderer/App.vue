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
      curUserId: this.$api.GetAuth().userInfo._id
    }
  },
  created () {
  },
  sockets: {
    connect () {  // 这里是监听connect事件
      this.id = this.$socket.id
    },
    NewPost (val) {
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
      console.log(this.curUserId, val.to)
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新消息', {
          body: val.content
        })
        console.log(myNotification)
      }
    }
  }
}
</script>

<style lang='sass' src='./components/_mixin/common.sass'></style>
