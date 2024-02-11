<template>
  <div class="components-contrl-bar">
    <div class="butto-item scale-wrapper">
      <span class="scale-btn" @click="updateScale('reduce')">
        <i class="el-icon-zoom-out"></i>
      </span>

      <span class="scale-input"
        >{{ parseFloat(scaleValue * 100).toFixed() }}%</span
      >

      <span class="scale-btn" @click="updateScale('plus')">
        <i class="el-icon-zoom-in"></i>
      </span>
    </div>

    <div class="button-item"></div>
  </div>
</template>
<script>
export default {
  props: {
    scale: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      scaleValue: 1, //画板缩放
    };
  },
  created() {
    this.scaleValue = this.scale;
  },
  methods: {
    /**
     * 更新面板大小
     */
    updateScale(type, value) {
      if (type === "plus") {
        this.scaleValue =
          this.scaleValue + (value || 0.1) > 2
            ? 2
            : this.scaleValue + (value || 0.1);
      } else if (type === "reduce") {
        this.scaleValue =
          this.scaleValue - (value || 0.1) > 0.5
            ? this.scaleValue - (value || 0.1)
            : 0.5;
      } else if (type === "reset") {
        this.scaleValue = value || 1;
      }
      //告诉父组件更新scale值
      this.$emit("update:scale", this.scaleValue);
    },
  },
};
</script>
<style lang="less" scoped>
</style>