import axios from 'axios'

const ApiService = {
  client: axios.create({
    baseURL: 'https://10.0.0.4:3000',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Token: null
    },
    timeout: 10000 // 10 seconds
  }),

  config: {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  },

  // allows for cancelling requests
  source: axios.CancelToken.source()
}

export default ApiService
