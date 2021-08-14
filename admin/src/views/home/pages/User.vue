<template>
  <div class="users">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div class="search_box">
        <el-row :gutter="20">
          <el-col :span="22" :offset="6">
            <el-row :gutter="5">
              <el-col :span="6">
                <el-input
                  placeholder="请输入内容"
                  class="input-with-select"
                  size="small "
                  v-model="userInfo.query"
                  clearable
                  @clear="getUsersList"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getUsersList"
                  ></el-button>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  size="small "
                  @click="dialogVisible = true"
                  >添加用户</el-button
                >
              </el-col>
            </el-row></el-col
          >
        </el-row>
      </div>
      <!-- 用户列表 -->
      <el-table :data="usersList" stripe border>
        <el-table-column type="index" prop="#" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改信息"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="mangeInfo(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUsers(scope.row.id)"
            ></el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setUsers(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userInfo.pagenum"
        :page-sizes="[1, 3, 5]"
        :page-size="userInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户信息对话框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="closeClick"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="edialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="closeEdit"
    >
      <el-form
        ref="changeFormRef"
        :model="changeForm"
        label-width="80px"
        :rules="changeFormRules"
      >
        <el-form-item label="用户名">
          <el-input v-model="changeForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="changeForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="changeForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="edialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="etitUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->

    <el-dialog
      title="提示"
      :visible.sync="setDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <p>当前的用户：{{ info.username }}</p>
      <p>当前的角色：{{ info.role_name }}</p>
      <p>
        下拉菜单：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsersList, addUserInfo } from "network/login";
import { setRequest } from "network/request";

export default {
  data() {
    //验证邮件的规则
    const checkEmail = (rule, value, callback) => {
      const regexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regexp.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    //验证手机号的规则
    const checkPhone = (rule, value, callback) => {
      const regexp =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regexp.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确手机号"));
    };
    return {
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3,
      },
      usersList: [],
      total: 0,
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      edialogVisible: false, //控制修改对话框的显示和隐藏
      changeForm: {}, //查询用户信息对象
      changeFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      setDialogVisible: false,
      info: [],
      value: "",
      options: [],
    };
  },
  methods: {
    // 获取用户列表
    async getUsersList() {
      const { data: res } = await getUsersList(this.userInfo);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.usersList = res.data.users;
      this.total = res.data.total;
    },
    //数据分页
    handleSizeChange(newSize) {
      this.userInfo.pagesize = newSize;
      this.getUsersList();
    },
    handleCurrentChange(page) {
      this.userInfo.pagenum = page;
      this.getUsersList();
    },
    // 改变用户状态
    async changeStatus(info) {
      const { data: res } = await setRequest().put(
        `users/${info.id}/state/${info.mg_state}`
      );
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message({
        message: res.meta.msg,
        type: "success",
      });
    },
    handleClose() {
      // this.dialogVisible = false;
    },
    // 重置表单
    closeClick() {
      this.$refs["ruleForm"].resetFields();
    },
    //添加用户信息
    addUsers() {
      this.$refs["ruleForm"].validate(async (vaild) => {
        if (!vaild) return;
        const { data: res } = await setRequest().post("users", this.ruleForm);
        console.log(res);
        if (res.meta.status !== 201) return this.$message.error("用户添加失败");
        this.$message({
          message: "用户添加成功",
          type: "success",
        });
        this.dialogVisible = false;
        //添加成功 重新获取数据
        this.getUsersList();
      });
    },
    //查询用户信息
    async mangeInfo(id) {
      const { data: res } = await setRequest().get(`users/${id}`);
      if (res.meta.status !== 200) return this.$message.error("查询用户失败");
      this.changeForm = res.data;
      this.edialogVisible = true;
    },
    // 重置表单
    closeEdit() {
      this.$refs["changeFormRef"].resetFields();
    },
    //修改用户信息
    etitUsers() {
      this.$refs["changeFormRef"].validate(async (vaild) => {
        if (!vaild) return;
        const { data: res } = await setRequest().put(
          `users/${this.changeForm.id}`,
          {
            email: this.changeForm.email,
            mobile: this.changeForm.mobile,
          }
        );
        if (res.meta.status !== 200) return $message.error("修改失败");
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getUsersList();
        this.edialogVisible = false;
      });
    },
    // 删除用户信息
    deleteUsers(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await setRequest().delete(`users/${id}`);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getUsersList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分配角色
    async setUsers(info) {
      this.value = "";
      this.setDialogVisible = true;
      this.info = info;

      const { data: res } = await setRequest().get("roles");
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error("分配权限失败");
      this.options = res.data;
    },
    async saveRolesInfo() {
      if (!this.value) return this.$message.error("请选择分配的角色");
      const { data: res } = await setRequest().put(
        `users/${this.info.id}/role`,
        {
          rid: this.value,
        }
      );
      if (res.meta.status !== 200) return this.$message.error("分配角色失败");
      this.$message({
        type: "success",
        message: "分配角色成功",
      });
      this.getUsersList();
      this.setDialogVisible = false;
    },
  },
  created() {
    this.getUsersList();
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
.search_box {
  margin-bottom: 20px;
}
.el-pagination {
  margin-top: 20px;
}
/deep/ .cell {
  text-align: center;
}
</style>