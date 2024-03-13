<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:35:00
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-14 15:40:35
 * @FilePath: \CesiumShow\src\views\DialogShow.vue
 * @Description: 
-->
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import imageShop from '@/assets/image/shop.png'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
const divDialog = document.createElement('div')
let viewer = null

onMounted(() => {
  viewer = new Cesium.Viewer('cesiumContainer',{
    // scene3DOnly: true,
    // selectionIndicator: false
  })
  viewer.scene.debugShowFramesPerSecond = true

  // 广告牌实体
  const entityBillboard = new Cesium.Entity({
    id:'12321321', 
    name: '北京西路测试点', 
    type: '固定枪机', 
    state: '在线',
    position: Cesium.Cartesian3.fromDegrees(117.023501, 36.675143),
    billboard: {
      image: imageShop,
      scale: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    }
  })
  viewer.entities.add(entityBillboard)

  viewer.flyTo(entityBillboard)

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(event => {
    const pick = viewer.scene.pick(event.position)
    if(Cesium.defined(pick)) {
      console.log(pick, '左键点击', event.position)
      showDialog(pick.id)
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})
const showDialog = data => {
  divDialog.id = data.id
  divDialog.style.position = 'absolute'
  divDialog.width = '300px'
  divDialog.height = '30px'
  let HTMLTable = `
            <div class='popup'>
              <h3>${data.name}</h3>
              <hr/>
              <h4>所属网格：山大路网格</h4>
            </div>
        `
  divDialog.innerHTML = HTMLTable
  viewer.cesiumWidget.container.appendChild(divDialog)
  let gisPosition = data.position._value
  viewer.scene.postRender.addEventListener(() => {
    const canvasHeight = viewer.scene.canvas.height
    const windowPosition = new Cesium.Cartesian2()
    Cesium.SceneTransforms.wgs84ToWindowCoordinates(
      viewer.scene,
      gisPosition,
      windowPosition
    )
    divDialog.style.bottom = canvasHeight - windowPosition.y +50 + 'px'
    const elWidth = divDialog.offsetWidth
    divDialog.style.left = windowPosition.x - elWidth / 2 + 'px'
  })
}
</script>

<template>
    <div id="cesiumContainer"></div>
</template>

<style>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
.popup {
  background: #015478;
  color: white;
  height: 200px;
  width: 300px;
}
</style>