import axios from 'axios'

const instance = axios.create()

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const baseURL = process.env.NODE_ENV == 'production' ? 'https://www.congyaqwq.top/api/' : 'http://localhost:3000/api/'

export default function (options = {}) {
  return instance({
    baseURL: baseURL,
    ...options
  }).then(res => {
    return res.data
  }).catch(e => {
    return Promise.reject(e)
  })
}