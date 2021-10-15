<template>
  <div>
    <h3>我是通过component is 渲染的组件</h3>
    <slot name="main" :message="{ name: '哈哈', age: 99 }">我是默认</slot>
    <slot name="center"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>