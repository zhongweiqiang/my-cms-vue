import { route } from '@/utils/common'

const roleRouter = {

    path: '/role',
    name: 'Role',
    component: () => import('@/views/layout'),
    redirect: "/role/list", // 后台登import('@/views/users/UserLst')陆默认页面
    children: [
        route('/role/list', '/system/roles/RoleList', 'RoleList', '角色列表'),
        route('/role/add', '/system/roles/RoleAdd','RoleAdd', '角色添加'),
        route('/role/edit', '/system/roles/RoleEdit', 'RoleEdit', '角色修改')

        // {
        //   name: 'UserLst',
        //   path: '/member/list',
        //   component: () => import('@/views/users/UserLst')
        // }

    ]
}
export default roleRouter