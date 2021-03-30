import axios from 'axios'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// const baseURL = process.env.NODE_ENV == 'production' ? 'http://172.22.22.30:3000/' : 'http://localhost:3000/'
const baseURL = process.env.NODE_ENV == 'production' ? 'http://www.congyaqwq.top/api/' : 'http://localhost:3000/api/'

export default function (options = {}) {
  const { method = 'get', url, data, params } = options
  return axios({
    baseURL: baseURL,
    method,
    url,
    data,
    params,
    headers: {}
  })
}