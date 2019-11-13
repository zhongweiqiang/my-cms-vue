import { route } from '@/utils/common'

const permRouter = {
    path: '/perm',
    name: 'Perm',
    component: () => import('@/views/layout'),
    redirect: '/perm/list',
    children: [
        route('/perm/list', '/system/perms/PermList', 'PermList', '权限列表'),
        route('/perm/add', '/system/perms/PermAdd', 'PermAdd', '权限添加'),
    ]
}

export default  permRouter