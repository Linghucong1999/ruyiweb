<template>
  <div>
    <div class="header-title">找回密码</div>
    <div class="header-secondary-title">验证码将会发送至你注册的邮箱</div>
    <div class="password-input">
      <el-input
        v-model="email"
        placeholder="请输入邮箱"
        prefix-icon="el-icon-message"
      ></el-input>
    </div>
    <div class="password-button">
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
    <div class="password-footer">
      <el-link type="primary">手机号找回</el-link>
      <el-link type="info">手机或邮箱不可用?</el-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Step",
  data() {
    return {
      email: "",
      active: 0,
    };
  },
  methods: {
    next() {
      this.$emit("next", this.active + 1);
    },
  },
};
</script>
<style lang="less" scoped>
</style>