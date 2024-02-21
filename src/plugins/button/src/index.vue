<template>
  <div class="ruyi-button">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: "RuyiButton",
  props: {
    text: {
      type: String,
      default: "按钮",
    },
  },
};
</script>