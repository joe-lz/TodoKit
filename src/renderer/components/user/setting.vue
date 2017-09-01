<template lang="jade" src='./setting.jade'>

</template>

<script>
import PmHeader from '@/components/header'
import ImgUpload from '../_upload/imgupload'
export default {
  name: 'UserSetting',
  components: {
    PmHeader, ImgUpload
  },
  data () {
    return {
      modal_create_loading: false,
      formData: {
        position: '',
        name: '',
        avatar: '',
        role: '开发者'
      }
    }
  },
  created () {
    // this.formData = this.$api.GetAuth().userInfo
    // if (!this.formData.role) {
    //   this.formData.role = '开发者'
    // }
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let url = this.$api.userInfo
      let body = {}
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.formData = res.data.data.curUser
        }
      })
    },
    handleSubmit () {
      this.modal_create_loading = true
      let url = this.$api.userSetting
      let body = {
        data: this.formData
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        if (res.data.code === 0) {
          this.$api.UpdateUserInfo(res.data.data.curUser)
          this.$Message.success('保存成功')
          this.$router.go(-1)
        } else {
          this.$Message.error('保存失败')
        }
      })
    },
    fileUploaded (result) {
      this.formData.avatar = result
    }
  }
}
</script>

<style lang="sass" scoped src='./setting.sass'>
</style>
