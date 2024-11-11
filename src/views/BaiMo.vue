<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import {EllipsoidFadeMaterialProperty}  from './MaterialDefine/EllipsoidFadeMaterialProperty2.js'
import {ScanlineMaterialProperty}  from './MaterialDefine/ScanlineMaterialProperty.js'
import {CircleWaveMaterialProperty}  from './MaterialDefine/CircleWaveMaterialProperty.js'
import { HexagonSpreadMaterialProperty }  from './MaterialDefine/HexagonSpreadMaterialProperty.js'
import { PolylineTrailMaterialProperty }  from './MaterialDefine/PolylineTrailMaterialProperty.js'
import { Spriteline1MaterialProperty }  from './MaterialDefine/Spriteline1MaterialProperty.js'

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
let viewer
let linkA
let linkB
let canvasCollection
let rotation = 0
let flyLinesEntities = []
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: await Cesium.createWorldTerrainAsync()
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(117, 36, 1000000),
    /* orientation: {
      heading: Cesium.Math.toRadians(161.69687),
      pitch: Cesium.Math.toRadians(-14.366),
      roll: Cesium.Math.toRadians(0)
    } */
  })
  // 因为画布内变化CallbackProperty监控不到，所以用两个画布切换的方式达成效果
  linkA = document.createElement('canvas')
  linkA.setAttribute('width', '800px')
  linkA.setAttribute('height', '800px')
  linkA.setAttribute('id', 'canvas-a')
  linkB = document.createElement('canvas')
  linkB.setAttribute('width', '800px')
  linkB.setAttribute('height', '800px')
  linkB.setAttribute('id', 'canvas-b')
  canvasCollection = linkA
  addOne3dTitleset()
  addRaderScan()
  addEllipsoidFade()
  addScanline()
  addCircleWave()
  addHexagonSpread()
  addFlyLines()
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
    // viewer.zoomTo(data.entities.values[0])
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
    // viewer.zoomTo(data.entities.values[0])
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
    // viewer.zoomTo(data.entities.values[0])
  })
}
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
  // viewer.zoomTo(flyLinesEntities[1])
}
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
  // viewer.zoomTo(entityHexagonSpread)
}
const addCircleWave = () => {
  const duration = 4500
  const maxRadius = 400
  const entityCircleWave = viewer.entities.add({
    id: '00003',
    position: Cesium.Cartesian3.fromDegrees(
      113.939323425,
      22.511972427,
      0
    ),
    ellipse: {
      // height: position[2],
      semiMinorAxis: new Cesium.CallbackProperty(function() {
        return maxRadius
      }, false),
      semiMajorAxis: new Cesium.CallbackProperty(function() {
        return maxRadius
      }, false),
      material: new CircleWaveMaterialProperty({
        duration: duration,
        gradient: 0,
        color: new Cesium.Color.fromCssColorString('rgba(31, 168, 227, 0.59)'),
        count: 4,
      }),
    },
  })
  // viewer.zoomTo(entityCircleWave)
}
const addScanline = () => {
  const duration = 6500
  const maxRadius = 1200
  const entityScanline = viewer.entities.add({
    id: '00002',
    position: Cesium.Cartesian3.fromDegrees(113.922744751, 22.536218643, 0),
    ellipse: {
      semiMajorAxis: new Cesium.CallbackProperty(function () {
        return maxRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function () {
        return maxRadius
      }, false),
      material: new ScanlineMaterialProperty(
        new Cesium.Color.fromCssColorString('rgba(206, 19, 116, 0.91)'),
        duration
      ),
    },
  })
  // viewer.zoomTo(entityScanline)
}
const addEllipsoidFade = () => {
  const duration = 9500
  const maxRadius = 1400
  let currentRadius = 1
  const entityEllipsoidFade = viewer.entities.add({
    id: '00001',
    position: Cesium.Cartesian3.fromDegrees(113.94443512, 22.523283005, 0),
    ellipse: {
      // heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      // extrudedHeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      // height: position[2],
      // extrudedHeight: position[2], // 如果这里设置高度 那么就会直接穿透 不洒在建筑物上
      semiMajorAxis: new Cesium.CallbackProperty(function () {
        currentRadius += (1000 / duration) * 50
        if (currentRadius > maxRadius) {
          currentRadius = 1
        }
        return currentRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function (n) {
        return currentRadius
      }, false),
      material: new EllipsoidFadeMaterialProperty(
        new Cesium.Color.fromCssColorString('rgba(247, 235, 8, 1)'),
        duration
      ),
    },
  })
  // viewer.zoomTo(entityEllipsoidFade)
}
const addRaderScan = () => {
  viewer.entities.add({
    id: 'rader-scan00001',
    position: Cesium.Cartesian3.fromDegrees(
      113.928703308,
      22.505599976,
      0
    ),
    ellipse: {
      semiMinorAxis: 2000,
      semiMajorAxis: 2000,
      rotation: new Cesium.CallbackProperty(() => {
        rotation -= -0.01 || -0.02
        return rotation
      }, false),
      stRotation: new Cesium.CallbackProperty(() => {
        rotation -= -0.01 || -0.02
        return rotation
      }, false),
      material: new Cesium.ImageMaterialProperty({
        image: new Cesium.CallbackProperty(() => {
          canvasCollection =
              canvasCollection.id === 'canvas-a' ? linkB : linkA // 切换画布
          let context = canvasCollection.getContext('2d')
          context.clearRect(0, 0, canvasCollection.width, canvasCollection.height) // 清空画布
          let scanColor0 = 'rgba(187, 0, 255, 1)' || 'rgba(255,0,0,1)'
          let scanColorTmp = scanColor0.split(',')
          scanColorTmp[3] = '0)'
          let scanColor1 = scanColorTmp.join()
          let grd = context.createLinearGradient(
            175,
            100,
            canvasCollection.width,
            canvasCollection.height / 2
          )
          grd.addColorStop(0, scanColor0)
          grd.addColorStop(1, scanColor1)
          context.fillStyle = grd
          context.beginPath()
          context.moveTo(400, 400)
          context.arc(
            400,
            400,
            400,
            (-30 / 180) * Math.PI,
            (0 / 180) * Math.PI
          )
          context.fill()
          return canvasCollection
        }, false),
        transparent: true,
      }),
    },
  }) 
}
const addOne3dTitleset = async () => {
  console.log('调用到了加载模型', 'CesiumShow-11-07 15:04:50测试打印内容m')

  const modalOne = await Cesium.Cesium3DTileset.fromUrl(
    'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns2/tileset.json',
    {
      shadows: 4,
      maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
      maximumNumberOfLoadedTiles: 1000, // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
      // debugShowBoundingVolume: true,
      // debugColorizeTiles: true,
      // debugShowUrl: true,
      // debugShowContentBoundingVolume: true,
      // debugShowViewerRequestVolume: true,
      // debugShowRenderingStatistics: true,
      // debugShowMemoryUsage: true,
    })
  viewer.scene.primitives.add(modalOne)
  viewer.zoomTo(modalOne)
  /* modalOne.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [['true', `color('rgba(255, 255, 255, 1)')`]],
    }
  }) */
  let customShader = new Cesium.CustomShader({ 
    //片元着色器
    // material.diffuse = vec3(0.0, 1.0-positionMC.y*0.005, 1.0-positionMC.y*0.0015);
    fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            vec3 positionMC = fsInput.attributes.positionMC;
            material.diffuse = vec3(0.87, 0.09, 0.95);

            float _baseHeight = 180.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
            float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
            float _glowRange = 120.0; // 光环的移动范围(高度)

            float vtxf_height = fsInput.attributes.positionMC.y - _baseHeight;
            float vtxf_a11 = fract(czm_frameNumber / 360.0) * 3.14159265 * 2.0; //此处括号内分母为移动速度
            float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
            material.diffuse *= vec3(vtxf_a12, vtxf_a12, vtxf_a12);

            float vtxf_a13 = fract(czm_frameNumber / 360.0); //此处括号内分母为移动速度，数值越大，速度越慢
            float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
            vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
            float vtxf_diff = step(0.01, abs(vtxf_h - vtxf_a13)); // 0.1 为高亮光条的范围（粗细）
            material.diffuse += material.diffuse * (1.0 - vtxf_diff);
        }`
  })
  const customShader01 = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: `
          void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec3 positionMC = fsInput.attributes.positionMC;
              material.diffuse = vec3(0.87, 0.09, 0.95);

              float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
              float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
              float _glowRange = 300.0; // 光环的移动范围(高度)
              float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
              float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
              float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
              material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
              float vtxf_a13 = fract(czm_frameNumber / 360.0);
              float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
              vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
              float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
              material.diffuse += material.diffuse * (1.0 - vtxf_diff);
          }    
      `,
  })
  modalOne.customShader = customShader01
}
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>