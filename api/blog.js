import request from '@/utils/request'
import { get, set } from '@/utils/localData'

let user_id = get('cong_blog_visitor_id')
if (!user_id) {
  user_id = `visitor_${~~(Math.random() * 100000)}`
  set('cong_blog_visitor_id', user_id, 1440)
}

export function list(params) {
  return request({
    url: 'blogs/frontlist',
    params: { ...params, user_id },
  })
}

export function detail(id) {
  return request({
    url: `blogs/detail/${id}`,
    params: { user_id }
  })
}

export function thumb(data) {
  return request({
    url: `thumbs/${data.is_thumb ? 'cancel' : 'add'}`,
    method: 'put',
    data: {
      ...data,
      user_id
    }
  })
}
