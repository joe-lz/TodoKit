const state = {
  allMyData: {}
}

const mutations = {
  GETMYDATA (state) {
    state.main--
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('GETMYDATA')
  }
}

export default {
  state,
  mutations,
  actions
}
