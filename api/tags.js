import request from '@/utils/request'

export function list(params) {

  return request({
    url: 'tags/list',
    params: { ...params },
  })
}
