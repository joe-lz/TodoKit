<template lang="jade" src='./setting.jade'>

</template>

<script>
import ImgUpload from '../_upload/imgupload'
export default {
  name: 'ProductSetting',
  components: {
    ImgUpload
  },
  data () {
    return {
      modal_create_loading: false,
      formData: {
        name: '',
        logo: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let url = this.$api.productInfo
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.formData = res.data.data.curProduct
        } else {
          this.$Message.error('获取失败')
        }
      })
    },
    handleSubmit () {
      this.modal_create_loading = true
      let url = this.$api.productSetting
      let body = {
        data: this.formData
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        if (res.data.code === 0) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error('保存失败')
        }
      })
    },
    fileUploaded (result) {
      this.formData.logo = result
    }
  }
}
</script>

<style lang="sass" scoped src='./setting.sass'>
</style>
