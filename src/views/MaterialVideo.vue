<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:35:00
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-18 19:27:23
 * @FilePath: \CesiumShow\src\views\MaterialVideo.vue
 * @Description: 
-->
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer',{
    // scene3DOnly: true,
    // selectionIndicator: false
  })
  viewer.scene.debugShowFramesPerSecond = true

  const videoElement = document.getElementById('myVideo')
  new Cesium.VideoSynchronizer({
    clock: viewer.clock,
    element: videoElement
  })
  viewer.clock.shouldAnimate = true

  const entityVideo = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(104, 39, 2200),
    ellipsoid: {
      radii: new Cesium.Cartesian3(1000, 1000, 1000),
      material: videoElement,
    },
  })

  viewer.trackedEntity = entityVideo

  const isRepeat = true
  entityVideo.ellipsoid.material.repeat = new Cesium.CallbackProperty(
    res => {
      if(isRepeat) {
        res.x = 6
        res.y = 6
      } else {
        res.x = 1
        res.y = 1
      }
      return res
    }, false
  )
})

</script>

<template>
    <div id="cesiumContainer"></div>
    <video id="myVideo" muted="true" autoplay="true" loop="true" style="display: none">
        <source src="/material/jiqiren.mp4" type="video/mp4">
    </video>
</template>

<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>