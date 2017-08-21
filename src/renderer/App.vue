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
    // window.onbeforeunload = function (e) {
    //   alert('dd')
    //   return false
    // }
  },
  sockets: {
    connect () {  // 这里是监听connect事件
      console.log('socket connect')
      // console.log(this.$socket.id)
    },
    NewPost (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('任务', {
          body: val.content
        })
        console.log(myNotification)
      }
      // myNotification.onclick = () => {
      //   console.log('Notification clicked')
      // }
    },
    NewLog (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('评论', {
          body: val.content
        })
        console.log(myNotification)
      }
    },
    NewProduct (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('消息', {
          body: val.content
        })
        console.log(myNotification)
        setTimeout(() => {
          window.location.reload()
        }, 500)
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
