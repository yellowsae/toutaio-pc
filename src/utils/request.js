/**
 * 基于 axios 封装请求模块
 */

import axios from 'axios'

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 基础路径
})

// 请求拦截器
// 根据是否具有用户 touken 来获取用户信息
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息，则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
      // 然后我们就可以在允许请求出去之前定制统一业务功能处理
      // 例如：统一的设置 token
      // 当这里 return config 之后请求在会真正的发出去
    }
    return config
  },
  function (error) {
    // 请求失败, 会经过这里
    return Promise.reject(error)
  }
)

// 相应拦截器

// 到处请求方法
export default request
