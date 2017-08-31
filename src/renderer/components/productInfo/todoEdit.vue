<template lang="jade" src='./todoEdit.jade'>

</template>

<script>
export default {
  name: 'TodoEdit',
  props: ['curPost', 'page'],
  data () {
    return {
      isShowImg: false,
      allUser: [],
      allLog: [],
      modal_create_loading: false,
      formData: {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 4,
        content: ''
      },
      isPoint: false,
      pointFormData: {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 1,
        content: ''
      },
      isFinish: false,
      finishFormData: {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 2,
        content: ''
      }
    }
  },
  created () {
    this.getAllUser()
  },
  methods: {
    busEmit () {
      this.$bus.emit(this.$route.name, this.page)
    },
    hideImg () {
      this.isShowImg = true
    },
    doNothing () {
    },
    restFromData () {
      this.formData = {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 4,
        content: ''
      }
      this.pointFormData = {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 1,
        content: ''
      }
      this.finishFormData = {
        productId: '',
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 2,
        content: ''
      }
    },
    initFunc () {
      this.getAllLog()
      this.restFromData()
    },
    getAllUser () {
      let url = this.$api.productAllUser
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allUser = res.data.data.allData
        }
      })
    },
    getAllLog () {
      let url = this.$api.logAll
      let body = {
        data: {
          postId: this.curPost._id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          let allLog = res.data.data.allData
          this.allLog = this.$_.chain(allLog).map((obj) => {
            obj.createdAt = this.$moment(obj.createdAt).format('YYYY-MM-DD h:mm')
            return obj
          }).value()
        }
      })
    },
    createLog () {
      if (!this.formData.content) {
        this.$Message.error('请输入评论')
        return
      }
      if (!this.formData.to) {
        this.$Message.error('请指定指派人')
        return
      }
      this.formData.postId = this.curPost._id
      this.formData.productId = this.$route.params.id
      let url = this.$api.logCreate
      let body = {
        data: this.formData
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.getAllLog()
          this.restFromData()
          this.$Message.success('评论成功')
        }
      })
    },
    pointTo () {
      if (!this.pointFormData.to) {
        this.$Message.error('请指定指派人')
        return
      }
      this.modal_create_loading = true
      this.pointFormData.postId = this.curPost._id
      this.pointFormData.productId = this.$route.params.id
      let url = this.$api.logCreate
      let body = {
        data: this.pointFormData
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        this.isPoint = false
        if (res.data.code === 0) {
          // this.getAllLog()
          this.restFromData()
          this.$Message.success('指派成功')
          this.busEmit()
        }
      })
    },
    finishTo () {
      if (!this.finishFormData.to) {
        this.$Message.error('请指定指派人')
        return
      }
      this.modal_create_loading = true
      this.finishFormData.postId = this.curPost._id
      this.finishFormData.productId = this.$route.params.id
      let url = this.$api.logCreate
      let body = {
        data: this.finishFormData
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        this.isFinish = false
        if (res.data.code === 0) {
          // this.getAllLog()
          this.restFromData()
          this.$Message.success('完成')
          this.busEmit()
        }
      })
    },
    handleClose (post) {
      if (confirm(`确认将该任务归档吗？`)) {
        let url = this.$api.logCreate
        let body = {
          data: {
            productId: this.$route.params.id,
            postId: post._id,
            from: '',
            to: '',
            action: 5,
            content: '归档'
          }
        }
        this.$http.post(url, body).then((res) => {
          this.modal_create_loading = false
          this.isFinish = false
          if (res.data.code === 0) {
            this.getAllLog()
            this.restFromData()
            this.$Message.success('完成')
            this.busEmit()
          }
        })
      }
    }
  },
  watch: {
    'curPost' (oldVal, newVal) {
      if (!oldVal._id && !newVal._id) {
        return
      }
      this.initFunc()
    }
  }
}
</script>

<style lang="sass" scoped src='./todoEdit.sass'>
</style>
