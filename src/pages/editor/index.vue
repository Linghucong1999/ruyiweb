<template>
  <div class="page-editor editor-wrapper" v-loading="loading">
    <!-- 左侧导航栏 -->
    <div class="editor-side-bar">
      <el-tabs tab-position="left" v-model="activeSideBar">
        <el-tab-pane
          v-for="(item, index) in sideBarMenus"
          :key="index"
          :name="item.value"
        >
          <div slot="label">
            <i :class="item.elementUiIcon"></i>{{ item.label }}
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 组件/页面/模板 -->
    <div class="editor-page-edit-wrapper">
      <component-libs v-if="activeSideBar === 'componentLibs'"></component-libs>
    </div>
  </div>
</template>
<script>
import { sideBarMenus } from "@/utils/commanJson";
import ComponentLibs from "./components/component-libs/index.vue";
export default {
  components: {
    ComponentLibs,
  },
  data() {
    return {
      id: "",
      loading: false,
      activeSideBar: "componentLibs",
      sideBarMenus: sideBarMenus,
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.$route.query.page === "newPage") {
      this.$store.dispatch("setProjectData");
    } else {
      this.initPage();
    }
  },
  methods: {
    // 初始化页面数据
    initPage() {
      this.loading = true;
      this.$api
        .getPageDetail({ pageId: this.id })
        .then((res) => {
          this.loading = false;
          this.$store.dispatch("setProjectData", ...res.body);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.editor-wrapper {
  display: flex;
  height: 100%;
  position: relative;

  .editor-side-bar {
    font-size: 14px;
  }
}

::v-deep .el-tabs__item:hover {
  background-color: #ecf5ff;
}
</style>