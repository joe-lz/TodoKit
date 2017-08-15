<template lang="jade" src='./index.jade'>

</template>

<script>
import ProductItem from './productItem'
import PmHeader from '@/components/header'
import ImgUpload from '../_upload/imgupload'
export default {
  name: 'Index',
  components: {
    PmHeader, ProductItem, ImgUpload
  },
  data () {
    return {
      allData: [],
      isModal: false,
      formData: {
        name: ''
      },
      modal_create_loading: false,
      ruleValidate: {
        name: [
          { required: true, message: '产品名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      let url = this.$api.productMy
      let body = {
      }
      this.$http.post(url, body).then((res) => {
        this.allData = res.data.data.allData
      })
    },
    handleCreate () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.modal_create_loading = true
          this.createProduct()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    createProduct () {
      let url = this.$api.productCreate
      let body = {
        data: this.formData
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('创建成功')
          this.isModal = false
          this.getAllData()
        } else {
          this.$Message.error(res.data.msg)
        }
        this.modal_create_loading = false
      })
    },
    fileUploaded (result) {
      this.formData.logo = result
    }
  },
  watch: {
    'isModal' (oldval, newval) {
      if (this.isModal) {
        this.formData = {
          name: ''
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
