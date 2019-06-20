import ApiService from '@/services/api.service'

const AuthService = {
  login: async ({ username, password }) => {
    try {
      const { data, request: { status } } = await ApiService.client.post('/login', { username, password })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  },
  register: async ({ name, username, password }) => {
    try {
      const { data, request: { status } } = await ApiService.client.post('/register', { name, username, password })
      return { data, status }
    } catch ({ response }) {
      const { data, request: { status } } = response
      return { data, status }
    }
  }
}

export default AuthService
