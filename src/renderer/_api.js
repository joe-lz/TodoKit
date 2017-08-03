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
let SetAuth = function (value) {
  window.localStorage.setItem('fishFrontAuth', JSON.stringify(value))
}
let GetAuth = function () {
  return JSON.parse(window.localStorage.getItem('fishFrontAuth'))
}
let RemoveAuth = function () {
  window.localStorage.removeItem('fishFrontAuth')
}

export default {
  brand: 'pm',
  SetAuth,
  GetAuth,
  RemoveAuth,
  Required,
  isEmail,
  isMobile,
  links: {
    logo: '/bgs/logo.png'
  }
}
