<template>
  <div class="page-thumbnail-panel" v-loading="loading" v-if="pageData">
    <span class="unpublish" v-if="!pageData.isPublish && showPublishState"
      >未发布</span
    >
  </div>
  <div v-else v-loading="loading" class="page-thumbnail-panel create">
    <el-button type="primary" size="small" @click="newPage"
icon="el-icon-plus"
      >新建页面</el-button
    >
  </div>
</template>
<script>
// import editDataModel from "@/pages/editor/DataModel";

export default {
  props: {
    pageTye: {
      type: String,
      default: "H5",
    },
    pageData: {
      type: Object,
      default: () => {},
    },
    showPublishState: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    newPage() {
      // let newPageData = editDataModel.getProjectConfig();
      // this.loading = true;
      // this.$api
    },
  },
};
</script>
<style lang="less" scoped>
</style>