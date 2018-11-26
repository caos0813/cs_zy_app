import axios from 'axios'
import storage from './storage'
import Config from 'react-native-config'
import navigator from './navigator'
import userStore from '../store/userStore'
axios.defaults.timeout = 5000
axios.defaults.maxContentLength = 1048576
axios.defaults.baseURL = Config.BASE_URL
axios.defaults.headers['Accept'] = 'application/json, text/plain, */*'
/* 添加拦截器 */
/*
  判断全局变量是否存在,不存在则从storage取
*/
axios.interceptors.request.use(async function (config) {
  if (!global.token) {
    try {
      const userInfo = await storage.load({
        key: 'userInfo'
      })
      global.token = userInfo.token
    } catch {
      global.token = ''
    }
  }
  if (global.token) {
    config.headers['Authorization'] = `Bearer ${global.token}`
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
  const errorObj = err.response ? err.response.data : { err: '网络请求错误' }
  if (err.response && err.response.status === 401) {
    const { setUserInfo } = userStore
    setUserInfo({})
    navigator.replace('Login')
    /* error({
      statusCode: 401,
      message: '您的登录状态已经过期，请重新登录。'
    }) */
  }
  return Promise.reject(errorObj)
})
export default axios
