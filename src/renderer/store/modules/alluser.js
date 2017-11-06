import api from '../../_api'
import axios from 'axios'

const state = {
  allUser: []
}

const mutations = {
  GET_ALL_USER (state, result) {
    state.allUser = result
  }
}

const actions = {
  async getAllUser ({ commit }, productId) {
    let url = api.productAllUser
    let body = {
      data: {
        productId: productId
      }
    }
    await axios.post(url, body).then((res) => {
      if (res.data.code === 0) {
        let result = res.data.data.allData
        commit('GET_ALL_USER', result)
      }
    })
  }
}

const getters = {
  allUser: state => {
    return state.allUser
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
