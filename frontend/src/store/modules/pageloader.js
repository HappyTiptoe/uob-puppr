export const namespaced = true

export const state = {
  isLoading: false
}

export const mutations = {
  SET_LOADING_STATUS: (state, payload) => {
    state.isLoading = payload
  }
}

export const actions = {
  setLoadingStatus ({ commit }, payload) {
    commit('SET_LOADING_STATUS', payload)
  }
}

export const getters = {
  getLoadingStatus: (state) => state.isLoading
}
