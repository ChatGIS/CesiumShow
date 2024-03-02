<script setup>
import * as Cesium from 'cesium'
import { Viewer, Ion, Entity } from 'cesium'
import { onMounted } from 'vue'
// import imageShop from '../assets/image/shop.png'

Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(async () => {
  const viewer = new Viewer('cesiumContainer',{
    terrainProvider: await Cesium.createWorldTerrainAsync()
    // scene3DOnly: true,
    // selectionIndicator: false
  })
  viewer.scene.debugShowFramesPerSecond = true
  // 贴地点实体
  const entityPointTerrain = new Entity({
    id: 'pointTerrain',
    name: '贴地点实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.03035197415107,36.63717886),
    point: {
      color: Cesium.Color.BLUE,
      pixelSize: 20,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,  // 贴地
    }
  })
  viewer.entities.add(entityPointTerrain)
  // 非贴地点实体
  const entityPoint = new Entity({
    id: 'point',
    name: '点实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.03035197415107,36.63717886),
    point: {
      color: Cesium.Color.RED,
      pixelSize: 20,
      // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,  // 贴地
    }
  })
  viewer.entities.add(entityPoint)
  // 贴地线实体
  const entityPolylineTerrain = new Entity({
    id: 'polylineTerrain',
    name: '贴地线实体',
    show: true,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([117.02969, 36.642845, 117.031047, 36.63785]),
      width: 10,
      material: Cesium.Color.BLUE,
      clampToGround: true,  // 贴地
    }
  })
  viewer.entities.add(entityPolylineTerrain)
  // 非贴地线实体
  const entityPolyline = new Entity({
    id: 'polyline',
    name: '线实体',
    show: true,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([117.02969, 36.642845, 117.031047, 36.63785]),
      width: 10,
      material: Cesium.Color.RED,
    }
  })
  viewer.entities.add(entityPolyline)
  // 贴地面实体
  const entityPolygonTerrain = new Entity({
    id: 'polygonTerrain',
    name: '贴地面实体',
    show: true,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        117.021461,36.643154, 
        117.026961,36.643541, 
        117.028019,36.638372, 
        117.021877,36.637955 ]),
      material: Cesium.Color.BLUE.withAlpha(0.4),
      classificationType: Cesium.ClassificationType.BOTH,  // 贴地：表示绘制的面既可以贴合地形也可以贴合3D Tiles
      // classificationType: Cesium.ClassificationType.TERRAIN,  // 贴地：表示仅贴合地形
    }
  })
  viewer.entities.add(entityPolygonTerrain)
  // 非贴地面实体
  const entityPolygon = new Entity({
    id: 'polygon',
    name: '面实体',
    show: true,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        117.028019,36.638372, 
        117.021877,36.637955,
        117.022346,36.630539,
        117.029848,36.631216
      ]),
      material: Cesium.Color.RED.withAlpha(0.4),
    }
  })
  viewer.entities.add(entityPolygon)
  // 贴地矩形实体
  const entityRectangleTerrain = new Cesium.Entity({
    id: 'rectangleTerrain',
    name: '贴地矩形',
    show: true,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(117.033236, 36.627989, 117.041937, 36.633484),
      material: Cesium.Color.BLUE.withAlpha(0.6),
      classificationType: Cesium.ClassificationType.TERRAIN,  // 贴地：表示仅贴合地形
    }
  })
  viewer.entities.add(entityRectangleTerrain)
  // 矩形实体
  const entityRectangle = new Cesium.Entity({
    id: 'rectangle',
    name: '矩形',
    show: true,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(117.041937, 36.621395, 117.054099, 36.627989),
      material: Cesium.Color.RED.withAlpha(0.6),
    }
  })
  viewer.entities.add(entityRectangle)    
  // 贴地椭圆实体
  const entityEllipseTerrain = new Cesium.Entity({
    id: 'ellipseTerrain',
    name: '贴地椭圆实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.047632, 36.617403),
    ellipse: {
      semiMinorAxis: 100,
      semiMajorAxis: 200,
      material: Cesium.Color.BLUE.withAlpha(0.8),
      classificationType: Cesium.ClassificationType.TERRAIN,  // 贴地：表示仅贴合地形
    }
  })
  viewer.entities.add(entityEllipseTerrain)
  // 贴地走廊实体
  const entityCorridorTerrain = new Cesium.Entity({
    id: 'corridorTerrain',
    name: '贴地走廊实体',
    show: true,
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        117.041207, 36.620796,
        117.043285, 36.608455
      ]),
      width: 20,
      material: Cesium.Color.BLUE.withAlpha(0.5),
      classificationType: Cesium.ClassificationType.TERRAIN,  // 贴地：表示仅贴合地形
    }
  })
  viewer.entities.add(entityCorridorTerrain)
  // 走廊实体
  const entityCorridor = new Cesium.Entity({
    id: 'corridor',
    name: '走廊实体',
    show: true,
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        117.049791, 36.621367,
        117.058472, 36.612775
      ]),
      width: 20,
      material: Cesium.Color.RED.withAlpha(0.5),
    }
  })
  viewer.entities.add(entityCorridor)
  // 贴地模型实体
  const degree = 60  // 度数
  const heading = Cesium.Math.toRadians(degree)  // 模型航向（围绕负Z轴）
  const pitch = 0  // 俯仰角（围绕负Y轴）
  const roll = 0  // 翻滚角（围绕正X轴）
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const entityModelTerrain = new Entity({
    id: 'modelTerrain',
    name: '贴地模型实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.030194, 36.636607, 500),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.
      Cartesian3.fromDegrees(117.030194, 36.636607, 500), hpr),
    model: {
      uri: '/model/CesiumPlane.glb',  // 此处是uri，不是url
      minimumPixelSize: 1,
      maximumScale: 500,
      scale: 5,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,  // 贴地
    }
  })
  viewer.entities.add(entityModelTerrain)
  // 模型实体
  const entityModel = new Cesium.Entity({
    id: 'model',
    name: '模型实体',
    show: true,
    position: Cesium.Cartesian3.fromDegrees(117.030194, 36.636607, 500),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.
      Cartesian3.fromDegrees(117.030194, 36.636607, 500), hpr),
    model: {
      uri: '/model/CesiumPlane.glb',  // 此处是uri，不是url
      minimumPixelSize: 1,
      maximumScale: 500,
      scale: 5,
      // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,  // 贴地
    }
  })
  viewer.entities.add(entityModel)
    
  // 聚焦实体
  viewer.flyTo(entityModelTerrain)
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