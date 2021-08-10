
<template>
  <div class="rights">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-table :data="rightsList" stripe style="width: 100%" border>
        <el-table-column type="index" prop="math" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level == 2">三级</el-tag>
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
      rightsList: [
        {
          authName: "",
          path: "",
          level: "",
        },
      ],
    };
  },
  methods: {
    async getRightsList() {
      const { data: res } = await setRequest().get(`rights/list`);
      console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败");
      this.rightsList = res.data;
    },
  },
  created() {
    this.getRightsList();
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
</style>