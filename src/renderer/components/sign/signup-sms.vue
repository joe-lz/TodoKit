<template lang="jade" src='./signup-sms.jade'>
</template>

<script>
export default {
  name: 'SignUpSMS',
  data () {
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!this.$api.isMobile(this.formData.mobile)) {
          callback(new Error('手机号码格式不正确'))
        }
        callback()
      }
    }
    return {
      time: 60,
      isTiming: false,
      ruleValidate: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      formData: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    sendSMS () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          let url = this.$api.signinSendSms
          let body = {
            data: {
              mobile: this.formData.mobile
            }
          }
          this.$http.post(url, body).then((res) => {
            if (res.data.code === 0) {
              this.isTiming = true
              setInterval(() => {
                if (this.time > 0 && this.isTiming) {
                  this.time = this.time - 1
                } else {
                  this.isTiming = false
                  this.time = 60
                }
              }, 1000)
              this.$Message.success('验证码已发送')
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    signinSms () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (!this.formData.code) {
            this.$Message.error('验证码必填')
            return
          }
          let url = this.$api.signinSms
          let body = {
            data: {
              mobile: this.formData.mobile,
              code: this.formData.code
            }
          }
          this.$http.post(url, body).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success('登录成功!')
              this.$api.SetAuth(res.data.data)
              this.$router.push({name: 'Index'})
              // if (res.data.data.userInfo.name) {
              // } else {
              //   this.$router.push({name: 'UserSetting'})
              // }
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>

<style lang='sass'>
.code-wrapper
  .ivu-form-item-content
    display: flex
    .ivu-input-wrapper
      flex: 1
    .btn-code
      margin-left: 15px
      width: 120px
</style>
