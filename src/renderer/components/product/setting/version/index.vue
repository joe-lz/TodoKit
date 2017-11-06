<template lang="pug" src='./index.pug'>

</template>

<script>
export default {
  name: 'ProductSettingVersion',
  data () {
    const validateNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正整数'))
      } else {
        if (!this.$api.isNumber(this.versionMain)) {
          callback(new Error('请输入正整数'))
        }
        callback()
      }
    }
    const validateNumber2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正整数'))
      } else {
        if (!this.$api.isNumber(this.versionSub)) {
          callback(new Error('请输入正整数'))
        }
        callback()
      }
    }
    return {
      modal_create_loading: false,
      curProduct: {
      },
      versionMain: '',
      versionSub: '',
      ruleValidate: {
        versionMain: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        versionSub: [
          { validator: validateNumber2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    version () {
      return `${this.versionMain}.${this.versionSub}`
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
          this.curProduct = res.data.data.curProduct
        } else {
          this.$Message.error('获取失败')
        }
      })
    },
    handleSubmit () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.modal_create_loading = true
          let url = this.$api.productSettingAddVersion
          let body = {
            data: {
              _id: this.curProduct._id,
              version: this.version
            }
          }
          this.$http.post(url, body).then((res) => {
            this.modal_create_loading = false
            if (res.data.code === 0) {
              this.getData()
              this.$Message.success('保存成功')
              this.versionMain = ''
              this.versionSub = ''
            } else {
              this.$Message.error('保存失败')
            }
          })
        }
      })
    },
    handleDel (version) {
      if (this.curProduct.versions.length < 2) {
        alert('最少包含一个版本号')
        return
      }
      if (confirm(`确定将【${version}】版本删除吗？`)) {
        this.modal_create_loading = true
        let url = this.$api.productSettingDelVersion
        let body = {
          data: {
            _id: this.curProduct._id,
            version: version
          }
        }
        this.$http.post(url, body).then((res) => {
          this.modal_create_loading = false
          if (res.data.code === 0) {
            this.getData()
            this.$Message.success('保存成功')
          } else {
            this.$Message.error('保存失败')
          }
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped="" src='./index.sass'>
</style>
