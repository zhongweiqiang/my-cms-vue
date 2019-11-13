export function route (path, file, name, title, children) {
    return {
      exact: true,
      path,
      name,
      children,
      meta:{requireAuth:true, title: title},  // 使用路由守卫beforeEach必须写这个
      component: () => import('@/views' + file)
    }
  }