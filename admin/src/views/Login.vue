<template>
  <div class="login">
    <div class="content">
      <!-- 头像区域 -->
      <div class="logo">
        <img src="~assets/img/login.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <div class="content_form">
        <el-form
          :model="form"
          label-width="auto"
          class="form_box"
          size="medium"
          :rules="rules"
          ref="loginFormRef"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" round @click="loginClick" :plain="true"
              >登录</el-button
            >
            <el-button type="info" round @click="resetClick">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "network/login";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", teigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", teigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetClick() {
      //重置表单
      this.$refs.loginFormRef.resetFields();
    },
    loginClick() {
      //校验表单
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await getLogin(this.form);
        if (res.meta.status !== 200)
          return this.$message({
            showClose: true,
            message: "登录失败",
            type: "error",
          });
        this.$message({
          message: "登录成功",
          type: "success",
        });
        /* 
          1.将登录成功的token ,保存在客户端的 sessionStorage 中
            1.1 项目项目中出现了登录之外的其他 API接口 必须在登录之后才能访问
            1.2 token 只应在当前网站打开期间生效，所有将 token 保存在 sessionStorage 中
          2.通过编程式导航转到后台主页  路由地址为 /home
        */
        sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background-color: skyblue;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.content {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: rotate 5s linear infinite;
  }
}
.form_box {
  padding: 0 30px;
  margin-top: 100px;
}
.btns {
  text-align: center;
  margin-right: 30px;
}
</style>