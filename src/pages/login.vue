<template>
  <div class="login">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-form">
        <div class="login-header">欢迎来到无代码世界</div>
        <div class="login-password" v-if="ifEmail === false">
          <el-form :model="formData" :rules="formRules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="用户名"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" v-if="type === 'register'">
              <el-input
                v-model="formData.email"
                placeholder="邮箱"
                auto-complete="off"
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
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="rest-password">
                <el-tooltip content="重置密码" placement="top-start">
                  <el-button
                    type="text"
                    @click="goPassword"
                    icon="el-icon-question"
                    v-if="type === 'login'"
                    >重置密码</el-button
                  >
                </el-tooltip>
                <div class="switch-do-type">
                  <el-button type="text" @click="switchType">{{
                    type === "login" ? "立即注册" : "马上登录"
                  }}</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="btn-hover" @click="doSubmit('loginForm')">
                <el-button type="primary" class="login-button">{{
                  type === "login" ? "登录" : "注册"
                }}</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="login-email" v-if="type === 'login'">
            <el-button type="text" @click="goEmail">通过邮箱登录</el-button>
          </div>
        </div>

        <div class="login-password" v-else>
          <el-form :model="formData" :rules="formRules" ref="loginForm">
            <el-form-item prop="email">
              <el-input
                v-model="formData.email"
                placeholder="邮箱登录"
                prefix-icon="el-icon-mobile-phone"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="send-code">
                <el-input
                  v-model="formData.code"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-message"
                ></el-input>
                <el-button
                  type="primary"
                  size="small"
                  @click="sendEmailCode"
                  :disabled="disableEamilButton"
                >
                  <template v-if="disableEamilButton"
                    >{{ countDown }}s后可重新发送</template
                  >
                  <template v-else>发送验证码</template>
                </el-button>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="btn-hover" @click="doLoginByEmail">
                <el-button type="primary" class="login-button">登录</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="login-email">
            <el-button type="text" @click="goEmail">通过用户密码登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userModel from "@/libs/userModel";
export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        username: "",
        password: "",
        code: "",
      },
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            pattern: /^.{6,12}$/,
            message: "密码长度应为6-12位",
            trigger: "blur",
          },
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,12}$/,
          //   message: "必须包含数字和字母",
          //   trigger: "blur",
          // },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      type: "login",
      ifEmail: false, //是否通过邮箱注册
      disableEamilButton: false, //发送验证码后禁用
      countDown: 60, //倒计时
    };
  },
  created() {
    this.formUrl = this.$route.query.from
      ? window.decodeURIComponent(this.$route.query.from)
      : "";
  },
  methods: {
    doSubmit(form) {
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          let fn = this.type === "login" ? this.doLogin : this.doRegister;
          fn();
        } else {
          this.$message.error("请输入完整信息");
          return;
        }
      });
    },
    async doLogin() {
      let formData = { ...this.formData };
      let res = await userModel.doLogin(formData);
      if (Object.keys(res).length !== 0) {
        this.formUrl
          ? this.$router.push(this.formUrl)
          : userModel.goBeforeLoginUrl();
      }
    },
    goPassword() {
      this.$router.push({ name: "Password" });
    },
    switchType() {
      if (this.type === "login") {
        this.type = "register";
      } else {
        this.type = "login";
      }
    },
    goEmail() {
      this.ifEmail = !this.ifEmail;
    },
    sendEmailCode() {
      if (this.formData.email === "") {
        this.$message.error("请输入邮箱");
        return;
      }
      this.disableEamilButton = true;
      this.countDown = 60; //按钮倒计时

      //发送验证码
      userModel.sendEmailAndCode({ email: this.formData.email });
      //发送按钮定时器
      const countDownInterval = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          this.disableEamilButton = false;
          clearInterval(countDownInterval);
        }
      }, 1000);
    },
    doLoginByEmail() {},
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
    padding: 50px 0;

    .login-header {
      height: 20px;
      width: 100%;
      line-height: 20px;
      margin: 30px 0;
      font-size: 20px;
      font-weight: bolder;
    }

    /deep/ .el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #d9d9d9;
      background-color: #fbfbfc;
    }

    .rest-password {
      display: flex;
      justify-content: space-between;

      .switch-do-type {
      }
    }

    .login-button {
      width: 100%;
    }

    .login-email {
      display: flex;
      justify-content: flex-end;
    }

    .send-code {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      /deep/ .el-button--small {
        margin-left: 20px;
        padding: 9px 2px;
      }
    }
  }
}
</style>