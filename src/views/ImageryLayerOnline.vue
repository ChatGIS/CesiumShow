<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

let viewer
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    // baseLayer: Cesium.ImageryLayer.fromWorldImagery()
    baseLayer: new Cesium.ImageryLayer(
      new Cesium.UrlTemplateImageryProvider({
        url: 'http://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
      })/* ,
      {
        brightness: 0.6, // 亮度
        contrast: 1.8, // 对比度
        hue: 1, // 色相
        saturation: 0.0, // 饱和度
        gamma: 0.3 // 伽马值
      } */
    )
  })
  // 高德影像图
  /* const baseLayer = new UrlTemplateImageryProvider({
    url: 'http://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
    credit: '© Gaode Map'
  }) */
  // const baseLayer = viewer.imageryLayers.get(0)
  // console.log(viewer.imageryLayers.length, baseLayer, 'CesiumShow-11-21 11:09:24测试打印内容m')
  
  // baseLayer.brightness = 0.6 // 亮度
  // baseLayer.contrast = 1.8 // 对比度
  // baseLayer.hue = 1 // 色相
  // baseLayer.saturation = 0.0 // 饱和度
  // baseLayer.gamma = 0.3 // 伽马值
  // viewer.imageryLayers.addImageryProvider(baseLayer)

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

  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(120, 37, 1000000)
  // })
  // viewer.scene.debugShowFramesPerSecond = true

  // baseLayer.invertColor = 1
  // baseLayer.filterRGB = colorRgb('#4e70a6')
  // changeImageryProviderColors(baseLayer)
})
function changeImageryProviderColors(baseLayer){
  // 更改底图的着色器 代码
  const baseFragmentShaderSource =
      viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
  for (let i = 0; i < baseFragmentShaderSource.length; i++) {
    const oneSource = baseFragmentShaderSource[i]
    // 格式必须一致 不能多有空格 且保持版本一致性
    const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    if (baseLayer.invertColor) {
      strT += `
          color.r = 1.0 - color.r;
          color.g = 1.0 - color.g;
          color.b = 1.0 - color.b;
        `
      strT += `
        color.r = color.r * ${baseLayer.filterRGB[0]}.0/255.0;
        color.g = color.g * ${baseLayer.filterRGB[1]}.0/255.0;
        color.b = color.b * ${baseLayer.filterRGB[2]}.0/255.0;
        `
    }

    if (oneSource.indexOf(strS) !== -1) {
      baseFragmentShaderSource[i] = baseFragmentShaderSource[i].replace(
        strS,
        strT
      )
    }
  }
}
// 输入16进制颜色值 转 rgb 的数组值 255
function colorRgb(inColor) {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = inColor.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange
  }
  return []
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