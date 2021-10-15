<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div ref="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { setRequest } from "network/request";
export default {
  data() {
    return {
      //图表的配置项和数据
      option: {},
    };
  },
  mounted() {
    this.getEcharts();
  },
  methods: {
    async getEcharts() {
      // 1.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs["main"]);

      const { data: res } = await setRequest().get(`reports/type/1`);
      if (res.meta.status !== 200)
        return this.$message.error("获取图表数据失败");
      this.option = res.data;

      myChart.setOption(this.option);
      console.log(res.data);
    },
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