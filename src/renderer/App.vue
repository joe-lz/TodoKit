<template lang='pug'>
#app
  router-view
  //- Loading
  UpdateCom(v-if='showUpdate', :versionData='versionData')
</template>

<script>
import Loading from './components/loading'
import Package from '../../package.json'
import UpdateCom from './components/update'
export default {
  components: {
    Loading, UpdateCom
  },
  name: 'todokit-electron',
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
    setTimeout(() => {
      this.checkUpdate()
    }, 1000 * 60 * 10)
  },
  methods: {
    checkUpdate () {
      let url = 'https://api.github.com/repos/jeodiong/ProductManager/releases/latest'
      this.$http.get(url).then((res) => {
        this.versionData.githubResult = res.data
        let newVersion = this.versionData.githubResult.tag_name
        if (this.versionData.curVersion !== newVersion) {
          // 监测到新版本，前往下载，旧版本将无法使用
          this.showUpdate = true
        }
      })
    }
  },
  sockets: {
    connect () {
      console.error('socket connect')
    },
    // 新评论
    NewLog (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新评论', {
          body: val.content
        })
        console.log(myNotification)
      }
    },
    // 新任务
    NewPost (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新任务', {
          body: val.content
        })
        console.log(myNotification)
      }
    },
    // 新产品
    NewProduct (val) {
      if (this.curUserId === val.to) {
        let myNotification = new Notification('新消息', {
          body: val.content
        })
        console.error(myNotification)
        if (this.$route.name === 'Index') {
          if (confirm('你被加入新产品，刷新查看？')) {
            window.location.reload()
          }
        }
      }
    },
    NewAdvice (val) {
      if (this.$route.params.id === val.to) {
        let myNotification = new Notification('意见收集', {
          body: val.content
        })
        console.log(myNotification)
      }
    }
  }
}
</script>

<style lang='sass' src='./components/mixin/common.sass'></style>
