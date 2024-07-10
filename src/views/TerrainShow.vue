<!--
 * @Author: ChatGIS ChatGIS@outlook.com
 * @Date: 2024-07-10 21:18:00
 * @LastEditors: ChatGIS ChatGIS@outlook.com
 * @LastEditTime: 2024-07-10 22:20:55
 * @FilePath: \CesiumShow\src\views\TerrainShow.vue
 * @Description: 地形数据加载展示
-->
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(async () => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.createWorldTerrainAsync()  // 在线数据加载
    // terrainProvider: await Cesium.CesiumTerrainProvider.fromUrl('/terrain/')  // 本地数据加载
  })
  viewer.scene.debugShowFramesPerSecond = true
  // 本地地形数据范围
  const entityPolylineTerrain = viewer.entities.add({
    id: 'polylineTerrain',
    name: '地形数据范围',
    show: true,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([118.000139,35.999861, 118.000139,37.000139, 
        116.999861,37.000139, 116.999861,35.999861,118.000139,35.999861]),
      width: 2,
      material: Cesium.Color.BLUE,
      clampToGround: true,  // 贴地
    }
  })
  viewer.zoomTo(entityPolylineTerrain)
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