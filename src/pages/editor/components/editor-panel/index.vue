<template>
  <div class="editor-pane" ref="editorPan">
    <div class="editor-pane-inner">
      <div
        class="editor-main"
        :style="{
          transform: 'scale(' + scale + ')',
          width: projectData.width + 'px',
          height: projectData.height + 'px',
        }"
      >
        <div
          class="page-preview-wrapper"
          ref="canvas-panel"
          id="cancas-panel"
          :style="getCommonStyle(activePage.commonStyle)"
        ></div>
        <div class="page-wrapper-mask"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { ruyi_register_components_object } from "@/plugins/index";
import editorProjectConfig from "../../DataModel";
export default {
  props: {
    scale: {
      type: Number,
      default: 1,
    },
  },
  components: {
    // 注册组件
    ...ruyi_register_components_object,
  },
  data() {
    return {
      editorPaneWidth: 0,
      getCommonStyle: editorProjectConfig.getCommonStyle,
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters([
      "activePage",
      "currentPageIndex",
      "activeElementIndex",
      "activeElement",
    ]),
    getMenuOptionsPositionStyle() {
      let both =
        (this.editorPaneWidth - this.projectData.width * this.scale) / 2;
      let right = both < 60 ? 16 : both;
      return {
        right: right + "px",
      };
    },
  },
};
</script>
<style lang="less" scoped>
.editor-pane{
  height: 100%;
}
</style>