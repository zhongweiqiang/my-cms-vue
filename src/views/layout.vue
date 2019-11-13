<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="overflow: auto;">
      <div class="logo" />
      <!-- 这里是sidebar的log部分 -->
      <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed">
        <a-menu-item key="1">
          <router-link to="/dashboard">
            <a-icon type="home" />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-for="menu in menus" :key="menu.path">
          <span slot="title">
            <a-icon :type="menu.icon" />
            <span>{{ menu.title }}</span>
          </span>
          <a-menu-item v-for="item in menu.children" :key="item.path">
            <router-link :to="item.path">{{item.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <div
        style="background: #eee; position: fixed; z-index: 999; width: 100%; height: 100px;box-shadow:0 0 20px #bbb inset"
      >
        <a-layout-header style="background: #fff; padding: 0;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>

        <div style="padding: 6px 0px 6px 24px; background: #eee;">
          <a-breadcrumb>
            <a-breadcrumb-item href>
              <router-link to="/">
                <a-icon type="home" />
                <span>首页</span>
              </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.meta.title">{{ this.$route.meta.title }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </div>

      <a-layout-content
        :style="{ margin: '0px 16px 24px 16px', padding: '110px 10px 24px 24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
// import menus from "./menu";
import { userMenu } from "@/api/menu";
export default {
  data() {
    return {
      collapsed: false,
      menus: []
    };
  },
  created() {
    console.log("this is in layout");
    this.getMenu();
    // console.log(menus);
  },
  mounted() {},
  methods: {
    home() {
      // console.log("ddd");
      this.$router.push({ name: "Dashboard" });
    },
    getMenu() {
      userMenu().then(response => {
        // console.log(response);
        this.menus = response.data;
      });
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
