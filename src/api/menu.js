import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/v1/menu/store',
    method: 'post',
    data
  })
}

export function index(data) {
  return request({
    url: '/v1/menu/index',
    method: 'get',
    params: data
  })
}

export function select(data) {
  return request({
    url: '/v1/menu/select',
    method: 'get',
    params: data
  })
}

export function del(data) {
  return request({
    url: '/v1/menu/delete',
    method: 'delete',
    data
  })
}

export function edit(data) {
  return request({
    url: '/v1/menu/update',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/v1/menu/detail',
    method: 'get',
    params: data
  })
}

export function tree(data) {
  return request({
    url: '/v1/menu/tree',
    method: 'get',
    params: data
  })
}

export function userMenu(data) {
  return request({
    url: '/v1/menu/user_menu',
    method: 'get',
    params: data
  })
}