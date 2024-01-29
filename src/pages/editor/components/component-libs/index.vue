<template>
  <div class="components-libs-wrapper">
    <p class="page-title">组件库</p>
    <el-scrollbar style="height: 100%">
      <ul>
        <li v-for="(item, index) in componentsList" :key="index"></li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      componentsList: [],
    };
  },
};
</script>
<style lang="less" scoped>
</style>