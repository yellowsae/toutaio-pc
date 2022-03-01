/**
 * 文章相关请求模块
 */

import request from '@/utils/request'

/**
 * 获取文章列表
 */

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

/**
 * 获取频道列表
 */
export const getArticleChannel = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 */
export const deleteArticle = id => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}

/**
 * 发布文章
 */
//  draft 是否存为草稿（true 为草稿） 默认为false
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft //  是否存为草稿（true 为草稿）
    },
    // 文章数据
    data
  })
}
