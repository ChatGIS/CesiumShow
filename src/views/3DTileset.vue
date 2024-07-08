<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(async() => {
  const viewer = new Cesium.Viewer('cesiumContainer',{
    // scene3DOnly: true,
    // selectionIndicator: false
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.scene.globe.depthTestAgainstTerrain = true


  const tilesDYT = await Cesium.Cesium3DTileset.fromUrl('/model/3dtiles/dyt/tileset.json')
  viewer.scene.primitives.add(tilesDYT)
  // viewer.zoomTo(tilesDYT)

  const cartographic = Cesium.Cartographic.fromCartesian(
    tilesDYT.boundingSphere.center
  )
  const surface = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
  )
  const offset = Cesium.Cartesian3.fromRadians(
    // Cesium.Math.toDegrees(cartographic.longitude),
    // Cesium.Math.toDegrees(cartographic.latitude),
    cartographic.longitude,
    cartographic.latitude,
    -420
  )
  const translation = Cesium.Cartesian3.subtract(
    offset,
    surface,
    new Cesium.Cartesian3()
  )
  tilesDYT.modelMatrix = Cesium.Matrix4.fromTranslation(translation)

  viewer.flyTo(tilesDYT, {
    offset: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-50),
      roll: 0
    },

    duration: 5
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