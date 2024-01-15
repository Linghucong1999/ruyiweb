<template>
  <div class="change-password inline-block">
    <div class="inlie-block" @click="show">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    show() {},
  },
};
</script>
<style lang="less" scoped>
</style>