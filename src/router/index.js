import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '@/store'
import { route } from '@/utils/common'

// 导入路由模型
import UserRouter from './modules/user'
import RoleRouter from './modules/role'
import MenuRouter from './modules/menu'
import PermRouter from './modules/perm'

const moduleRouter = [
  UserRouter,
  RoleRouter,
  MenuRouter,
  PermRouter,
  
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'Login',
    beforeEnter: (to, from, next) => {
      // 如果已经登陆过则跳转到之前的页面，没有之前的页面则跳转到首页
      if (store.getters.token) {
        next({
          path: from.fullPath,
          query: { redirect: from.fullPath }
        })
      } else {
        next()
      }
    },
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: "/dashboard",
    children: [
      route('/dashboard', '/Dashboard', 'Dashboard')

    ]
  },
  {
    path: '/404',
    component: () => import('@/views/layout'),
    redirect: "/404",
    children: [
      route('/404', '/public/404', '404')
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/layout'),
    redirect: "/401",
    children: [
      route('/401', '/public/401', '401')
    ]
  },
]

const router = new Router({
  routes: moduleRouter
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  // 如果需要权限
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next();
    } else {
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
});

export default router
