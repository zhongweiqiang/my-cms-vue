import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/v1/role_perm/index',
        method: 'get',
        params: data
    })
}

export function store(data){
    return request({
        url: '/v1/role_perm/store',
        method: 'post',
        data
    })
}