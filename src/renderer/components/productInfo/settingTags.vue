<template lang="jade" src='./settingTags.jade'>
</template>

<script>
export default {
  name: 'ProductSettingTags',
  data () {
    return {
      modal_create_loading: false,
      curProduct: {
      },
      tag: ''
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
      if (!this.tag) {
        this.$Message.error('标签名必填')
        return
      }
      this.modal_create_loading = true
      let url = this.$api.productSettingAddTag
      let body = {
        data: {
          _id: this.curProduct._id,
          tag: this.tag
        }
      }
      this.$http.post(url, body).then((res) => {
        this.modal_create_loading = false
        if (res.data.code === 0) {
          this.getData()
          this.$Message.success('保存成功')
          this.tag = ''
        } else {
          this.$Message.error('保存失败')
        }
      })
    },
    handleDel (tag) {
      if (this.curProduct.tags.length < 2) {
        alert('最少包含一个标签')
        return
      }
      if (confirm(`确定将【${tag}】标签删除吗？`)) {
        this.modal_create_loading = true
        let url = this.$api.productSettingDelTag
        let body = {
          data: {
            _id: this.curProduct._id,
            tag: tag
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

<style lang="sass" scoped src='./settingTags.sass'>
</style>
