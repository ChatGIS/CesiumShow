<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
let viewer
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: await Cesium.createWorldTerrainAsync()
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(117, 36, 1000000),
    /* orientation: {
      heading: Cesium.Math.toRadians(161.69687),
      pitch: Cesium.Math.toRadians(-14.366),
      roll: Cesium.Math.toRadians(0)
    } */
  })
  viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([118,37, 118, 35, 116, 35, 116, 37]),
      material: Cesium.Color.withAlpha(0.9)
    }
  })
  viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(117, 36),
      label: {
        text: '字体展示',
        font: '14px Arial',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2
      }
  })
})
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>