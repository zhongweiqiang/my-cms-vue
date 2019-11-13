import request from '@/utils/request'

export function add(data){
    return request({
        url: '/v1/perm/store',
        method: 'post',
        data
    })
}

export function index(data){
    return request({
        url: '/v1/perm/index',
        method: 'get',
        params: data
    })
}

export function del(data){
    return request({
        url: '/v1/perm/delete',
        method: 'delete',
        data
    })
}

export function select(data) {
    return request({
        url: '/v1/perm/select',
        method: 'get',
        params: data

    })
}

export function detail(data){
    return request({
        url: '/v1/perm/detail',
        method: 'get',
        params: data
    })
}

export function edit(data){
    return request({
        url: '/v1/perm/update',
        method: 'post',
        data
    })
}

export function tree(data){
    return request({
        url: '/v1/perm/tree',
        method: 'get',
        params: data
    })
}