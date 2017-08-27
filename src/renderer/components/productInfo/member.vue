<template lang="jade" src='./member.jade'>

</template>

<script>
import NoData from '@/components/_include/nodata'
export default {
  name: 'ProductMember',
  components: {
    NoData
  },
  computed: {
    limitMemeberNo () {
      return this.allData[0] ? this.allData[0].productId.memberNo : 10
    },
    restMemberNo () {
      return this.allData[0] ? this.allData[0].productId.memberNo - this.allData.length : 10
    }
  },
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
      modal_create_loading: false,
      isModal: false,
      allData: [],
      formData: {},
      ruleValidate: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      let url = this.$api.productAllUser
      let body = {
        data: {
          productId: this.$route.params.id
        }
      }
      this.$http.post(url, body).then((res) => {
        if (res.data.code === 0) {
          this.allData = res.data.data.allData
        }
      })
    },
    handleAdd () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.addFunc()
        }
      })
    },
    addFunc () {
      this.modal_create_loading = true
      let url = this.$api.productAddUser
      let body = {
        data: {
          productId: this.$route.params.id,
          mobile: this.formData.mobile
        }
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        if (res.data.code === 0) {
          this.getAllData()
          this.isModal = false
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    deleteUser (item) {
      if (this.allData && this.allData.length > 1) {
        if (confirm(`确定将【${item.name || this.$api.placeholder.noname}】移除当前产品吗？`)) {
          let url = this.$api.productDelUser
          let body = {
            data: {
              userId: item._id,
              productId: this.$route.params.id
            }
          }
          this.$http.post(url, body).then((res) => {
            if (res.data.code === 0) {
              this.getAllData()
            }
          })
        }
      } else {
        alert('一个产品至少包含一位成员')
      }
    }
  }
}
</script>

<style lang="sass" scoped src='./member.sass'>
</style>
