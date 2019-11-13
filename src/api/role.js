import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/v1/role/store',
    method: 'post',
    data
  })
}

export function index(id) {
  return request({
    url: '/v1/role/index',
    method: 'get',
    params: { id }
  })
}

export function edit(data) {
  return request({
    url: '/v1/role/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/v1/role/delete',
    method: 'delete',
    data
  })
}

