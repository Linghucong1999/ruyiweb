<template>
  <!-- 组件编辑外层拖拽，可编辑按钮，缩放改变盒子大小 -->
  <div
    class="commonents-edit-shape"
    :class="{ active: active }"
    @click="handleTopWrapperClick"
    @mousedown="handleMouseDown"
  >
    <div
      class="edit-shape-point"
      v-for="(item, index) in active ? pointList : []"
      :key="index"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>
<script>
// import runAnimation from "@/common/js/runAnimations";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
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
  methods: {
    /**
     * 获取point计算后的样式
     * @param point
     * @return {{}}
     */
    getPointStyle(point) {
      const pos = this.defaultStyle;
      const height = pos.height;
      const width = pos.width;
      let hasT = /t/.test(point);
      let hasB = /b/.test(point);
      let hasL = /l/.test(point);
      let hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        // 上下点，宽度固定在中间
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
        }
        // 左右点，高度固定在中间
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = hasT / 2;
        }
      }

      const style = {
        marginLeft: hasL || hasR ? "-5px" : 0,
        marginTop: hasT || hasB ? "-5px" : 0,
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor:
          point
            .split("")
            .reverse()
            .map((m) => this.directionKey[m])
            .join("") + "-resize",
      };

      return style;
    },
    /**
     * 点击后设置选中的元素为当前活跃元素
     */
    handleTopWrapperClick(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    /**
     * 鼠标选中元素拖拽事件
     */
    handleMouseDown(e) {
      // 抛出事件让父组件设置当前元素选中状态
      this.$emit("handleElementClick");

      const pos = { ...this.defaultStyle };
      let startY = e.clientY;
      let startX = e.clientX;
      let startTop = pos.top;
      let startLeft = pos.left;
      let firstTime = new Date().getTime(),
        lastTime = "";
      const move = (moveEvent) => {
        // 移动的时候,不需要向后代元素传递事件,只需要单纯的移动就行
        moveEvent.stopPropagation();
        moveEvent.preventDefault();
      };
    },
  },
};
</script>
<style lang="less" scoped>
</style>