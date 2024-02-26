<script setup>
import * as Cesium from 'cesium'
import { Viewer, Ion, Entity, Cartesian3, HorizontalOrigin, VerticalOrigin } from 'cesium'
import { onMounted } from 'vue'
import imageShop from '../assets/image/shop.png'

Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
    const viewer = new Viewer('cesiumContainer',{
        // scene3DOnly: true,
        // selectionIndicator: false
    })
    viewer.scene.debugShowFramesPerSecond = true
    // 点实体
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
    viewer.entities.add(entityPoint);
    // 线实体
    const entityPolyline = new Entity({
        id: 'polyline',
        name: '线实体',
        show: true,
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([117.0241,36.6751, 117.0242,36.6754, 117.0243,36.6752]),
            width: 10,
            material: Cesium.Color.BLUE,
        }
    })
    viewer.entities.add(entityPolyline);
    // 面实体
    const entityPolygon = new Entity({
        id: 'polygon',
        name: '面实体',
        show: true,
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([117.0231, 36.6751, 117.0236, 36.6751, 117.0236, 36.6756, 117.0231, 36.6756 ]),
            material: Cesium.Color.RED.withAlpha(0.4),
        }
    })
    viewer.entities.add(entityPolygon);
    // 矩形实体
    const entityRectangle = new Cesium.Entity({
        id: 'rectangle',
        name: '矩形',
        show: true,
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(117.0231, 36.6759, 117.0238, 36.6765),
            material: Cesium.Color.GREEN.withAlpha(0.6),
        }
    })
    viewer.entities.add(entityRectangle);
    // 椭圆实体
    const entityEllipse = new Cesium.Entity({
        id: 'ellipse',
        name: '椭圆实体',
        show: true,
        position: Cesium.Cartesian3.fromDegrees(117.022, 36.6759),
        ellipse: {
            semiMinorAxis: 25,
            semiMajorAxis: 40,
            material: Cesium.Color.BLUEVIOLET.withAlpha(0.8),
        }
    })
    viewer.entities.add(entityEllipse);
    // 圆柱体实体
    const entityCylinder = new Cesium.Entity({
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
    viewer.entities.add(entityCylinder);

    const billboardEntity = new Entity({
        position: Cartesian3.fromDegrees(117.023501,36.675143),
        billboard: {
          image: imageShop,
          scale: 3,
          horizontalOrigin: HorizontalOrigin.CENTER,
          verticalOrigin: VerticalOrigin.BOTTOM,
        }
      })
    viewer.entities.add(billboardEntity);
    viewer.flyTo(billboardEntity);
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