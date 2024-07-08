<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer')
  viewer.scene.debugShowFramesPerSecond = true

  const clouds = viewer.scene.primitives.add(
    new Cesium.CloudCollection({
      noiseDetail: 16.0
    })
  )
  const cloud = clouds.add({
    position: Cesium.Cartesian3.fromDegrees(114, 30, 100),
    scale: new Cesium.Cartesian2(25,12),
    slice: 0.36,
    brightness: 1
  })

  viewer.camera.lookAt(
    Cesium.Cartesian3.fromDegrees(114, 30, 100),
    new Cesium.Cartesian3(30, 30, -10)
  )
})
</script>

<template>
    <div id="cesiumContainer">
        <el-card style="max-width: 480px">
            <el-slider v-model="valX" show-input size="small" />
            <el-slider v-model="valY" show-input size="small" />
            <el-slider v-model="valBrightness" show-input size="small" />
        </el-card>
    </div>
</template>

<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
.el-card {
    position: absolute;
    min-width: 600px;
    top: 113px;
    right: 11px;
    z-index: 1;
}
</style>