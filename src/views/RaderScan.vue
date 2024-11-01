<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
let viewer
let linkA
let linkB
let canvasCollection
let rotation = 0
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
    addRaderScan()
})
const addRaderScan = () => {
    const entityRanderScan = viewer.entities.add({
        id: 'rader-scan00001',
        position: Cesium.Cartesian3.fromDegrees(
            113.928703308,
            22.505599976,
            0
        ),
        ellipse: {
            semiMinorAxis: 10000,
            semiMajorAxis: 10000,
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
    viewer.zoomTo(entityRanderScan)
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>