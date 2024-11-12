<script setup>
import * as Cesium from 'cesium'
import { Viewer, Ion } from 'cesium'
import { onMounted } from 'vue'

let viewer
Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  viewer = new Viewer('cesiumContainer')
  viewer.scene.debugShowFramesPerSecond = true
  showModel1()
  showModel2()
  showModel3()
})
const showModel1 = () => {
  // 模型实体
  const degree = 60  // 度数
  const heading = Cesium.Math.toRadians(degree)  // 模型航向（围绕负Z轴）
  const pitch = 0  // 俯仰角（围绕负Y轴）
  const roll = 0  // 翻滚角（围绕正X轴）
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const entityModel = viewer.entities.add({
    id: 'model',
    name: '模型实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(113.93321990966797, 22.517576217651367, 800),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.
      Cartesian3.fromDegrees(117.023501, 36.675143, 200), hpr),
    model: {
      uri: '/model/CesiumPlane.glb',  // 此处是uri，不是url
      minimumPixelSize: 1,
      maximumScale: 500,
      scale: 5,
    }
  })
  viewer.zoomTo(entityModel)
}
const showModel2 = async () => {
  let position = Cesium.Cartesian3.fromDegrees(113.93321990966797, 22.517576217651367, 800)
  let hpr = new Cesium.HeadingPitchRoll(
    Cesium.Math.toRadians(3.76),
    Cesium.Math.toRadians(0),
    Cesium.Math.toRadians(0)
  )
  let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    position,
    hpr
  )

  Cesium.Model.fromGltfAsync({
    id: 'model0001',
    url: 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/model/pyramid.glb',
    scale: 200,
    modelMatrix: modelMatrix,
    color: new Cesium.Color.fromCssColorString('rgba(0,255,255,0.5)'),
    colorBlendMode: Cesium.ColorBlendMode.REPLACE,
    maximumScale: 5000,
    minimumPixelSize: 20,
    scene: viewer.scene,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
  }).then(model => {
    model.heading = Cesium.Math.toRadians(3.76)
    viewer.scene.primitives.add(model)
    setInterval(() => {
      model.heading += Cesium.Math.toRadians(6)
      model.modelMatrix = changeModelMatrix(model)
    }, 50)
  }
  )
}
const changeModelMatrix = (model) => {
  const pitch = 0
  const roll = 0
  console.log('model', model, model.heading)
  const hpr = new Cesium.HeadingPitchRoll(model.heading, pitch, roll)

  const position = Cesium.Cartesian3.fromDegrees(
    113.93321990966797, 22.517576217651367, 800
  )
  const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    position,
    hpr
  )
  return modelMatrix
}
const showModel3 = () => {
  let position = Cesium.Cartesian3.fromDegrees(113.9462890625, 22.5458984375, 0)
  let hpr = new Cesium.HeadingPitchRoll(
    Cesium.Math.toRadians(1.54),
    Cesium.Math.toRadians(0),
    Cesium.Math.toRadians(0)
  )
  let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    position,
    hpr
  )

  Cesium.Model.fromGltfAsync({
    id: 'model0002',
    url: 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/model/2099city/scene.gltf',
    scale: 0.0128,
    modelMatrix: modelMatrix,
    color: new Cesium.Color.fromCssColorString('rgba(255, 255, 255, 1)'),
    colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
    maximumScale: 5000,
    minimumPixelSize: 20,
    scene: viewer.scene,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
  }).then(model => {
    model.heading = Cesium.Math.toRadians(1.54)
    viewer.scene.primitives.add(model)
  }
  )
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