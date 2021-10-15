<template>
  <div>
    <h3>我是Home组件</h3>
    <component is="IsConponent">
      <!-- <div slot="main">我传了</div>
      <div slot="center">我是中间的</div> -->
      <template #main="scope">
        <div>{{ scope.message }}</div>
        <div>{{ scope.message.name }}</div>
      </template>
    </component>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import IsConponent from "./IsConponent.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    IsConponent,
  },
};
</script>
