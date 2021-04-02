import request from '@/utils/request'


export function list(params) {
  return request({
    url: 'blogs/frontlist',
    params: { ...params },
  })
}

export function detail(id) {
  return request({
    url: `blogs/detail/${id}`,
  })
}

export function thumb(data) {
  return request({
    url: `thumbs/${data.is_thumb ? 'cancel' : 'add'}`,
    method: 'put',
    data: {
      ...data,
    }
  })
}
