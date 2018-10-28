import axios from 'axios'
import config from '../config'
import storage from './storage'
axios.defaults.timeout = 5000
axios.defaults.maxContentLength = 1048576
axios.defaults.baseURL = config.baseUrl
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/* 添加拦截器 */
/*
  判断全局变量是否存在,不存在则从storage取
*/
let token
axios.interceptors.request.use(async function (config) {
  if (!token) {
    try {
      const userInfo = await storage.load({
        key: 'userInfo'
      })
      token = userInfo.token
    } catch {
      token = ''
    }
  }
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
/* 添加响应拦截器 */
// axios.defaults.transformResponse=function (response) {
//   alert(response)
//   if (typeof response === 'string') {
//     return JSON.parse(response)
//   }
//   return response
// })
axios.interceptors.response.use(function (response) {
  return response.data
}, function (err) {
  console.log(err)
  const errorObj = err.response ? err.response : { err: '网络请求错误' }
  if (errorObj && errorObj.status === 401) {
    /* error({
      statusCode: 401,
      message: '您的登录状态已经过期，请重新登录。'
    }) */
  }
  return Promise.reject(errorObj)
})
export default axios
