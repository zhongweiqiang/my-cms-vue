import request from '@/utils/request'

export function store(data) {
    return request({
        url: '/v1/role_menu/store',
        method: 'post',
        data
    })
}

export function index(data) {
    return request({
        url: '/v1/role_menu/index',
        method: 'get',
        params: data
    })
}