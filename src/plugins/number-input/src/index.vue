<template>
  <div class="ruyi-number-input">
    <el-input
      v-model="dataNumber"
      :placeholder="placeholderValue"
      type="number"
      size="small"
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "RuyiNumberInput",
  props: {
    numberValue: {
      type: Number,
      default: 0,
    },
    numberTitle: {
      type: String,
      default: "数字输入框",
    },
    placeholderValue: {
      type: String,
      default: "请输入数字",
    },
  },
  data() {
    return {
      dataNumber: this.numberValue,
    };
  },
};
</script>
<style lang="less" scoped>
</style>