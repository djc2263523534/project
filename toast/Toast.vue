<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration = 1000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style  scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 10px;
  color: #fff;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>