<template>
  <div class="home">
    <home-header></home-header>
    <h3>{{ $store.getters.password }}</h3>
    <button @click="getInfo">提交</button>
  </div>
</template>

<script>
import HomeHeader from "./pages/HomeHeader.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HomeHeader,
  },
  data() {
    return {
      message: "我是参数",
    };
  },
  methods: {
    ...mapMutations("user", ["GET_INFO"]),
    ...mapState({
      name: (state) => state.user.name,
    }),
    getInfo() {
      this.GET_INFO(this.message);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>