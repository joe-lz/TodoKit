<template lang="jade" src='./signup.jade'>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formData.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.passwd) {
        callback(new Error('两次输入密码不一致!'))
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
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      formData: {
        mail: '',
        passwd: '',
        passwdCheck: ''
      }
    }
  },
  methods: {
    handleSign () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.signup()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    signup () {
      let url = this.$api.signup
      let body = {
        email: this.formData.mail,
        password: this.formData.passwd
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('注册成功!')
          this.$router.push({name: 'SignIn'})
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>
