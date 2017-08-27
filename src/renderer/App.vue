<template lang='jade'>
#app
  transition(name='fade')
    router-view.absolute
  UpdateCom(v-if='showUpdate', :versionData='versionData')
</template>

<script>
import UpdateCom from './components/update'
import Package from '../../package.json'
export default {
  name: 'pm_vue',
  components: {
    UpdateCom
  },
  data () {
    return {
      curUserId: '',
      versionData: {
        curVersion: Package.version,
        githubResult: {}
      },
      showUpdate: false
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
    this.checkUpdate()
  },
  methods: {
    checkUpdate () {
      let url = 'https://api.github.com/repos/jeodiong/ProductManager/releases/latest'
      this.$http.get(url).then((res) => {
        this.versionData.githubResult = res.data
        let newVersion = this.versionData.githubResult.tag_name
        if (this.versionData.curVersion !== newVersion) {
          // 监测到新版本，前往下载，旧版本将无法使用
          // alert('监测到新版本，前往下载，旧版本将无法使用')
          this.showUpdate = true
        }
      })
    }
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
        // this.$Message.success('你被加入新产品，刷新页面查看')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500)
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
