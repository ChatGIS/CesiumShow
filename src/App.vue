<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:18:42
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-10-18 17:36:52
 * @FilePath: \CesiumShow\src\App.vue
 * @Description: 
-->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView></RouterView>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
