import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'applications/list',
    method: 'get',
    params: { ...params },
  })
}

export function detail(id) {
  return request({
    url: `applications/detail/${id}`,
    method: 'get',
  })
}
