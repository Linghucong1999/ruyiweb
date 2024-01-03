<template>
  <div class="password-step">
    <Step v-if="active === 0" @next="stepNext"></Step>
  </div>
</template>

<script>
import Step from "./step/step.vue";
export default {
  components: {
    Step,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods:{
    stepNext(value){
      this.active=value;
    }
  }
};
</script>
<style lang="less" scoped>
</style>