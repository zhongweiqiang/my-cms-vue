import { route } from '@/utils/common'

const userRouter = {

    path: '/user',
    name: 'User',
    component: () => import('@/views/layout'),
    redirect: "/user/list",
    children: [
        route('/user/list', '/system/users/UserList', 'UserList', '用户列表'),
        route('/user/add', '/system/users/UserAdd','UserAdd', '用户添加'),
        route('/user/edit', '/system/users/UserEdit', 'UserEdit', '用户修改')
        // {
        //   name: 'UserAdd',
        //   path: '/user/add',
        //   component: () => import('@/views/system/users/UserAdd')
        // }

    ]
    // component: () => import('@/views/users/UserLst')
}
export default userRouter