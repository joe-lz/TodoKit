<template lang="jade" src='./index.jade'>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleValidate: {
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      formData: {
        mail: '',
        passwd: ''
      }
    }
  },
  methods: {
    handleSign () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.signin()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    signin () {
      let url = this.$api.signin
      let body = {
        email: this.formData.mail,
        password: this.formData.passwd
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('登录成功!')
          this.$api.SetAuth(res.data.data)
          this.$router.push({name: 'Index'})
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
