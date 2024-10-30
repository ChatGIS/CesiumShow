<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
let viewer
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
  // 已知两个点的坐标
  const point1 = Cesium.Cartesian3.fromDegrees(120.0, 39.0)
  const point2 = Cesium.Cartesian3.fromDegrees(114.0, 33.0)

  // 计算两点之间的距离
  const distance = Cesium.Cartesian3.distance(point1, point2)
  console.log(distance, 'distance')
  
  // 计算两点连线的方向向量
  const direction = Cesium.Cartesian3.subtract(point2, point1, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(direction, direction)
  console.log('direction:', direction)
  // 设定要生成的新点距离已知点的距离（这里是 20 千米，需要根据实际情况进行单位转换）
  const newDistance = 40000 // 20km 转换为米
  const newPoint1 = Cesium.Cartesian3.add(point1, Cesium.Cartesian3.multiplyByScalar(direction, newDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const newPoint2 = Cesium.Cartesian3.add(point2, Cesium.Cartesian3.multiplyByScalar(direction, -newDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  // 计算 newPoint1 和 newPoint2 的方向向量
  const midLineDirection = Cesium.Cartesian3.subtract(newPoint2, newPoint1, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(midLineDirection, midLineDirection)

  // 在 newPoint1 两侧距离 20KM 对称的两个点
  const symDistance = 20000
  const perpDirection1 = new Cesium.Cartesian3(-midLineDirection.z, midLineDirection.y, midLineDirection.x)
  Cesium.Cartesian3.normalize(perpDirection1, perpDirection1)
  const symPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, -symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const symPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  
  // 在 newPoint2 两侧距离 20KM 对称的两个点
  const perpDirection2 = new Cesium.Cartesian3(-midLineDirection.z, midLineDirection.y, midLineDirection.x)
  Cesium.Cartesian3.normalize(perpDirection2, perpDirection2)
  const symPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, -symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const symPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  const largeSymDistance = 40000
  const largeSymPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, -largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, -largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  // 定义点数组用于创建面
  const pointsForPolygon = [
    point1, largeSymPoint1Left, symPoint1Left, symPoint2Left, largeSymPoint2Left,
    point2, largeSymPoint2Right, symPoint2Right, symPoint1Right, largeSymPoint1Right
  ]
  
  // 创建多边形实体
  const polygon = viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.CallbackProperty(() => {
        return new Cesium.PolygonHierarchy(pointsForPolygon)
      }, false),
      material: Cesium.Color.RED.withAlpha(1)
    }
  })

  // 在 newPoint1 和 newPoint2 之间生成文字
  const fullText = '双箭头文字示例 '
  const n = fullText.length
  const step = Cesium.Cartesian3.distance(newPoint1, newPoint2) / n
  const chars = fullText.split('')
  // 将 Cesium.Cartesian3 格式的点转换为经纬度
  function cartesian3ToDegrees(cartesian3) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
    const longitude = Cesium.Math.toDegrees(cartographic.longitude)
    const latitude = Cesium.Math.toDegrees(cartographic.latitude)
    return [longitude, latitude]
  }
  const aaa = cartesian3ToDegrees(newPoint1)
  const bbb = cartesian3ToDegrees(newPoint2)
  console.log(aaa, bbb)
  const geojsonLine = turf.lineString([aaa, bbb])
  const totalDistance = turf.length(geojsonLine);
  console.log(totalDistance);
  // 定义要分割的数量n
const n1 = 3; // 例如，将线分为10等分

// 计算每段的距离
const segmentDistance = totalDistance / n1;
const segments = [];
for (let i = 1; i <= n1; i++) {
    const point = turf.along(geojsonLine, i * segmentDistance);
    segments.push(point.geometry.coordinates);
}

console.log(segments); // 输出所有节点的坐标
for (let i = 0; i < segments.length; i++) { // 从第一个中间节点开始，不包含 newPoint1 和 newPoint2
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(segments[i][0], segments[i][1]),
      label: {
        text: 'aaa',
        font: '20px Arial',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2
      }
    })
  }
  // 在 newPoint1 和 newPoint2 之间生成文字
  /* for (let i = 1; i < n; i++) { // 从第一个中间节点开始，不包含 newPoint1 和 newPoint2
    const position = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(midLineDirection, step * i, new Cesium.Cartesian3()), new Cesium.Cartesian3())
    viewer.entities.add({
      position: position,
      label: {
        text: chars[i - 1],
        font: '14px Arial',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2
      }
    })
  } */
  // 在 Cesium 场景中可以添加实体等来可视化这些点
  // 创建实体来可视化点
  const entity1 = viewer.entities.add({
    position: point1,
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED
    }
  })

  const entity2 = viewer.entities.add({
    position: point2,
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED
    }
  })
  const entity11 = viewer.entities.add({
    position: newPoint1,
    point: {
      pixelSize: 5,
      color: Cesium.Color.BLUE
    }
  })

  const entity22 = viewer.entities.add({
    position: newPoint2,
    point: {
      pixelSize: 5,
      color: Cesium.Color.BLUE
    }
  })
  viewer.entities.add({
    position: symPoint1Left,
    point: {
      pixelSize: 5,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: symPoint1Right,
    point: {
      pixelSize: 5,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: symPoint2Left,
    point: {
      pixelSize: 5,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: symPoint2Right,
    point: {
      pixelSize: 5,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: largeSymPoint1Left,
    point: {
      pixelSize: 5,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: largeSymPoint1Right,
    point: {
      pixelSize: 5,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: largeSymPoint2Left,
    point: {
      pixelSize: 5,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: largeSymPoint2Right,
    point: {
      pixelSize: 5,
      color: Cesium.Color.YELLOW
    }
  })
})
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>