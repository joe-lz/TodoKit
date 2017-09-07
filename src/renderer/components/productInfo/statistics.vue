<template lang="jade" src='./statistics.jade'>

</template>

<script>
import NoData from '@/components/_include/nodata'
export default {
  name: 'ProductStatistics',
  components: {
    NoData
  },
  data () {
    return {
      day: '',
      dayValue: '',
      type: 0,
      tagArray: [],
      versionArray: [],
      curProduct: {},
      version: ''
    }
  },
  created () {
    this.changeType(0)
    this.getProductInfo()
  },
  methods: {
    reset () {
      this.tagArray = []
      this.versionArray = []
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
    changeType (type) {
      this.reset()
      this.type = type
      this.getDataTag()
      this.getDataVersion()
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

<style lang="sass" scoped src='./statistics.sass'>
</style>
<style lang="sass">
.statistics-wrapper
  .ivu-select-single .ivu-select-selection
    border: none
  .ivu-select-dropdown
    position: absolute !important
  .ivu-select-selected-value
    text-align: right
</style>
