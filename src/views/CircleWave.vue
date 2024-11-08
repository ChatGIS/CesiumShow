<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import {CircleWaveMaterialProperty}  from './MaterialDefine/CircleWaveMaterialProperty.js' // 引入这个材质类


Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
let viewer
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: await Cesium.createWorldTerrainAsync()
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(117, 36, 1000000),
  })
  //   defineMaterial()
  addCircleWave()
})

const addCircleWave = () => {
  const duration = 4500
  const maxRadius = 400
  const entityCircleWave = viewer.entities.add({
    id: '00003',
    position: Cesium.Cartesian3.fromDegrees(
      113.939323425,
      22.511972427,
      0
    ),
    ellipse: {
      // height: position[2],
      semiMinorAxis: new Cesium.CallbackProperty(function() {
        return maxRadius
      }, false),
      semiMajorAxis: new Cesium.CallbackProperty(function() {
        return maxRadius
      }, false),
      material: new CircleWaveMaterialProperty({
        duration: duration,
        gradient: 0,
        color: new Cesium.Color.fromCssColorString('rgba(31, 168, 227, 0.59)'),
        count: 4,
      }),
    },
  })
  viewer.zoomTo(entityCircleWave)
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>