<template>
  <div class="page-editor editor-wrapper" v-loading="loading">编辑页面</div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      loading: false,
    };
  },
  created() {
    this.$store.dispatch("setProjectData");
    this.id = this.$route.query.id;
  },
  methods:{
    // 初始化页面
    initPage(){
      this.loading = true;
      // this.$api.
    }
  },
};
</script>
<style lang="less" scoped>
</style>