<template>
  <div class="categories">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-button type="primary" size="mini" @click="addCate"
        >添加分类</el-button
      >
      <zk-table
        :data="categoriesList.slice(startsize, pagenum)"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        :show-row-hover="false"
      >
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color: lightgreen"
            v-if="scope.row.cat_deleted == false"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="info" v-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag type="danger" v-if="scope.row.cat_level == 2">三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCate(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteCate(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </zk-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagesize1"
        :page-sizes="[1, 5, 10]"
        :page-size="pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categoriesList.length"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类 -->

    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="closeCate"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="cate">
          <el-input v-model="ruleForm.cate"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->

    <el-dialog
      title="提示"
      :visible.sync="editdialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="cate">
          <el-input v-model="editForm.cate"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setRequest } from "network/request";
export default {
  data() {
    return {
      categoriesList: [],
      startsize: 0,
      pagesize1: 1,
      pagenum: 5, //每页5条
      queryInfo: {
        type: 1,
        pagesnum: 1,
        pagessize: 1,
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "400px",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      dialogVisible: false,
      ruleForm: {
        name: "",
        cate: "",
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        cate: [{ required: true, message: "请输入父级分类", trigger: "blur" }],
      },
      editForm: {
        name: "",
        cate: "",
      },
      editdialogVisible: false,
    };
  },
  methods: {
    async getCategories() {
      const { data: res } = await setRequest().get(`categories`);
      if (res.meta.status !== 200)
        return this.$message.error("获取商品列表失败");
      this.categoriesList = res.data;
    },
    handleSizeChange(pagenum) {
      console.log(pagenum);
      this.pagenum = pagenum;
    },
    handleCurrentChange(pagesize) {
      // startsize  0  pagesize  1
      console.log(pagesize);
      this.startsize = (pagesize - 1) * this.pagenum;
      this.pagenum = pagesize * 5;
      console.log(this.startsize, this.pagenum);
    },
    handleClose() {},
    closeCate() {
      this.$refs["ruleForm"].resetFields();
    },
    addCate() {
      this.dialogVisible = true;
    },
    saveCate() {
      this.$refs["ruleForm"].validate(async (vaild) => {
        if (!vaild) return this.$message.error("添加分类失败");
        const { data: res } = await setRequest().get(`categories`, {
          params: {
            type: 2,
          },
        });
        console.log(res);
      });
    },
    editCate(scope) {
      this.editdialogVisible = true;
      console.log(scope);
      setRequest().get(`categories/${scope.id}`);
    },
    deleteCate(id) {
      console.log(id);
    },
  },
  created() {
    this.getCategories();
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
.el-button {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>