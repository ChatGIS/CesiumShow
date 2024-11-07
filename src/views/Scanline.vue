<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
// import EllipsoidFadeMaterialProperty from '/Material/EllipsoidFadeMaterialProperty.js' // 引入这个材质类
// import EllipsoidFadeMaterialProperty  from './MaterialDefine/EllipsoidFadeMaterialProperty.js' // 引入这个材质类
import {EllipsoidFadeMaterialProperty}  from './MaterialDefine/EllipsoidFadeMaterialProperty2.js' // 引入这个材质类
import {ScanlineMaterialProperty}  from './MaterialDefine/ScanlineMaterialProperty.js' // 引入这个材质类


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
  addScanline()
})

const addScanline = () => {
  const duration = 6500
  const maxRadius = 1200
  const entityEllipsoidFade = viewer.entities.add({
    id: '00001',
    position: Cesium.Cartesian3.fromDegrees(113.922744751, 22.536218643, 0),
    ellipse: {
      semiMajorAxis: new Cesium.CallbackProperty(function () {
        return maxRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function () {
        return maxRadius
      }, false),
      material: new ScanlineMaterialProperty(
        new Cesium.Color.fromCssColorString('rgba(206, 19, 116, 0.91)'),
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