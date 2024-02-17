<template>
  <!-- 组件编辑外层拖拽，可编辑按钮，缩放改变盒子大小 -->
  <div class="commonents-edit-shape">
    <div class="edit-shape-point"></div>
  </div>
</template>
<script>
import runAnimation from "@/common/js/runAnimations";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    // defaultStyle:{
    //     require:true,
    //     type:Object,
    // }
    uuid: String,
  },
  data() {
    return {
      //l =left,t=top,r=right,b=bottom
      pointList: ["lt", "rt", "lb", "rb", "l", "r", "t", "b"],
      //上下左右对应东南西北
      directionKey: {
        t: "n",
        b: "s",
        l: "w",
        r: "e",
      },
    };
  },
};
</script>
<style lang="less" scoped>
</style>