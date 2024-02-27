<template>
  <div class="page-editor editor-wrapper" v-loading="loading">
    <!-- 左侧导航栏 -->
    <div class="editor-side-bar border-R">
      <el-tabs tab-position="left" v-model="activeSideBar" style="height: 100%">
        <el-tab-pane
          v-for="(item, index) in sideBarMenus"
          :key="index"
          :name="item.value"
        >
          <el-tooltip
            slot="label"
            class="item"
            effect="dark"
            :content="item.label"
            placement="right"
          >
            <i :class="item.elementUiIcon"></i>
          </el-tooltip>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 组件/页面/模板 -->
    <div class="editor-page-edit-wrapper">
      <component-libs v-if="activeSideBar === 'componentLibs'"></component-libs>
    </div>

    <!-- 页面编辑区域 -->
    <div class="editor-main">
      <div class="control-bar-wrapper">
        <cantrol-bar
          :scale.sync="canvasConfig.scale"
          @import-psd-data="importPsdData"
          @showPreview="showPreview"
          @cancel="cancel"
        ></cantrol-bar>
      </div>
      <editor-pan :scale.sync="canvasConfig.scale"></editor-pan>
    </div>

    <div class="el-attr-edit-wrapper scrollbar-wrapper">零一边框</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { sideBarMenus } from "@/utils/commanJson";
import ComponentLibs from "./components/component-libs/index.vue";
import CantrolBar from "./components/control-bar.vue";
import EditorPan from "./components/editor-panel/index.vue";
export default {
  components: {
    ComponentLibs,
    CantrolBar,
    EditorPan,
  },
  data() {
    return {
      id: "",
      loading: false,
      activeSideBar: "componentLibs",
      sideBarMenus: sideBarMenus,
      canvasConfig: {
        scale: 1,
      },
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
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
          this.$store.dispatch("setProjectData", res.body);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 导入的psd文件数据
     * @param {*} psdData
     */
    importPsdData(psdData) {
      const elementsList = psdData.elements;
      const psdWidth = psdData.document.document.width;
      const scalingRatio = this.projectData.width / psdWidth;
      console.log(scalingRatio);
      elementsList.forEach((element) => {
        const { width, height, top, left, imageSrc, opacity, zIndex } = element;
        setTimeout(() => {
          this.$store.dispatch("addElement", {
            elName: "ruyi-image",
            defaultStyle: {
              width: width * scalingRatio,
              height: height * scalingRatio,
              left: left * scalingRatio,
              top: top * scalingRatio,
              opacity: opacity,
              zIndex: zIndex,
            },
            needProps: {
              imageSrc,
            },
          });
        }, 10);
      });
    },
    showPreview() {},
    cancel() {
      this.$confirm("是否退出当前项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.editor-wrapper {
  display: flex;
  height: 100%;
  position: relative;
  margin-top: 20px;

  .editor-side-bar {
    width: 55px;
  }
  .editor-main {
    flex: 1;
    position: relative;
  }
}

.editor-page-edit-wrapper {
  width: 210px;
  padding: 0 1px;
}

.control-bar-wrapper {
  position: absolute;
  top: -55px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 1000;
}

.el-attr-edit-wrapper {
  width: 380px;
  padding: 0;
}

// ::v-deep .el-tabs__item:hover {
//   background-color: #ecf5ff;
// }

// ::v-deep.el-tabs--left .el-tabs__active-bar.is-left {
//   right: revert-layer;
//   left: 0;
// }

// ::v-deep .el-tabs__active-bar {
//   background-color: #fff;
// }

// ::v-deep .el-tabs--left .el-tabs__nav-wrap.is-left::after {
//   width: 0;
// }
</style>