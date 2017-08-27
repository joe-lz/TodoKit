<template lang="jade" src='./index.jade'>

</template>

<script>
import Loading from '../loading'
import ProductItem from './productItem'
import PmHeader from '@/components/header'
import ImgUpload from '../_upload/imgupload'
export default {
  name: 'Index',
  components: {
    Loading, PmHeader, ProductItem, ImgUpload
  },
  data () {
    return {
      isLoading: false,
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
      },
      isModal2: false,
      formData2: {
        productId: '',
        mobile: this.$api.GetAuth().userInfo.mobile
      },
      ruleValidate2: {
        productId: [
          { required: true, message: '产品ID不能为空', trigger: 'blur' }
        ]
      },
      modal_create_loading2: false
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    async getAllData () {
      this.isLoading = true
      let url = this.$api.productMy
      let body = {
      }
      await this.$http.post(url, body).then((res) => {
        this.allData = res.data.data.allData
      })
      this.isLoading = false
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
    },
    handleAdd () {
      this.$refs.formData2.validate((valid) => {
        if (valid) {
          this.modal_create_loading2 = true
          this.addProduct()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    addProduct () {
      let url = this.$api.productAddUser
      let body = {
        data: this.formData2
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('添加成功')
          this.isModal2 = false
          this.getAllData()
        } else {
          this.$Message.error(res.data.msg)
        }
        this.modal_create_loading2 = false
      })
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
