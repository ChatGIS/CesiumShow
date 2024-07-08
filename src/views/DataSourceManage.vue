<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
let dataSource = new Cesium.CustomDataSource('myDataSource')
let viewer
onMounted(() => {
  viewer = new Cesium.Viewer('cesiumContainer')
  viewer.scene.debugShowFramesPerSecond = true
  addData()
})
const addData = () => {
  viewer.dataSources.add(dataSource)
  dataSource.entities.add({
    id: 'polygon',
    name: '面实体',
    show: true,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([10.0231, 0.6751, 117.0236, 36.6751, 117.0236, 36.6756, 10.0231, 36.6756]),
      material: Cesium.Color.RED,
      extrudedHeight: 100,
    }
  })
}

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