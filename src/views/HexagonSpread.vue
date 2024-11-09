<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import { HexagonSpreadMaterialProperty }  from './MaterialDefine/HexagonSpreadMaterialProperty.js' // 引入这个材质类


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
  addHexagonSpread()
})

const addHexagonSpread = () => {
  const duration = 7500
  const maxRadius = 800
  let currentRadius = 1
  const entityHexagonSpread = viewer.entities.add({
    id: '00004',
    position: Cesium.Cartesian3.fromDegrees(113.91519165, 22.513103485, 0),
    ellipse: {
      semiMajorAxis: new Cesium.CallbackProperty(function() {
        currentRadius += (1000 / duration) * 50
        if (currentRadius > maxRadius) {
          currentRadius = 1
        }
        return currentRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function() {
        return currentRadius
      }, false),
      material: new HexagonSpreadMaterialProperty(
        new Cesium.Color.fromCssColorString('rgba(0, 153, 191, 1)')
      ),
    },
  })
  viewer.zoomTo(entityHexagonSpread)
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>