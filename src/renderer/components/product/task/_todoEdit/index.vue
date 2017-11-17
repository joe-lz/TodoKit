<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapGetters} from 'vuex'
import WangEditor from 'wangeditor'

export default {
  name: 'ProductTaskEdit',
  props: ['curPost'],
  data () {
    return {
      editor: '',
      isShowImg: false,
      isComment: false,
      allLog: [],
      formData: {
        productId: this.$route.params.id,
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 1, // 1、指派 2、完成  3、拒绝 4、评论 5、归档
        content: ''
      },
      curPostForm: {}
    }
  },
  computed: {
    ...mapGetters(['allUser', 'curProduct'])
  },
  created () {
    this.$nextTick(() => {
      this.editor = new WangEditor('#editor')
      this.editor.customConfig.onchange = (html) => {
        this.formData.content = html
      }
      this.editor.create()
    })
  },
  sockets: {
    // 新评论
    NewLog (val) {
      // post是当前post
      if (val.curLog.postId === this.curPost._id) {
        this.getAllLog()
      }
    }
  },
  methods: {
    doNothing (e) {
      // console.error(e)
    },
    restFromData () {
      this.isComment = false
      this.editor.txt.html('')
      this.formData = {
        productId: this.$route.params.id,
        postId: this.curPost._id,
        from: '',
        to: this.curPost.createrId,
        action: 1, // 1、指派 2、完成  3、拒绝 4、评论 5、归档
        content: ''
      }
    },
    hideImg () {
      this.isShowImg = true
    },
    handleUpdate () {
      if (this.curPostForm.tag !== this.curPost.tag || this.curPostForm.type !== this.curPost.type) {
        let url = this.$api.postUpdate
        let body = {
          data: this.curPostForm
        }
        this.$http.post(url, body).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('操作成功')
            this.$bus.$emit('TaskOperateSuccess', true)
          }
        })
      }
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
            obj.createdAt = this.$moment(obj.createdAt).format('YYYY-MM-DD H:mm')
            return obj
          }).value()
        }
      })
    },
    showCommentGroup (action) {
      this.isComment = true
      this.formData.action = action
    },
    changeCommentToUser (user) {
      this.formData.to = user._id
    },
    handleSubmit () {
      if (this.formData.action === 4 && !this.formData.content) {
        this.$Message.error('请输入评论')
        return
      }
      if (!this.formData.to) {
        this.$Message.error('请指定指派人')
        return
      }
      let url = this.$api.logCreate
      let body = {
        data: this.formData
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.getAllLog()
          this.restFromData()
          this.$Message.success('操作成功')
          this.$bus.$emit('TaskOperateSuccess', true)
        }
      })
    }
  },
  watch: {
    'curPost' (oldVal, newVal) {
      if (!oldVal._id && !newVal._id) {
        return
      }
      this.isComment = false
      this.restFromData()
      this.getAllLog()
      // curPostForm
      this.curPostForm = {...this.curPost}
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>

<style lang='sass'>
@import "../../../mixin/mixin.sass"
.todoEdit-wrapper
  .comment-group
    .ivu-input-wrapper
    .w-e-text
  .con.con2
    .ivu-select
      position: relative
      display: inline-block
      width: initial
      .ivu-select-selection
        border: none
        background: $bg-color
        color: $yellow
      .ivu-select-arrow
        color: $yellow
      .ivu-select-dropdown
        position: absolute !important
        min-width: 100px
        left: initial !important
        right: 0 !important
        top: 25px !important
    // .ivu-select-single .ivu-select-selection .ivu-select-selected-value
    //   padding-left: 0
</style>
