<template>
  <div class="header">
    <h3>头部</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { Get } from "../../../network/index";
export default {
  name: "HomeHeader",
  data() {
    return {
      message: "",
    };
  },
  async created() {
    // const { data: res } = await Get("api");
    // this.message = res.data.message;
  },
};
</script>

<style lang="scss" scoped>
</style>