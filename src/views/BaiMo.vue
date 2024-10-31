<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
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
  addOne3dTitleset()
})
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
    });
  modalOne.customShader = customShader01
}
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>