import ApiService from '@/services/api.service'

/* post    = { caption, imageURL, author } */
const Postservice = {
  create: async ({ caption, imageURL, author }) => {
    try {
      const { data, request: { status } } = await ApiService.client.post('/posts', { caption, imageURL, author })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  createComment: async (postID, { body, author }) => {
    try {
      const { data, request: { status } } = await ApiService.client.post(`/posts/${postID}/comments`, { body, author })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  createFavorite: async (postID, username) => {
    try {
      const { data, request: { status } } = await ApiService.client.post(`/posts/${postID}/favorites`, { username })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },

  delete: async (postID) => {
    try {
      const { data, request: { status } } = await ApiService.client.delete(`/posts/${postID}/delete`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  deleteComment: async (postID, commentID) => {
    try {
      const { data, request: { status } } = await ApiService.client.delete(`/posts/${postID}/comments/${commentID}/delete`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  deleteFavorite: async (postID, username) => {
    try {
      const { data, request: { status } } = await ApiService.client.delete(`/posts/${postID}/favorites/delete`, { data: { username } })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },

  get: async (postID) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/posts/${postID}`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getAll: async () => {
    try {
      const { data, request: { status } } = await ApiService.client.get('/posts')
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getComments: async (postID) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/posts/${postID}/comments`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  getFavoriteCount: async (postID) => {
    try {
      const { data, request: { status } } = await ApiService.client.get(`/posts/${postID}/favorites`)
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },

  updateCaption: async (postID, newCaption) => {
    try {
      const { data, request: { status } } = await ApiService.client.patch(`/posts/${postID}/caption`, { newCaption })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  updateComment: async (postID, commentID, newBody) => {
    try {
      const { data, request: { status } } = await ApiService.client.patch(`/posts/${postID}/comments/${commentID}`, { newBody })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  }
}

export default Postservice
