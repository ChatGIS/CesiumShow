<script setup>
import { Viewer, Ion, UrlTemplateImageryProvider, Cartesian3 } from 'cesium'
import { onMounted } from 'vue'

Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  const viewer = new Viewer('cesiumContainer', {
    baseLayerPicker: false,
    imageryProvider: false,
  })
  // 高德影像图
  const imageryProviderGD = new UrlTemplateImageryProvider({
    url: 'http://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
    credit: '© Gaode Map'
  })
  viewer.imageryLayers.addImageryProvider(imageryProviderGD)

  // ArcGIS，有问题
  /* const imageryProviderArcGIS = new ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  }) */
  // viewer.imageryLayers.addImageryProvider(imageryProviderArcGIS);

  // OSM瓦片图，使用OpenStreetMapImageryProvider接口
  /* const imageryProviderOSM = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org"
  }) */
  // viewer.imageryLayers.addImageryProvider(imageryProviderOSM);

  // OSM瓦片图，使用UrlTemplateImageryProvider接口
  /* const imageryProviderUrlOSM = new UrlTemplateImageryProvider({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: ['a', 'b', 'c']
  }) */
  // viewer.imageryLayers.addImageryProvider(imageryProviderUrlOSM);

  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(120, 37, 1000000)
  })
  viewer.scene.debugShowFramesPerSecond = true
})
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