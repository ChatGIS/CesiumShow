<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
// import EllipsoidFadeMaterialProperty from '/Material/EllipsoidFadeMaterialProperty.js' // 引入这个材质类
// import EllipsoidFadeMaterialProperty  from './MaterialDefine/EllipsoidFadeMaterialProperty.js' // 引入这个材质类
import {EllipsoidFadeMaterialProperty}  from './MaterialDefine/EllipsoidFadeMaterialProperty2.js' // 引入这个材质类


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
  addEllipsoidFade()
})

const addEllipsoidFade = () => {
  const duration = 9500
  const maxRadius = 1400
  let currentRadius = 1
  const entityEllipsoidFade = viewer.entities.add({
    id: '00001',
    position: Cesium.Cartesian3.fromDegrees(113.94443512, 22.523283005, 0),
    ellipse: {
      // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      // extrudedHeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      // height: position[2],
      // extrudedHeight: position[2], // 如果这里设置高度 那么就会直接穿透 不洒在建筑物上
      semiMajorAxis: new Cesium.CallbackProperty(function () {
        currentRadius += (1000 / duration) * 50
        if (currentRadius > maxRadius) {
          currentRadius = 1
        }
        return currentRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function (n) {
        return currentRadius
      }, false),
      material: new EllipsoidFadeMaterialProperty(
        new Cesium.Color.fromCssColorString('rgba(247, 235, 8, 1)'),
        duration
      ),
    },
  })
  viewer.zoomTo(entityEllipsoidFade)
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>