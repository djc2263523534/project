<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ path: 'about', query: { id: '06' } }"
      >About</router-link
    >
  </div>
  <router-view />
</template>
<script>
export default {};
</script>

<style>
</style>
