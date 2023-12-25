<template>
  <div class="login">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-form">
        <div class="login-header">欢迎来到无代码世界</div>
        <div class="login-password">
          <el-form :model="formData" :rules="formRules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="用户名"
                @keyup.enter.native="doLogin"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" v-if="type === 'register'">
              <el-input
                v-model="formData.email"
                placeholder="邮箱"
                auto-complete="off"
                @keyup.enter.native="doLogin"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                name="password"
                placeholder="密码"
                type="password"
                show-password
                prefix-icon="el-icon-lock"
                clearable
                @keyup.enter.native="doLogin"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="type === 'login'">
              <div class="rest-password">
                <el-tooltip content="重置密码" placement="top-start">
                  <el-button
                    type="text"
                    @click="goPassword"
                    icon="el-icon-question"
                    >重置密码</el-button
                  >
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="btn-hover" @click="doSubmit">
                <el-button type="primary">{{
                  type === "login" ? "登录" : "注册"
                }}</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="switch-do-type"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        username: "",
        password: "",
      },
      formRules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            require: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
      type: "login",
    };
  },
  methods: {
    doSubmit() {},
    doLogin() {},
    goPassword() {},
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: row;
  background: url("../common/images/login_background.png") no-repeat center
    center / cover;
  background-size: 100% 100%;
}
.login-left {
  margin: auto 0;

  width: 340px;
  height: 540px;
  box-shadow: 0 0 8px 8px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.login-right {
  margin: auto 0;

  width: 340px;
  height: 540px;
  border-radius: 10px;
  box-shadow: 0 0 8px 8px rgba(255, 255, 255, 0.2);
  background-color: #fbfbfc;

  .login-form {
    margin: 20px;
    .login-header {
      height: 20px;
      width: 100%;
      line-height: 20px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bolder;
    }
  }
}
</style>