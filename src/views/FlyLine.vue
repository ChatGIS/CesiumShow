<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import * as turf from '@turf/turf'
import { PolylineTrailMaterialProperty }  from './MaterialDefine/PolylineTrailMaterialProperty.js'


Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
let viewer
let flyLinesEntities = []
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: await Cesium.createWorldTerrainAsync()
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(117, 36, 1000000),
  })
  //   defineMaterial()
  addFlyLines()
})

const addFlyLines = () => {
  let points = turf.randomPoint(300, {
    bbox: [113.8918, 22.4818, 113.96858, 22.5692],
  })
  let features = points.features
  let point
  let startPosition
  let endPosition
  features.forEach((item) => {
    point = item.geometry.coordinates
    startPosition = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
    endPosition = Cesium.Cartesian3.fromDegrees(
      point[0],
      point[1],
      3000 * Math.random()
    )
    flyLinesEntities.push(viewer.entities.add({
      polyline: {
        positions: [startPosition, endPosition],
        width: 2,
        material: new PolylineTrailMaterialProperty({
          speed: 6 * Math.random(),
          color: new Cesium.Color.fromCssColorString('#A932B4'),
          percent: 0.1, // 尾巴拖多少长
          gradient: 0.1, // 变化率
        }),
      },
    })
    )
  })
  viewer.zoomTo(flyLinesEntities[1])
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>