import AuthService from '@/services/auth.service'
import TokenService from '@/services/token.service'
import UserService from '@/services/user.service'

export const namespaced = true

export const state = {
  isAuthenticated: false,
  user: {}
}

export const mutations = {
  AUTH: (state, payload) => {
    const { user } = payload

    state.isAuthenticated = true
    state.user = user
  },

  UNAUTH: (state) => {
    state.isAuthenticated = false
    state.user = {}
  },

  UPDATE_BIO: (state, payload) => {
    const { newBio } = payload
    state.user.bio = newBio
  },

  UPDATE_IMAGE_URL: (state, payload) => {
    const { newImageURL } = payload
    state.user.imageURL = newImageURL
  }
}

export const actions = {
  async register ({ commit }, payload) {
    const { data } = await AuthService.register(payload)
    const { user, token } = data

    // add token to api client
    TokenService.set(token)

    // init session and add token/user
    const session = this._vm.$session
    session.start()
    session.set('token', token)
    session.set('user', user)

    // update local state
    commit('AUTH', { user })
  },

  async login ({ commit }, payload) {
    const { data } = await AuthService.login(payload)
    const { user, token } = data

    // add token to api client
    TokenService.set(token)

    // init session and add token/user
    const session = this._vm.$session
    session.start()
    session.set('token', token)
    session.set('user', user)

    // update local state
    commit('AUTH', { user })
  },

  logout ({ commit }) {
    const session = this._vm.$session
    session.destroy()

    // remove token from api client
    TokenService.delete()

    // remove all from local state
    commit('UNAUTH')
  },

  validate ({ commit }) {
    const session = this._vm.$session
    const user = session.get('user')
    const token = session.get('token')

    if (user && token) {
      commit('AUTH', { user })
    } else {
      commit('UNAUTH')
    }
  },

  updateBio ({ commit, getters }, payload) {
    const session = this._vm.$session
    const { newBio } = payload

    // update in database
    UserService.updateBio(getters.username, newBio)

    // update in local storage
    commit('UPDATE_BIO', { newBio })

    // update in session
    session.set('user', getters.getUser)
  },

  updateImageURL ({ commit, getters }, payload) {
    const session = this._vm.$session
    const { newImageURL } = payload

    // update in databse
    UserService.updateImageURL(getters.username, newImageURL)

    // update in local storage
    commit('UPDATE_IMAGE_URL', { newImageURL })

    // update in sesssion
    session.set('user', getters.getUser)
  }
}

export const getters = {
  getAuthStatus: (state) => state.isAuthenticated,
  getUser: (state) => state.user,
  getUsername: (state) => state.user.username
}
