import ApiService from '@/services/api.service'

const UserService = {
  delete: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.delete(`/users/${username}/delete`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },

  get: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/users/${username}`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getFavorites: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/users/${username}/favorites`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getFavoritedPostIDs: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/users/${username}/favorites/ids`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getImageURL: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/users/${username}/image`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getPosts: async (username) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/users/${username}/posts`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },

  updateBio: async (username, newBio) => {
    try {
      const { data, request: { status } } = await ApiService.client.patch(`/users/${username}/bio`, { newBio })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  updateImageURL: async (username, newImageURL) => {
    try {
      const { data, request: { status } } = await ApiService.client.patch(`/users/${username}/image`, { newImageURL })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  }
}

export default UserService
