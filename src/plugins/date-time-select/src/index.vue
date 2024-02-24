<template>
  <div class="ruyi-date-time-select">
    <el-date-picker
      v-model="valueTime"
      placeholder="选择日期时间"
      type="datetime"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "RuyiDateTimeSelect",
  props: {},
  data() {
    return {
      valueTime: "",
    };
  },
};
</script>
<style lang="less" scoped>
</style>