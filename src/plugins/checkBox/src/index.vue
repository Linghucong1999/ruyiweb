<template>
  <div class="ruyi-checkbox">
    <el-checkbox v-model="checked" :label="label" checked></el-checkbox>
  </div>
</template>
<script>
export default {
  name: "RuyiCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "复选框",
    },
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>