<template lang="pug" src='./index.pug'>

</template>

<script>
export default {
  name: 'ProductTaskStatistic',
  data () {
    return {
      day: '',
      dayValue: '',
      type: 2,
      tagArray: [],
      versionArray: [],
      curProduct: {},
      version: ''
    }
  },
  created () {
    this.changeType(this.type)
    this.getProductInfo()
  },
  methods: {
    reset () {
      this.tagArray = []
      this.versionArray = []
    },
    changeType (type) {
      this.reset()
      this.type = type
      this.getDataTag()
      this.getDataVersion()
    },
    getDataTag () {
      let dataObj = {
        productId: this.$route.params.id
      }
      if (this.type > 0) { dataObj.type = this.type }
      if (this.dayValue) { dataObj.dayValue = this.dayValue }
      if (this.version && this.version > 0) { dataObj.version = this.version }
      let url = this.$api.postStatisticsTag
      let body = {
        data: dataObj
      }
      this.$http.post(url, body).then((res) => {
        this.tagArray = res.data.data.tagArray
      })
    },
    getDataVersion () {
      let url = this.$api.postStatisticsVersion
      let dataObj = {
        productId: this.$route.params.id
      }
      if (this.type > 0) { dataObj.type = this.type }
      if (this.dayValue) { dataObj.dayValue = this.dayValue }
      if (this.version && this.version > 0) { dataObj.version = this.version }
      let body = {
        data: dataObj
      }
      this.$http.post(url, body).then((res) => {
        this.versionArray = res.data.data.versionArray
      })
    },
    changeDay () {
      // 0 全部, 1 24h, 2 7, 3, 30
      this.reset()
      this.getDayValue()
      this.getDataTag()
      this.getDataVersion()
    },
    changeVersion () {
      this.reset()
      this.getDataTag()
      this.getDataVersion()
    },
    getDayValue () {
      console.log(this.day)
      if (Number(this.day) === 1) {
        this.dayValue = (Date.now() / 1000 - 24 * 60 * 60) * 1000
      } else if (Number(this.day) === 2) {
        this.dayValue = (Date.now() / 1000 - 24 * 60 * 60 * 7) * 1000
      } else if (Number(this.day) === 3) {
        this.dayValue = (Date.now() / 1000 - 24 * 60 * 60 * 24) * 1000
      } else {
        this.dayValue = ''
      }
    },
    getProductInfo () {
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
    }
  }
}
</script>

<style lang="sass" scoped src='./index.sass'>
</style>

<style lang='sass'>
@import "../../../mixin/mixin.sass"
.statistic-wrapper
  position: relative
  .navigation-wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 10
    padding-left: 180px
    padding-top: 60px
    width: 100%
    text-align: center
    background-color: white
    .ivu-select
      margin: 0 10px
      display: inline-block
      width: 100px
      .ivu-select-selected-value
        color: $f-color
      .ivu-select-selection
        border: none
        color: $gray-sub-sub
        font-weight: $fw-lg
        &:hover
          .ivu-select-placeholder
            color: $f-color
        .ivu-icon
          &:before
            color: $gray-sub-sub
</style>
