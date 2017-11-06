import api from '../../_api'
import axios from 'axios'

const state = {
  curProduct: {},
  levelArr: {},
  notification_count: '',
  typeArr: {}
}

const mutations = {
  GET_STATE_INFO (state, result) {
    state.curProduct = result.data.curProduct
    state.levelArr = result.data.levelArr
    state.notification_count = result.data.notification_count
    state.typeArr = result.data.typeArr
  }
}

const actions = {
  async getStateInfo ({ commit }, productId) {
    let url = api.getProductStateInfo
    let body = {
      access_token: api.GetAuth().access_token,
      data: {
        productId
      }
    }
    await axios.post(url, body).then((res) => {
      let result = res.data
      if (result.code === 0) {
        commit('GET_STATE_INFO', result)
      }
    })
  }
}

const getters = {
  curProduct: state => {
    return state.curProduct
  },
  levelArr: state => {
    return state.levelArr
  },
  notification_count: state => {
    return state.notification_count
  },
  typeArr: state => {
    return state.typeArr
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
