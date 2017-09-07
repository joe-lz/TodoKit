<template lang="jade" src='./imgupload.jade'>

</template>

<script>
import Qiniu from './qiniu.js'
import plupload from 'plupload'
import uuidv4 from 'uuid/v4'

export default {
  name: 'ImgUpload',
  props: ['folderName', 'img', 'picroot', 'imageName'],
  data () {
    return {
      qiniutoken: '',
      isLoading: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.getToken()
    })
    console.log(this.curValue)
  },
  computed: {
    curValue: {
      get () {
        return this.img
      },
      set (val) {
        this.img = val
      }
    }
  },
  methods: {
    getToken () {
      let url = this.$api.qiniutoken
      let body = {}
      this.$http.post(url, body).then((res) => {
        this.qiniutoken = res.data.data.uploadToken
      })
    },
    // 初始化uploader
    initUpload (token) {
      let _this = this
      let uploader = Qiniu.uploader({
        filters: {
          max_file_size: '5mb',
          mime_types: [ // 只允许上传图片
            { title: 'Image files', extensions: 'jpg,jpeg,png' }
          ],
          prevent_duplicates: true // 不允许选取重复文件
        },
        disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
        runtimes: 'html5,flash,html4', // 上传模式,依次退化
        browse_button: _this.imageName, // 上传选择的点选按钮，**必需**
        uptoken: token, // uptoken 是上传凭证，由其他程序生成
        get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的 uptoken
        // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
        domain: this.$api.link.qiniuUrl, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
        container: `container-${_this.imageName}`, // 上传区域 DOM ID，默认是 browser_button 的父元素，
        max_file_size: '5mb', // 最大文件体积限制
        flash_swf_url: '../../../../node_modules/plupload/js/Moxie.swf',
        max_retries: 3, // 上传失败最大重试次数
        dragdrop: true, // 开启可拖曳上传
        drop_element: `container-${_this.imageName}`, // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', // 分块上传时，每块的体积
        multi_selection: false,
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
        resize: {
          width: 2000,
          height: 1500
        },
        init: {
          'FilesAdded' (up, files) {
            _this.isLoading = true
            plupload.each(files, (file) => {
              // 文件添加进队列后,处理相关的事情
              // file.getNative()
            })
          },
          'BeforeUpload' (up, file) {
            // 每个文件上传前,处理相关的事情
          },
          'UploadProgress' (up, file) {
            // 每个文件上传时,处理相关的事情
          },
          'FileUploaded' (up, file, info) {
            _this.curValue = JSON.parse(info.response).key
            _this.$emit('fileUploaded', _this.curValue)
            // 每个文件上传成功后,处理相关的事情
            // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

            // var domain = up.getOption('domain');
            // var res = parseJSON(info.response);
            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
          },
          'Error' (up, err, errTip) {
            _this.isLoading = false
            if (errTip.match('5mb')) {
              _this.$Message.error('只支持5mb以内的图片')
            } else {
              console.log(err, errTip)
              _this.$Message.error(errTip)
            }
            // 上传出错时,处理相关的事情
          },
          'UploadComplete' () {
            _this.isLoading = false
            // 队列文件处理完毕后,处理相关的事情
          },
          'Key' (up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效
            var key = _this.folderName + uuidv4() + Date.now()
            // do something with key here
            return key
          }
        }
      })
      console.warn(uploader)
    }
  },
  watch: {
    qiniutoken () {
      this.initUpload(this.qiniutoken)
    }
  }
}
</script>

<style lang="sass" scoped src='./imgupload.sass'>
</style>
