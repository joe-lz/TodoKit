<template lang="pug" src='./index.pug'>

</template>

<script>
import {mapGetters} from 'vuex'
import WangEditor from 'wangeditor'
import ImgUpload from '../../../_upload/imgupload'

export default {
  name: 'ProductTaskCreateOperation',
  computed: {
    ...mapGetters(['allUser', 'curProduct'])
  },
  components: {
    ImgUpload
  },
  data () {
    return {
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        to: [
          { required: true, message: '必须指定指派人', trigger: 'blur' }
        ]
      },
      editor: '',
      isAddImg: false,
      modal_create_loading: false,
      formData: {
        productId: this.$route.params.id,
        title: '',
        content: '',
        type: 2,
        isImportant: 'false',
        isUrgent: 'false',
        createrId: '',
        to: '',
        noteImg: '',
        version: '',
        tag: ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.editor = new WangEditor('#editor')
      this.editor.customConfig.onchange = (html) => {
        this.formData.content = html
      }
      this.editor.create()
    })
    // 设置默认值
    setTimeout(() => {
      if (this.curProduct && this.curProduct.versions && this.curProduct.versions.length > 0) {
        this.formData.tag = this.curProduct.tags[0]
        this.formData.version = this.curProduct.versions[this.curProduct.versions.length - 1]
        this.formData.to = this.allUser[0].userId._id
      }
    }, 1000)
  },
  methods: {
    reset () {
      this.isAddImg = false
      this.formData = {
        productId: this.$route.params.id,
        title: '',
        content: '',
        type: 2,
        isImportant: 'false',
        isUrgent: 'false',
        createrId: '',
        to: this.formData.to,
        noteImg: '',
        version: this.formData.version,
        tag: this.formData.tag
      }
    },
    handleSubmit () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.modal_create_loading = true
          let url = this.$api.postCreate
          let body = {
            data: this.formData
          }
          this.$http.post(url, body).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success('创建成功')
              this.reset()
              this.modal_create_loading = false
              this.editor.txt.html(``)
            }
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    fileUploaded (result) {
      this.formData.noteImg = result
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>

<style lang='sass'>
@import "../../../mixin/mixin.sass"
.create-task-wrapper
  input
    border: solid 1px #F1F4FB
    &:hover, &:active
      border: 1px solid #57a3f3
  .ivu-radio-group
    color: $gray
    .ivu-radio-wrapper-checked
      color: $f-color
  .ivu-radio-group-button
    .ivu-radio-wrapper
      border: solid 1px #F1F4FB
      border-left: 0
      color: $gray
      &:first-child
        border: solid 1px #F1F4FB
        border-left: solid 1px #F1F4FB
      &.ivu-radio-wrapper-checked
        border: 1px solid #2d8cf0
        border-left: 0
        color: #2d8cf0
        &:first-child
          border: 1px solid #2d8cf0
          color: #2d8cf0
  .ivu-select
    .ivu-select-selection
      border: solid 1px #F1F4FB
  .inline-block
    .ivu-select
      width: 80px
      .ivu-select-selection
        border: none
</style>
