<template lang="jade" src='./create.jade'>

</template>

<script>
import WangEditor from 'wangeditor'
import ImgUpload from '../_upload/imgupload'
export default {
  name: 'ProductCreate',
  components: {
    ImgUpload
  },
  data () {
    return {
      stateInfo: {},
      editor: '',
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
      },
      isContent: false,
      isAddImg: false,
      allUser: [],
      modal_create_loading: false,
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        to: [
          { required: true, message: '必须指定指派人', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.formData.productId = this.$route.params.id
    this.getAllUser()
    this.$nextTick(() => {
      this.editor = new WangEditor('#editor')
      this.editor.customConfig.onchange = (html) => {
        this.formData.content = html
      }
      this.editor.create()
      this.editor.txt.html(`
        <p>1、问题</p>
        <p>2、预期</p>
        `)
    })

    this.$bus.off('StateInfo')
    this.$bus.once('StateInfo', content => {
      this.stateInfo = content
      if (this.stateInfo.curProduct.versions && this.stateInfo.curProduct.versions[0]) {
        this.formData.version = this.stateInfo.curProduct.versions[this.stateInfo.curProduct.versions.length - 1]
        this.formData.tag = this.stateInfo.curProduct.tags[0]
      }
    })
  },
  methods: {
    reset () {
      this.isContent = false
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
              this.editor.txt.html(`
                <p>1、平台</p>
                <p>2、版本</p>
                <p>3、问题</p>
                `)
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

<style lang="sass" scoped src='./create.sass'>
</style>
<style lang="sass">
.task-create-wrapper
  .form-group-inline
    .ivu-select-selection
      border: none

</style>
