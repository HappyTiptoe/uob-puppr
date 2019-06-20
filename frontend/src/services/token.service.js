import ApiService from '@/services/api.service'

const TokenService = {
  set: (token) => {
    ApiService.client.defaults.headers.Token = token
  },
  delete: () => {
    ApiService.client.defaults.headers.Token = null
  }
}

export default TokenService
