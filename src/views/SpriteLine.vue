<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import { Spriteline1MaterialProperty }  from './MaterialDefine/Spriteline1MaterialProperty.js'


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
  addSpriteLine1()
  addSpriteLine2()
  addSpriteLine3()
})

const addSpriteLine1 = () => {
  let promise = Cesium.GeoJsonDataSource.load('https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/geojson/nanshan-road1.geojson')
  promise.then((data) => {
    viewer.dataSources.add(data)
    let roadData = data.entities.values
    roadData.forEach((item) => {
      item.polyline.width = 1.6
      item.polyline.material = new Spriteline1MaterialProperty(3600, 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/pic/spriteline1.png')
    })
    viewer.zoomTo(data.entities.values[0])
  })
}
const addSpriteLine2 = () => {
  let promise = Cesium.GeoJsonDataSource.load('https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/geojson/nanshan-road2.geojson')
  promise.then((data) => {
    viewer.dataSources.add(data)
    let roadData = data.entities.values
    roadData.forEach((item) => {
      item.polyline.width = 1.5
      item.polyline.material = new Spriteline1MaterialProperty(600, 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/pic/spriteline2.png')
    })
    viewer.zoomTo(data.entities.values[0])
  })
}
const addSpriteLine3 = () => {
  let promise = Cesium.GeoJsonDataSource.load('https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/geojson/nanshan-road3.geojson')
  promise.then((data) => {
    viewer.dataSources.add(data)
    let roadData = data.entities.values
    roadData.forEach((item) => {
      item.polyline.width = 1.2
      item.polyline.material = new Spriteline1MaterialProperty(2000, 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/pic/spriteline3.png')
    })
    viewer.zoomTo(data.entities.values[0])
  })
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>