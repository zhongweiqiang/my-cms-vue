import { route } from '@/utils/common'

const menuRouter = {

    path: '/menu',
    name: 'Menu',
    component: () => import('@/views/layout'),
    redirect: "/menu/list",
    children: [
        route('/menu/list', '/system/menus/MenuList', 'MenuList', '菜单列表'),
        route('/menu/add', '/system/menus/MenuAdd','MenuAdd', '菜单添加'),
        route('/menu/edit', '/system/menus/MenuEdit', 'MenuEdit', '菜单修改')
    ]
}
export default menuRouter