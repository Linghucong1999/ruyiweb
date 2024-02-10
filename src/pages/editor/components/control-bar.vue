<template>
  <div class="components-contrl-bar">
    <div class="butto-item scale-wrapper">
      <span class="scale-btn">
        <i class="el-icon-zoom-out"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scaleValue: 1, //画板缩放
    };
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
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>