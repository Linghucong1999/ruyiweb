<template>
  <el-scrollbar class="components-attr-edit">
    <div class="attr-edit-inner" v-if="activeElementUUID">
      <div class="props-attr-style"></div>
      <div class="common-attr-style">
        <base-attr></base-attr>
      </div>
    </div>
    <div v-else class="gray paddingT30 text-center">
      <div style="font-weight: bold">请在画板上选择要编辑的元素</div>
      <div>
        <lottie :options="{ animationData: animation }"></lottie>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import directive from "@/assets/Model/no-direction.json";
import BaseAttr from "./attr-props-components/base-attr.vue";

export default {
  data() {
    return {
      animation: directive,
    };
  },
  components: {
    BaseAttr,
  },
  computed: {
    ...mapState({
      projectData: (state) => state.pageEditor.projectData,
      activePageUUID: (state) => state.pageEditor.activePageUUID,
      activeElementUUID: (state) => state.pageEditor.activeElementUUID,
    }),
    ...mapGetters(["currentPageIndex", "activeElementIndex"]),
  },
};
</script>
<style lang="less" scoped>
</style>