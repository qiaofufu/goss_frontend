import { GetCookie } from '@/utils/cookie.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'http://127.0.0.1 :8080/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})


// request interceptor
instance.interceptors.request.use(
  config => {
    const token = GetCookie('websession')
    if (token === null) {
      return config
    }
    config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  })

// response interceptor
instance.interceptors.response.use(
  response => {
    if (response.data.status === 1) {
      ElMessage.warning(response.data.msg)
      return Promise.reject(response.data)
    }
    return response.data

  },
  error => {
    if (error.response.status === 401) {
      ElMessage.warning('请先登录')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  })

export default instance