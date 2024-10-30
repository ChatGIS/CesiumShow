<template>
    <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import * as turf from '@turf/turf'

Cesium.Ion.defaultAccessToken=import.meta.env.VITE_TOKEN_CESIUM
let viewer
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.createWorldTerrainAsync()
  })
  viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(117, 36, 1500000),
    /* orientation: {
      heading: Cesium.Math.toRadians(161.69687),
      pitch: Cesium.Math.toRadians(-14.366),
      roll: Cesium.Math.toRadians(0)
    } */
  })
  // 已知两个点的坐标
  const point1 = Cesium.Cartesian3.fromDegrees(120.0, 39.0)
  const point2 = Cesium.Cartesian3.fromDegrees(114.0, 33.0)
  const points = [[116, 38], [119, 34], [116, 32.0]]
  const arrowLength = 40  // 40km
  const arrowWidth = 40
  const polygonWidth = 20
  const pointStart2 = Cesium.Cartesian3.fromDegrees(points[0][0], points[0][1])
  const pointEnd2 = Cesium.Cartesian3.fromDegrees(points[points.length - 1][0], points[points.length - 1][1])
  
  // 计算两点连线的方向向量
  const directionStart = Cesium.Cartesian3.subtract(point1, pointStart2, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(directionStart, directionStart)
  const directionEnd = Cesium.Cartesian3.subtract(point2, pointEnd2, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(directionEnd, directionEnd)
  const arrowLengthDist = arrowLength * 1000
  const arrowStartCenterPoint = Cesium.Cartesian3.add(point1, Cesium.Cartesian3.multiplyByScalar(directionStart, -arrowLengthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowEndCenterPoint = Cesium.Cartesian3.add(point2, Cesium.Cartesian3.multiplyByScalar(directionEnd, -arrowLengthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // 计算垂直方向向量
  const perpendicularDirectionStart = new Cesium.Cartesian3(-directionStart.z, directionStart.y, directionStart.x)
  Cesium.Cartesian3.normalize(perpendicularDirectionStart, perpendicularDirectionStart)
  const perpendicularDirectionEnd = new Cesium.Cartesian3(-directionEnd.z, directionEnd.y, directionEnd.x)
  Cesium.Cartesian3.normalize(perpendicularDirectionEnd, perpendicularDirectionEnd)
  
  // 待注释
  const direction = Cesium.Cartesian3.subtract(point2, point1, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(direction, direction)
  const newPoint1 = Cesium.Cartesian3.add(point1, Cesium.Cartesian3.multiplyByScalar(direction, arrowLengthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const newPoint2 = Cesium.Cartesian3.add(point2, Cesium.Cartesian3.multiplyByScalar(direction, -arrowLengthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const midLineDirection = Cesium.Cartesian3.subtract(newPoint2, newPoint1, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(midLineDirection, midLineDirection)
  const lineDirection = Cesium.Cartesian3.subtract(newPoint2, newPoint1, new Cesium.Cartesian3())
  Cesium.Cartesian3.normalize(lineDirection, lineDirection)
  const perpendicularDirection = new Cesium.Cartesian3(-lineDirection.z, lineDirection.y, lineDirection.x)
  Cesium.Cartesian3.normalize(perpendicularDirection, perpendicularDirection)

  // 顺时针旋转 30 度（角度转弧度）
  const rotationAngle = Cesium.Math.toRadians(50)
  const rotatedDirectionX = perpendicularDirection.x * Math.cos(rotationAngle) + perpendicularDirection.y * Math.sin(rotationAngle)
  const rotatedDirectionY = -perpendicularDirection.x * Math.sin(rotationAngle) + perpendicularDirection.y * Math.cos(rotationAngle)
  const rotatedPerpendicularDirection = new Cesium.Cartesian3(rotatedDirectionX, rotatedDirectionY, perpendicularDirection.z)

  // 在旋转后的垂直线方向生成对称的两个点
  const arrowWidthDist = arrowWidth * 1000 // 距离连线的距离，可以根据需要调整
  const directionStart1 = new Cesium.Cartesian3(-directionStart.z, directionStart.y, directionStart.x)
  const directionEnd1 = new Cesium.Cartesian3(-directionEnd.z, directionEnd.y, directionEnd.x)
  const arrowStartLeft = Cesium.Cartesian3.add(arrowStartCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionStart1, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowStartRight = Cesium.Cartesian3.add(arrowStartCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionStart1, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowEndLeft = Cesium.Cartesian3.add(arrowEndCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionEnd1, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowEndRight = Cesium.Cartesian3.add(arrowEndCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionEnd1, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const polygonWidthDist = polygonWidth * 1000
  const arrowStartLeftMin = Cesium.Cartesian3.add(arrowStartCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionStart1, polygonWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowStartRightMin = Cesium.Cartesian3.add(arrowStartCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionStart1, -polygonWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowEndLeftMin = Cesium.Cartesian3.add(arrowEndCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionEnd1, polygonWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const arrowEndRightMin = Cesium.Cartesian3.add(arrowEndCenterPoint, Cesium.Cartesian3.multiplyByScalar(directionEnd1, -polygonWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())


  const largeSymPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const largeSymPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  // const largeSymPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -arrowWidthDist, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  // 在 newPoint1 两侧距离 20KM 对称的两个点
  const symDistance = 20000
  const perpDirection1 = new Cesium.Cartesian3(-midLineDirection.z, midLineDirection.y, midLineDirection.x)
  Cesium.Cartesian3.normalize(perpDirection1, perpDirection1)
  const symPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const symPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  
  // 在 newPoint2 两侧距离 20KM 对称的两个点
  const perpDirection2 = new Cesium.Cartesian3(-midLineDirection.z, midLineDirection.y, midLineDirection.x)
  Cesium.Cartesian3.normalize(perpDirection2, perpDirection2)
  const symPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, -symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const symPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(rotatedPerpendicularDirection, symDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())

  // const largeSymDistance = 40000
  // const largeSymPoint1Left = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, -largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint1Right = Cesium.Cartesian3.add(newPoint1, Cesium.Cartesian3.multiplyByScalar(perpDirection1, largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint2Left = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, -largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // const largeSymPoint2Right = Cesium.Cartesian3.add(newPoint2, Cesium.Cartesian3.multiplyByScalar(perpDirection2, largeSymDistance, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // 使用 turf 的 bezierSpline 生成曲线
  // 计算两点连线的中心点
  let center = Cesium.Cartesian3.add(symPoint1Left, symPoint2Left, new Cesium.Cartesian3())
  center = Cesium.Cartesian3.multiplyByScalar(center, 0.5, center)
  let center1 = Cesium.Cartesian3.add(symPoint1Right, symPoint2Right, new Cesium.Cartesian3())
  center1 = Cesium.Cartesian3.multiplyByScalar(center1, 0.5, center1)
  // 计算垂直方向的向量
  const up = new Cesium.Cartesian3(0, 0, 1)
  let crossProduct = Cesium.Cartesian3.cross(direction, up, new Cesium.Cartesian3())
  crossProduct = Cesium.Cartesian3.normalize(crossProduct, crossProduct)
  // 在垂直方向距离 100 千米处生成新点
  const distance111 = 100000 // 100 千米转换为米
  const ph1 = Cesium.Cartesian3.add(center, Cesium.Cartesian3.multiplyByScalar(crossProduct, distance111, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const ph2 = Cesium.Cartesian3.add(center1, Cesium.Cartesian3.multiplyByScalar(crossProduct, distance111, new Cesium.Cartesian3()), new Cesium.Cartesian3())


  // 将 Cesium.Cartesian3 格式的点转换为经纬度
  function cartesian3ToDegrees(cartesian3) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
    const longitude = Cesium.Math.toDegrees(cartographic.longitude)
    const latitude = Cesium.Math.toDegrees(cartographic.latitude)
    return [longitude, latitude]
  }

  const pl1 = cartesian3ToDegrees(symPoint1Left)
  const pr1 = cartesian3ToDegrees(symPoint1Right)
  const ph1D = cartesian3ToDegrees(ph1)
  const pl2 = cartesian3ToDegrees(symPoint2Left)
  const pr2 = cartesian3ToDegrees(symPoint2Right)
  const ph2D = cartesian3ToDegrees(ph2)
  
  const pointTextStart = cartesian3ToDegrees(arrowStartCenterPoint)
  const pointTextEnd = cartesian3ToDegrees(arrowEndCenterPoint)
  points.push(pointTextEnd)
  points.unshift(pointTextStart)
  // 使用 turf 的 lineString 函数创建线
  const textLine = turf.lineString(points)

  const l1 = turf.lineString([
    pl1,
    ph1D,
    pl2
  ])
  const l2 = turf.lineString([
    pr1,
    ph2D,
    pr2
  ])
  const curvePoints1 = turf.bezierSpline(l1)
  const curvePoints2 = turf.bezierSpline(l2)
  const curvePointsTextLine = turf.bezierSpline(textLine)
  console.log('', curvePointsTextLine, 'CesiumShow-10-17 16:03:49测试打印内容m')
  const aab = getDoubleLine(curvePointsTextLine.geometry.coordinates, 100000)
  console.log('', aab, 'CesiumShow-10-17 16:04:55测试打印内容m')
  
  
  // 将 turf 的坐标转换为 Cesium 的 Cartesian3
  const cesiumCurvePoints1 = curvePoints1.geometry.coordinates.map(coords => Cesium.Cartesian3.fromDegrees(coords[0], coords[1]))
  const cesiumCurvePoints2 = curvePoints2.geometry.coordinates.map(coords => Cesium.Cartesian3.fromDegrees(coords[0], coords[1]))
  const cesiumCurvePointsTextLine = curvePointsTextLine.geometry.coordinates.map(coords => Cesium.Cartesian3.fromDegrees(coords[0], coords[1]))

  // 创建多边形实体
  const cl1 = viewer.entities.add({
    name: 'Line',
    polyline: {
      positions: cesiumCurvePoints1,
      width: 5,
      material: Cesium.Color.RED
    }
  })
  const cl2 = viewer.entities.add({
    name: 'Line',
    polyline: {
      positions: cesiumCurvePoints2,
      width: 5,
      material: Cesium.Color.RED
    }
  })

  // 创建多边形实体
  const cl11 = viewer.entities.add({
    name: 'Line',
    polyline: {
      positions: aab.leftPositions,
      width: 1,
      material: Cesium.Color.BLUE
    }
  })
  const cl21 = viewer.entities.add({
    name: 'Line',
    polyline: {
      positions: aab.rightPositions,
      width: 1,
      material: Cesium.Color.BLUE
    }
  })

  
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
      material: Cesium.Color.YELLOW.withAlpha(0.5)
    }
  })
  const cl3 = viewer.entities.add({
    name: 'Line',
    polyline: {
      positions: cesiumCurvePointsTextLine,
      width: 3,
      material: Cesium.Color.RED
    }
  })
  const fullText = '双箭头文字示例双箭头文字示例双箭头文字示例'
  const numWords = fullText.length

  const aa = 0.2
  // 计算每个节点之间的距离比例
  const numPoints = cesiumCurvePointsTextLine.length * (1 - aa * 2)
  const index = numPoints / (numWords + 1)

  for (let i = 0; i < numWords; i++) {
    viewer.entities.add({
      position: cesiumCurvePointsTextLine[Math.floor(cesiumCurvePointsTextLine.length * aa + index * (i + 1))],
      label: {
        text: fullText[i],
        font: '14px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        pixelOffset: new Cesium.Cartesian3(0, -20)
      }
    })
  }


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
    position: arrowEndLeftMin,
    point: {
      pixelSize: 15,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: arrowEndRightMin,
    point: {
      pixelSize: 15,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: arrowStartLeftMin,
    point: {
      pixelSize: 15,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: arrowStartRightMin,
    point: {
      pixelSize: 15,
      color: Cesium.Color.GREEN
    }
  })
  viewer.entities.add({
    position: arrowStartLeft,
    point: {
      pixelSize: 15,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: arrowStartRight,
    point: {
      pixelSize: 15,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: arrowEndLeft,
    point: {
      pixelSize: 15,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: arrowEndRight,
    point: {
      pixelSize: 15,
      color: Cesium.Color.YELLOW
    }
  })
  viewer.entities.add({
    position: arrowStartCenterPoint,
    point: {
      pixelSize: 10,
      color: Cesium.Color.PURPLE
    }
  })
  viewer.entities.add({
    position: arrowEndCenterPoint,
    point: {
      pixelSize: 5,
      color: Cesium.Color.PURPLE
    }
  })
})
const getDoubleLine = (positions, n) => {
  let directions = []
  let perpendiculars = []
  for (let i = 1; i < positions.length; i++) {
    const cPoint1 = Cesium.Cartesian3.fromDegrees(positions[i][0], positions[i][1])
    const cPoint2 = Cesium.Cartesian3.fromDegrees(positions[i - 1][0], positions[i - 1][1])
    let direction = Cesium.Cartesian3.subtract(cPoint1, cPoint2, new Cesium.Cartesian3())
    Cesium.Cartesian3.normalize(direction, direction)
    directions.push(direction)
    let perpendicular = new Cesium.Cartesian3(-direction.z, direction.y, direction.x)
    Cesium.Cartesian3.normalize(perpendicular, perpendicular)
    perpendiculars.push(perpendicular)
  }
  let leftPositions = []
  let rightPositions = []
  for (let i = 0; i < positions.length - 1; i++) {
    // console.log('ccccccccccccccc', positions[i], 'CesiumShow-10-17 16:24:31测试打印内容m')
    
    const cPoint1 = Cesium.Cartesian3.fromDegrees(positions[i][0], positions[i][1])
    // let offset = perpendiculars[i].multiplyByScalar(n / 2)
    // leftPositions.push(Cesium.Cartesian3.add(positions[i], offset, new Cesium.Cartesian3()))
    // rightPositions.push(Cesium.Cartesian3.subtract(positions[i], offset, new Cesium.Cartesian3()))
    const leftPoint = Cesium.Cartesian3.add(cPoint1, Cesium.Cartesian3.multiplyByScalar(perpendiculars[i], -n/2, new Cesium.Cartesian3()), new Cesium.Cartesian3())
    const rightPoint = Cesium.Cartesian3.add(cPoint1, Cesium.Cartesian3.multiplyByScalar(perpendiculars[i], n/2, new Cesium.Cartesian3()), new Cesium.Cartesian3())
    leftPositions.push(leftPoint)
    rightPositions.push(rightPoint)
  }
  return {
    leftPositions,
    rightPositions
  }
}
</script>
<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}
</style>