<template>
  <div class="about">
    <h1>我是About组件</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.query);
  },
};
</script>
