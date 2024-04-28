import axios from 'axios'
import { Config } from '../Config'
import { store } from '../Store'

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 50000,
})

instance.interceptors.request.use(
  config => {
    if (store.getState() !== undefined) {
      let tokenData = store.getState().user?.token
      console.log('user token', tokenData)
      if (tokenData) {
        config.headers['Authorization'] = `Bearer ${tokenData}`
        console.log('showing values of info', config)

        return config
      }
      console.log('showing values of info', config)

      return config
    }
    /** In dev, intercepts request and logs it into console for dev */
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    if (response.status === 401) {
    }
    return response
  },
  error => {
    if (error.response && error.response.data) {
      error.response.data.code = error.response.status
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  },
)

export default instance
