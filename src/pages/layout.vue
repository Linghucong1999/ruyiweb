<template>
  <div>进来</div>
</template>

<script>
export default {
  created() {
    let res = this.$api.getUserInfo();
    res.then(item=>{
      console.log(item);
    })
  },
};
</script>

<style>
</style>