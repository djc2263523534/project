<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="22" :offset="6">
            <el-row :gutter="5">
              <el-col :span="6">
                <el-input
                  placeholder="请输入内容"
                  class="input-with-select"
                  size="small "
                  v-model="searchInfo"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small ">添加用户</el-button>
              </el-col>
            </el-row></el-col
          >
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: "",
    };
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