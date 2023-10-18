<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:35:00
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-10-18 17:40:09
 * @FilePath: \CesiumShow\src\views\BaseCesium.vue
 * @Description: 
-->
<script setup>
import { Viewer } from 'cesium'
import { onMounted } from 'vue'

onMounted(() => {
    const viewer = new Viewer('cesiumContainer',{
        // scene3DOnly: true,
        // selectionIndicator: false
    })
    viewer.scene.debugShowFramesPerSecond = true
})

</script>

<template>
    <div id="cesiumContainer"></div>
</template>

<style scoped>

</style>