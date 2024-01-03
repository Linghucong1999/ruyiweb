<template>
  <div class="reset-form">
    <el-form :model="formData">
      <el-form-item>
        <el-input
          v-model="formData.newPassword"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formData.reconPassword"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "StepForm",
  data() {
    return {
      formData: {
        newPassword: "",
        reconPassword: "",
      },
    };
  },
};
</script>
<style lang="less" scoped>
.reset-form {
    width: 350px;
    margin: auto;
}
</style>