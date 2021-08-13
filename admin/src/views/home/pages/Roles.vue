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
      <el-button type="primary" class="add_roles" size="mini" @click="addRoles"
        >添加角色</el-button
      >
      <el-table :data="rolesList" stripe style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="border"
              v-for="(item1, index1) in scope.row.children"
            >
              <!-- 一级 -->
              <el-col :span="5"
                ><el-tag closable @close="closeTag(scope.row, item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, index2) in item1.children">
                  <!-- 二级 -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="closeTag(scope.row, item2.id)"
                      >{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i
                  ></el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="(item3, index3) in item2.children"
                      @close="closeTag(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRoles(scope.row.id)"
              >编辑</el-button
            >

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteRoles(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="grant(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑角色 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="closeEditForm"
    >
      <el-form
        :model="editRolesForm"
        :rules="editRolesRules"
        ref="editRolesRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      title="提示"
      :visible.sync="grantdialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="closegrant"
    >
      <!-- 树型控件 -->
      <el-tree
        default-expand-all
        :data="treeList"
        show-checkbox
        node-key="id"
        :props="treeProps"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="defKeys"
        ref="treeRef"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="grantdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog
      title="提示"
      :visible.sync="addRolesDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="addRolesRef"
        :rules="addRolesRules"
        :model="addRolesForm"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setRequest } from "network/request";
export default {
  data() {
    return {
      rolesList: [],
      dialogVisible: false,
      editRolesForm: {},
      editRolesRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 0, max: 5, message: "长度在 0 到 5 个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      grantdialogVisible: false,
      treeList: [],
      treeProps: {
        children: "children",
        label: "authName",
      },
      defKeys: [],
      roleId: "",
      addRolesDialogVisible: false, //添加角色
      addRolesForm: {
        roleName: "",
        roleDesc: "",
      },
      addRolesRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getRolesList() {
      const { data: res } = await setRequest().get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.rolesList = res.data;
    },
    handleClose() {},
    //重置表单
    closeEditForm() {
      this.$refs["editRolesRef"].resetFields();
    },
    //编辑角色
    async editRoles(id) {
      const { data: res } = await setRequest().get(`roles/${id}`);
      if (res.meta.status !== 200)
        return this.$message.error("查询角色数据失败");
      this.editRolesForm = res.data;
      this.dialogVisible = true;
    },
    editSave() {
      this.$refs["editRolesRef"].validate(async (vaild) => {
        if (!vaild) return;
        const { data: res } = await setRequest().put(
          `roles/${this.editRolesForm.roleId}`,
          {
            roleName: this.editRolesForm.roleName,
            roleDesc: this.editRolesForm.roleDesc,
          }
        );
        if (res.meta.status !== 200) return this.$message.error("角色编辑失败");
        this.$message({
          type: "success",
          message: "角色编辑成功",
        });
        this.getRolesList();
        this.dialogVisible = false;
      });
    },
    //删除角色
    deleteRoles(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "删除角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await setRequest().delete(`roles/${id}`);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getRolesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除角色权限
    closeTag(fatherId, childId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await setRequest().delete(
            `roles/${fatherId.id}/rights/${childId}`
          );
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //返回的data, 是当前角色下最新的权限数据  重新赋值
          fatherId.children = res.data;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //树形列表
    async grant(role) {
      this.grantdialogVisible = true;
      const { data: res } = await setRequest().get(`rights/tree`);
      if (res.meta.status !== 200) return this.$message.error("获取权限失败");
      this.treeList = res.data;
      this.roleId = role.id;
      //递归函数
      this.getLeafKey(role, this.defKeys);
    },
    getLeafKey(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((value) => {
        this.getLeafKey(value, arr);
      });
    },
    //关闭对话
    closegrant() {
      this.defKeys = [];
    },
    async allRights() {
      const keys = [
        ...this.$refs["treeRef"].getCheckedKeys(),
        ...this.$refs["treeRef"].getHalfCheckedKeys(),
      ];
      const keyStr = keys.join(",");
      const { data: res } = await setRequest().post(
        `roles/${this.roleId}/rights`,
        {
          rids: keyStr,
        }
      );
      if (res.meta.status !== 200) return $message.error("分配权限失败");
      this.$message({
        type: "success",
        message: "分配权限成功",
      });
      this.getRolesList();
      this.grantdialogVisible = false;
    },
    //添加角色
    addRoles() {
      this.addRolesDialogVisible = true;
    },
    addRolesSave() {
      this.$refs["addRolesRef"].validate(async (vaild) => {
        if (!vaild) return;
        const { data: res } = await setRequest().post(
          "roles",
          this.addRolesForm
        );
        if (res.meta.status !== 201) return this.$message.error("添加角色失败");
        this.$message({
          type: "success",
          message: "添加角色成功",
        });
        this.getRolesList();
        this.addRolesDialogVisible = false;
      });
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
.border {
  border-bottom: 1px solid #eee;
  align-items: center;
  display: flex;
}
.el-tag {
  margin: 7px;
}
</style>



