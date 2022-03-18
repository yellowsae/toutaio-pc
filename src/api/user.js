/**
 * 封装用户请求的api
 */

import request from '@/utils/request'

/**
 * 用户登录请求
 */

export const Login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // 用户参数
    data
  })
}

/**
 * 获取用户信息
 */

export const getUserInfo = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Bearer 就是持票人的意思，就好比你的学生证上写了学生证三个字
    //   Authorization: `Bearer ${user.token}`  -> 已经在 request.js 中配置请求拦截器
    // }
  })
}

/**
 * 编辑用户资料
 */
export const ChangeUserInfo = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
