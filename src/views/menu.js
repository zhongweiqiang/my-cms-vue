var menus = [
    // {
    //   icon: "home",
    //   title: "首页",
    //   path:"/dashboard",
    // },
  
    // {
    //   type: "user",
    //   title: "电子产品备案管理",
    //   path:"/member",
    //   children: [
    //     { title: "客户管理", path: "/member/list" }
    //   ]
    // },
    {
      icon: "setting",
      title: "系统管理",
      path:"/system",
      children: [
        { title: "用户管理", path: "/user/list" },
        { title: "角色管理", path: "/role/list" },
        { title: "菜单管理", path: "/menu/list" },
        // { title: "角色添加", path: "/role/add" },
      ]
    }
  ]
  
  export default menus;