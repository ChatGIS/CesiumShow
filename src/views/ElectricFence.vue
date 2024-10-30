<!--
 * @Author: ChatGIS ChatGIS@outlook.com
 * @Date: 2024-07-29 14:31:44
 * @LastEditors: ChatGIS ChatGIS@outlook.com
 * @LastEditTime: 2024-07-30 11:21:07
 * @FilePath: \CesiumShow\src\views\ElectricFence.vue
 * @Description: 
 参考：
 https://blog.csdn.net/qq_43474235/article/details/135736803
 https://blog.csdn.net/long535/article/details/137216887
-->
<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import DynamicWallMaterialProperty from '@/utils/DynamicWallMaterialProperty.js'
import fenceImg from '@/assets/image/fencePic.png'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
let viewer
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.createWorldTerrainAsync(),
    contextOptions: {
      requestWebgl1: true,
    },
  })
  viewer.scene.debugShowFramesPerSecond = true
  /*   viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(121.36690656734237, 31.030843226556797, 500),
    orientation: {
      heading: Cesium.Math.toRadians(161.69687),
      pitch: Cesium.Math.toRadians(-14.366),
      roll: Cesium.Math.toRadians(0)
    }
  }) */
  
  const ett = viewer.entities.add({
    name: '动态立体墙',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArray([117.154815, 31.853495, 117.181255, 31.854257, 117.182284, 31.848255, 117.184748, 31.840141, 117.180557, 31.835556, 117.180023, 31.833741, 117.166846, 31.833737, 117.155531, 31.833151, 117.154787, 31.835978, 117.151994, 31.839036, 117.150691, 31.8416, 117.151215, 31.844734, 117.154457, 31.848152, 117.154815, 31.853495]),
      maximumHeights: [100, 200, 300, 400, 500, 600, 600, 600, 600, 600, 600, 600, 600, 600],
      minimumHeights: [43.9, 49.4, 38.7, 40, 54, 51, 66.7, 44.6, 41.2, 31.2, 50.1, 53.8, 46.9, 43.9],
      material: new DynamicWallMaterialProperty(fenceImg, Cesium.Color.BLUE, 5000)
    }
  })
 
  viewer.flyTo(ett)
/* 
  let myDataSource = new Cesium.CustomDataSource('myDataSource')
  let wallPosition = [ 
    [91.18114668210865, 29.64862480141244],
    [91.18115063110764, 29.64923333583186],
    [91.18238771385506, 29.64920082670612],
    [91.18235117316942, 29.649837443984836],
    [91.18198535795231, 29.64990471360067],
    [91.18179467154341, 29.65115405224777],
    [91.17986260212876, 29.65107671722995],
    [91.17928567829874, 29.649125023468685],
    [91.18026801171452, 29.64909857433772],
    [91.18036013596532, 29.64862237211234],
    [91.18114668210865, 29.64862480141244],
  ]
  viewer.dataSources.add(myDataSource)
 
  const maximumHeights = Array(wallPosition.length).fill(3660)
  const minimumHeights = Array(wallPosition.length).fill(3600)
  const dayMaximumHeights = Array(minimumHeights.length).fill(3660)
  myDataSource.entities.add({
    id: '1',
    name: '2',
    // 是否显示
    show: true,
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArray(wallPosition.flat()),
      maximumHeights: new Cesium.CallbackProperty(() => {
        for (let i = 0; i < minimumHeights.length; i++) {
          dayMaximumHeights[i] += maximumHeights[i] * 0.0001
          if (dayMaximumHeights[i] > maximumHeights[i]) {
            dayMaximumHeights[i] = minimumHeights[i]
          }
        }
        return dayMaximumHeights
      }, false),
      minimumHeights,
      // material: new Cesium.Color(0, 1, 0, 0.8),
      material: new Cesium.ImageMaterialProperty({
        color: new Cesium.Color.fromCssColorString('rgba(21,255,255,0.9)'),
        image: fenceImg,
      }),
    },
  }) */
})
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>