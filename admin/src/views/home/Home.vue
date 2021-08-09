<template>
  <div class="home">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div class="header-info">
          <!-- <img src="~assets/img/touxiang.jpg" alt="" /> -->
          后台管理系统
        </div>
        <el-button type="info" round size="small" @click="logout"
          >退出</el-button
        >
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="menuShow ? '64px' : '200px'">
          <!-- 一级菜单 -->
          <div class="btn" @click="btnClick"><i class="el-icon-more"></i></div>
          <el-menu
            background-color="#373d41"
            text-color="#fff"
            :unique-opened="true"
            :collapse="menuShow"
            :collapse-transition="true"
            :router="true"
            default-active="$route.path"
          >
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="icoList[index]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="child.path"
                v-for="(child, index) in item.children"
                :key="child.id"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ child.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getHomeList } from "network/login";
export default {
  name: "home",
  components: {},
  data() {
    return {
      menuList: [],
      icoList: [
        "el-icon-user-solid",
        "el-icon-s-management",
        "el-icon-s-goods",
        "el-icon-s-order",
        "el-icon-s-platform",
      ],
      menuShow: false,
    };
  },

  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async getHomeList() {
      const { data: res } = await getHomeList();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
    },
    btnClick() {
      this.menuShow = !this.menuShow;
    },
  },
  created() {
    this.getHomeList();
  },
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: #373d41;
  transition: all 1s;
}
.el-menu {
  border: none;
  transition: none;
}
.btn {
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-color: #4a5064;
}
</style>