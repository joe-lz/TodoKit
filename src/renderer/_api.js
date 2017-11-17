import {shell} from 'electron'
let Openlink = function (link) {
  shell.openExternal(link)
}
let Required = function (data) {
  if (data) {
    return true
  } else {
    return false
  }
}
let isEmail = function (email) {
  let EmailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  if (EmailReg.test(email) && email && email.length > 0) {
    return true
  } else {
    return false
  }
}
let isMobile = function (mobile) {
  let MobileReg = /^1[0-9]{10}$/
  if (MobileReg.test(mobile)) {
    return true
  } else {
    return false
  }
}
let isNumber = function (number) {
  let NumberReg = /^[1-9]\d*$/
  if (NumberReg.test(number)) {
    return true
  } else {
    return false
  }
}
let SetAuth = function (value) {
  window.localStorage.setItem('pmAuth', JSON.stringify(value))
}
let GetAuth = function () {
  return JSON.parse(window.localStorage.getItem('pmAuth'))
}
let RemoveAuth = function () {
  window.localStorage.removeItem('pmAuth')
}
let UpdateUserInfo = function (data) {
  let newAuth = {
    access_token: GetAuth().access_token,
    userInfo: data
  }
  SetAuth(newAuth)
}
let SetLocal = function (name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}
let GetLocal = function (name) {
  return JSON.parse(window.localStorage.getItem(name))
}

let root = 'http://127.0.0.1:4100/v2'
let apiRoot = 'http://127.0.0.1:4100'
let qiniuUrl = 'http://oupexjsrd.bkt.clouddn.com/'

// let root = 'https://api.todokit.vip/v2'
// let apiRoot = 'https://api.todokit.vip'
// let qiniuUrl = 'http://oupexjsrd.bkt.clouddn.com/'

export default {
  pageSize: 50,
  apiRoot,
  root,
  brand: 'pm',
  Openlink,
  SetAuth,
  GetAuth,
  SetLocal,
  GetLocal,
  UpdateUserInfo,
  RemoveAuth,
  Required,
  isEmail,
  isMobile,
  isNumber,
  placeholder: {
    noname: '无名氏'
  },
  link: {
    logo: 'static/logo.png',
    imgupload_bg: 'static/imgupload_bg.jpg',
    qiniuUrl: qiniuUrl,
    qiniuImg: '?imageMogr2/auto-orient'
  },
  getProductStateInfo: root + '/user/getProductStateInfo',
  signup: root + '/user/signup',
  signin: root + '/user/signin',
  signinSendSms: root + '/user/signup-send-sms',
  signinSms: root + '/user/signup-sms',
  productMy: root + '/product/my',
  productCreate: root + '/product/create',
  productAddUser: root + '/product/addUser',
  productAllUser: root + '/product/allUser',
  productDelUser: root + '/product/delUser',
  productSetting: root + '/product/setting',
  productSettingAddVersion: root + '/product/addVersions',
  productSettingDelVersion: root + '/product/delVersions',
  productSettingAddTag: root + '/product/addTags',
  productSettingDelTag: root + '/product/delTags',
  productInfo: root + '/product/info',
  productAll: root + '/product/all',
  userSetting: root + '/user/setting',
  userInfo: root + '/user/info',
  postCreate: root + '/post/create',
  postUpdate: root + '/post/update',
  postMy: root + '/post/my',
  postMycreate: root + '/post/mycreate',
  postMyMatrix: root + '/post/myMatrix',
  postAllByLevel: root + '/post/allbylevel',
  postAllByFilter: root + '/post/allbyfilter',
  postStatisticsTag: root + '/post/statisticsTag',
  postStatisticsVersion: root + '/post/statisticsVersion',
  logCreate: root + '/log/create',
  logAll: root + '/log/all',
  logMy: root + '/log/my',
  logMyAll: root + '/log/myall',
  adviceCreate: root + '/advice/create',
  adviceAll: root + '/advice/allbyfilter',
  adviceChangeLevel: root + '/advice/changeLevel',
  adviceDel: root + '/advice/del',
  qiniutoken: root + '/upload/qiniutoken'
}
