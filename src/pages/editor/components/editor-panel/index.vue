<template>
  <div class="editor-pane" ref="editorPan">
    <div class="editor-pane-inner">
      <div
        class="editor-main"
        :style="{ transform: 'scale(' + scale + ')' }"
      ></div>
    </div>
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
  data() {},
};
</script>
<style lang="less" scoped>
</style>