<template>
  <div
    class="editor-pane"
    ref="editorPan"
    @click="handleClickCanvas"
  >
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
        >
          <editShape
            v-for="item in activePage.elements"
            :key="item.uuid"
            :uuid="item.uuid"
            :active="item.uuid === activeElementUUID"
            :default-style="item.commonStyle"
            :style="
              getCommonStyle({
                width: item.commonStyle.width,
                height: item.commonStyle.height,
                left: item.commonStyle.left,
                top: item.commonStyle.top,
                position: item.commonStyle.position,
              })
            "
            @handleElementClick="handleElementClick(item.uuid)"
            @resize="handleElementResize"
          >
            <component
              :is="item.elName"
              :style="getCommonStyle({ ...item.commonStyle, top: 0, left: 0 ,lineHeight:item.commonStyle.height})"
              class="element-on-edit-pane"
              v-bind="item.propsValue"
            ></component>
          </editShape>
        </div>
        <div class="page-wrapper-mask"></div>
      </div>
    </div>
  </div>
</template>
<script>
import editShape from "@/components/edit-shape.vue";
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
    ...ruyi_register_components_object, // 批量注册组件
    editShape,
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
  methods: {
    handleElementClick(uuid) {
      // 元素被点击
      this.$store.dispatch("setActiveElementUUID", uuid);
    },
    /**
     * 移动改变元素大小定位
     * @param {*} pos 当pos有值表示移动需要实时同步样式变化,pos为undefind时表示移动结束,记录一次历史记录
     * 鼠标移动完成时才记入历史记录
     */
    handleElementResize(pos) {
      if (!pos) {
        this.$store.dispatch("addHistoryCache");
        return;
      }

      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle.left = pos.left;

      this.projectData.pages[this.currentPageIndex].elements[
        this.activeElementIndex
      ].commonStyle = { ...pos };
    },
    handleClickCanvas(e) {
      if (
        !e.target.classList.contains("element-on-edit-pane") &&
        !e.target.classList.contains("menu-item-on-edit-panel")
      ) {
        this.$store.dispatch("setActiveElementUUID", "");
      }
    },
    /**
     * 监听键盘esc事件
     * @param e
     */
    handleKeyup(e) {
      console.log("触发esc事件", e);
    },
  },
};
</script>
<style lang="less" scoped>
.editor-pane {
  height: 100%;
  width: 100%;
  border: 1px solid #e5e3e3;
  border-width: 0 1px;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
  display: flex;
  justify-content: center;
}

.editor-pane-inner {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 20px;
}

.editor-main {
  border-radius: 4px;
  box-shadow: 0 3px 10px #dcdcdc;
  margin: 25px auto;
  position: relative;
  background: white;
  transform-origin: center top;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
}
.page-preview-wrapper {
  height: 100%;
  position: relative;
}
</style>