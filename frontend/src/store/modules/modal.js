export const namespaced = true

export const state = {
  isPostModalActive: false,
  isPostUploadModalActive: false,
  isProfileUploadModalActive: false,
  post: {},
  uploadProgress: 0
}

export const mutations = {
  SET_POST_MODAL: (state, payload) => {
    const { post } = payload

    state.isPostModalActive = true
    state.isPostUploadModalActive = false
    state.isProfileUploadModalActive = false
    state.post = post
  },
  UNSET_POST_MODAL: (state) => {
    state.isPostModalActive = false
  },

  SET_POST_UPLOAD_MODAL: (state) => {
    state.isPostModalActive = false
    state.isPostUploadModalActive = true
    state.isProfileUploadModalActive = false
  },
  UNSET_POST_UPLOAD_MODAL: (state) => {
    state.isPostUploadModalActive = false
  },

  SET_PROFILE_UPLOAD_MODAL: (state) => {
    state.isPostModalActive = false
    state.isPostUploadModalActive = false
    state.isProfileUploadModalActive = true
  },
  UNSET_PROFILE_UPLOAD_MODAL: (state) => {
    state.isProfileUploadModalActive = false
  },

  SET_UPLOAD_PROGRESS: (state, payload) => {
    const { progress } = payload
    state.uploadProgress = progress
  }
}

export const actions = {
  showPostModal ({ commit }, payload) {
    commit('SET_POST_MODAL', payload)
  },
  hidePostModal ({ commit }) {
    commit('UNSET_POST_MODAL')
  },

  showPostUploadModal ({ commit }) {
    commit('SET_POST_UPLOAD_MODAL')
  },
  hidePostUploadModal ({ commit }) {
    commit('UNSET_POST_UPLOAD_MODAL')
  },

  showProfileUploadModal ({ commit }) {
    commit('SET_PROFILE_UPLOAD_MODAL')
  },
  hideProfileUploadModal ({ commit }) {
    commit('UNSET_PROFILE_UPLOAD_MODAL')
  },

  updateProgress ({ commit }, payload) {
    commit('SET_UPLOAD_PROGRESS', payload)
  }
}

export const getters = {
  getPostModalStatus: (state) => state.isPostModalActive,
  getPostUploadModalStatus: (state) => state.isPostUploadModalActive,
  getProfileUploadModalStatus: (state) => state.isProfileUploadModalActive,
  getPost: (state) => state.post,
  getUploadProgress: (state) => state.uploadProgress
}
