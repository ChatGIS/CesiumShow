<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2024-02-29 08:52:45
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-04 18:15:26
 * @FilePath: \CesiumShow\src\views\GeomPrimitive.vue
 * @Description: Primitive相关功能
-->
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer',{
    // scene3DOnly: true,
    // selectionIndicator: false
  })
  viewer.scene.debugShowFramesPerSecond = true
  // 线 
  const geomInsPolyline = new Cesium.GeometryInstance({
    geometry: new Cesium.PolylineGeometry({
      positions: Cesium.Cartesian3.fromDegreesArray([
        117.02969, 36.642845, 
        117.031047, 36.63785
      ]),
      width: 2.0
    })
  })
  const appePolyline = new Cesium.PolylineMaterialAppearance({
    material: Cesium.Material.fromType('Color', {
      color: new Cesium.Color(1, 0, 0, 1)
    })
  })
  const primitivePolyline = new Cesium.Primitive({
    geometryInstances: geomInsPolyline,
    appearance: appePolyline,
  })
  viewer.scene.primitives.add(primitivePolyline)
  // 面
  const geomInsPolygon = new Cesium.GeometryInstance({
    geometry: new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          117.028019,36.638372, 
          117.021877,36.637955,
          117.022346,36.630539,
          117.029848,36.631216
        ])
      )
    })
  })
  const appePolygon = new Cesium.MaterialAppearance({
    material: Cesium.Material.fromType('Dot')
  })
  const primitivePolygon = new Cesium.Primitive({
    geometryInstances: geomInsPolygon,
    appearance: appePolygon
  })
  viewer.scene.primitives.add(primitivePolygon)
  // 椭圆
  const geomInsEllipse = new Cesium.GeometryInstance({
    geometry: new Cesium.EllipseGeometry({
      center: Cesium.Cartesian3.fromDegrees(117.047632, 36.617403),
      semiMajorAxis: 500,
      semiMinorAxis: 300
    })
  })
  const appeEllipse = new Cesium.EllipsoidSurfaceAppearance({
    material: Cesium.Material.fromType('Stripe')
  })
  const primitiveEllipse = new Cesium.Primitive({
    geometryInstances: geomInsEllipse,
    appearance: appeEllipse
  })
  viewer.scene.primitives.add(primitiveEllipse)
    
  viewer.camera.setView({
    // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
    // fromDegrees()方法，将经纬度和高程转换为世界坐标
    destination: Cesium.Cartesian3.fromDegrees(117.02969, 36.642845, 1500),
    orientation: {
      // 指向
      heading: 6.283185307179581,
      // 视角
      pitch: -1.5688168484696687,
      roll: 0.0
    }
  })
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