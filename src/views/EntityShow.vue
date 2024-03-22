<script setup>
import * as Cesium from 'cesium'
import { Viewer, Ion, Entity, Cartesian3, HorizontalOrigin, VerticalOrigin } from 'cesium'
import { onMounted } from 'vue'
import imageShop from '@/assets/image/shop.png'

Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  const viewer = new Viewer('cesiumContainer')
  viewer.scene.debugShowFramesPerSecond = true
  /* // 点实体
  const entityPoint = new Entity({
    id: 'point',
    name: '点实体',
    show: true,
    position: Cartesian3.fromDegrees(117.024,36.675143),
    point: {
      color: Cesium.Color.RED,
      pixelSize: 50,
    }
  })
  viewer.entities.add(entityPoint)
  viewer.zoomTo(entityPoint)
  // 线实体
  const entityPolyline = viewer.entities.add({
    id: 'polyline',
    name: '线实体',
    show: true,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([117.0241,36.6751, 117.0242,36.6754, 117.0243,36.6752]),
      width: 10,
      material: Cesium.Color.BLUE,
    }
  })
  viewer.zoomTo(entityPolyline)
  // 面实体
  const entityPolygon = viewer.entities.add({
    id: 'polygon',
    name: '面实体',
    show: true,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([117.0231, 36.6751, 117.0236, 36.6751, 117.0236, 36.6756, 117.0231, 36.6756 ]),
      material: Cesium.Color.RED.withAlpha(0.4),
    }
  })
  viewer.zoomTo(entityPolygon)  
  // 矩形实体
  const entityRectangle = viewer.entities.add({
    id: 'rectangle',
    name: '矩形',
    show: true,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(117.0231, 36.6759, 117.0238, 36.6765),
      material: Cesium.Color.GREEN.withAlpha(0.6),
    }
  })
  viewer.zoomTo(entityRectangle)*/
  // 椭圆实体
  const entityEllipse = viewer.entities.add({
    id: 'ellipse',
    name: '椭圆实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.022, 36.6759),
    ellipse: {
      semiMinorAxis: 25,  // 短半轴长度
      semiMajorAxis: 40,  // 长半轴长度
      material: Cesium.Color.BLUEVIOLET.withAlpha(0.8),
    }
  })
  viewer.zoomTo(entityEllipse)
  // 圆柱体实体
  /* const entityCylinder = new Cesium.Entity({
    id: 'cylinder',
    name: '圆柱体实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.023501,36.672143),
    cylinder: {
      length: 400,
      topRadius: 100,
      bottomRadius: 200,
      material: Cesium.Color.GREEN.withAlpha(0.8),
      outline: true,
      outlineColor: Cesium.Color.DARKGREEN,
    }
  })
  viewer.entities.add(entityCylinder)
  // 走廊实体
  const entityCorridor = new Cesium.Entity({
    id: 'corridor',
    name: '走廊实体',
    show: true,
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        117.024,36.675143,
        117.023502,36.672145,
        117.021,36.676
      ]),
      width: 20,
      material: Cesium.Color.YELLOW.withAlpha(0.5),
    }
  })
  viewer.entities.add(entityCorridor)
  // 墙实体
  const entityWall = new Cesium.Entity({
    id: 'wall',
    name: '墙实体',
    show: true,
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        117.01188,36.67698, 100,
        117.00990,36.67432, 100,
        117.01083,36.66381, 100,
        117.01201,36.66148, 200,
        117.02847,36.66223, 100,
        117.02851,36.66579, 100,
        117.03033,36.66761, 100,
        117.03088,36.67366, 100,
        117.02868,36.67787, 100,
        117.01188,36.67698, 100
      ]),
      material: Cesium.Color.GREEN,
    }
  })
  viewer.entities.add(entityWall)
  // 方盒实体
  const entityBox = new Cesium.Entity({
    id: 'box',
    name: '方盒实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.028438, 36.671083, 500),
    box: {
      dimensions: new Cesium.Cartesian3(400, 300, 800),  // 长,宽,高
      material: Cesium.Color.BLUE,
    }
  })
  viewer.entities.add(entityBox)
  // 椭球体实体
  const entityEllipsoid = new Cesium.Entity({
    id: 'ellipsoid',
    name: '椭球体实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.014318, 36.6731802, 500),
    ellipsoid: {
      radii: new Cesium.Cartesian3(200, 200, 700),  // X轴、Y轴、Z轴半径
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
    }
  })
  viewer.entities.add(entityEllipsoid)
  // 模型实体
  const degree = 60  // 度数
  const heading = Cesium.Math.toRadians(degree)  // 模型航向（围绕负Z轴）
  const pitch = 0  // 俯仰角（围绕负Y轴）
  const roll = 0  // 翻滚角（围绕正X轴）
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const entityModel = new Cesium.Entity({
    id: 'model',
    name: '模型实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.023501, 36.675143, 200),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.
      Cartesian3.fromDegrees(117.023501, 36.675143, 200), hpr),
    model: {
      uri: '/model/CesiumPlane.glb',  // 此处是uri，不是url
      minimumPixelSize: 1,
      maximumScale: 500,
      scale: 5,
    }
  })
  viewer.entities.add(entityModel)
  // 广告牌实体
  const entityBillboard = new Entity({
    position: Cartesian3.fromDegrees(117.023501, 36.675143),
    billboard: {
      image: imageShop,
      scale: 3,
      horizontalOrigin: HorizontalOrigin.CENTER,
      verticalOrigin: VerticalOrigin.BOTTOM,
    }
  })
  viewer.entities.add(entityBillboard)
  // 聚焦实体
  viewer.flyTo(entityModel) */
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