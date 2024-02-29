<template>
  <div>
    <p class="page-title fontBold">基础样式</p>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="尺寸与位置：">
        <div class="attr-item-edit-wrapper marginB15">
          <p class="attr-item-title">快捷定位：</p>
          <div class="sizeAndPosition-wrapper">
            <div
              class="align-type-item"
              v-for="item in alignTypeList"
              :key="item.type"
              @click="changeAlignType(item.type)"
            >
              <el-tooltip
                :content="item.title"
                effect="dark"
                placement="bottom"
              >
                <i :class="[item.icon]" style="color: #67c23a"></i>
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">尺寸：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="activeElement.commonStyle.width"
              controls-position="right"
              :min="0"
              size="mini"
            ></el-input-number>
            <div class="attr-item-edit-input-des">宽度</div>
          </div>

          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="activeElement.commonStyle.height"
              controls-position="right"
              :min="0"
              size="mini"
            ></el-input-number>
            <div class="attr-item-edit-input-des">高度</div>
          </div>
        </div>

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">RESIZE：</p>
          <div class="sizeAndPosition-wrapper">
            <div
              class="align-type-item clearFlex"
              @click="handleResizeClick('wh')"
            >
              <el-tooltip content="全屏" placement="bottom" effect="dark">
                <i class="iconfont iconquanping"></i>
              </el-tooltip>
            </div>

            <div
              class="align-type-item clearFlex"
              @click="handleResizeClick('w')"
            >
              <el-tooltip content="宽100%" placement="bottom" effect="dark"
                ><i class="iconfont iconcolumn-width"></i
              ></el-tooltip>
            </div>

            <div
              class="align-type-item clearFlex"
              @click="handleResizeClick('h')"
            >
              <el-tooltip content="高100%" placement="bottom" effect="dark"
                ><i class="iconfont iconcolum-height"></i
              ></el-tooltip>
            </div>
          </div>
        </div>

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">位置：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="activeElement.commonStyle.top"
              size="mini"
              controls-position="right"
            ></el-input-number>
            <div class="attr-item-edit-input-des">Y</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="activeElement.commonStyle.left"
              size="mini"
              controls-position="right"
            ></el-input-number>
            <div class="attr-item-edit-input-des">X</div>
          </div>
        </div>

        <div class="attr-item-edit-wrapper"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { alignTypeList } from "@/utils/commanJson";
import { subtract, ceil, divide } from "lodash";

export default {
  data() {
    return {
      activeNames: ["1"],
      alignTypeList: alignTypeList,
    };
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
      activeAttrEditCollapse: (state) =>
        state.pageEditor.activeAttrEditCollapse,
    }),
    ...mapGetters([
      "currentPageIndex",
      "activeElementIndex",
      "activePage",
      "activeElement",
    ]),
  },
  methods: {
    changeAlignType(type) {
      const canvasW = this.$config.canvasH5Width;
      const canvasH = this.$config.canvasH5Height;
      const eleW = this.activeElement.commonStyle.width;
      const eleH = this.activeElement.commonStyle.height;

      switch (type) {
        case "t":
          this.activeElement.commonStyle.top = 0;
          break;
        case "b":
          this.activeElement.commonStyle.top = subtract(canvasH, eleH);
          break;
        case "l":
          this.activeElement.commonStyle.left = 0;
          break;
        case "r":
          this.activeElement.commonStyle.left = subtract(canvasW, eleW);
          break;
        case "tb":
          this.activeElement.commonStyle.top = ceil(
            divide(subtract(canvasH, eleH), 2),
            2
          );
          break;
        case "lr":
          this.activeElement.commonStyle.left = ceil(
            divide(subtract(canvasW, eleW), 2),
            2
          );
          break;
      }
    },
    handleResizeClick(type) {
      if (type.includes("w")) {
        this.activeElement.commonStyle.left = 0;
        this.activeElement.commonStyle.width = this.$config.canvasH5Width;
      }

      if (type.includes("h")) {
        this.activeElement.commonStyle.top = 0;
        this.activeElement.commonStyle.height = this.$config.canvasH5Height;
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>