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
        avatar: ''
      }
    }
  },
  created () {
    this.formData = this.$api.GetAuth().userInfo
  },
  methods: {
    handleSubmit () {
      this.modal_create_loading = true
      let url = this.$api.userSetting
      let body = {
        data: {
          name: this.formData.name,
          position: this.formData.position,
          avatar: this.formData.avatar
        }
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        if (res.data.code === 0) {
          this.$api.UpdateUserInfo(res.data.data.curUser)
          this.$Message.success('保存成功')
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
