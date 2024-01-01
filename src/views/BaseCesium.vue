<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:35:00
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-10-19 10:52:40
 * @FilePath: \CesiumShow\src\views\BaseCesium.vue
 * @Description: 
-->
<script setup>
import { Viewer, Ion } from 'cesium'
import { onMounted } from 'vue'

Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
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
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>