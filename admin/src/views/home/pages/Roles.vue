<template>
  <div class="roles">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-button type="primary" class="add_roles" size="mini"
        >添加角色</el-button
      >
      <el-table :data="rolesList" stripe style="width: 100%" border>
        <el-table-column type="expand"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
            </el-tooltip>

            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >

            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"
                >分配权限</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { setRequest } from "network/request";
export default {
  data() {
    return {
      rolesList: [],
    };
  },
  methods: {
    async getRolesList() {
      const { data: res } = await setRequest().get("roles");
      console.log(res.data);
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.rolesList = res.data;
    },
  },
  created() {
    this.getRolesList();
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.add_roles {
  margin-bottom: 20px;
}
</style>



