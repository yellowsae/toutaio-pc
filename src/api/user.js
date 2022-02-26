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
