<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:35:00
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-11-29 14:52:48
 * @FilePath: \CesiumShow\src\views\2D3Dlinkage.vue
 * @Description: 
-->

<template>
    <div id="cesiumContainer">
        <div id="view3D"></div>
        <div id="view2D"></div>
    </div>
</template>

<script setup>
import { Viewer, Ion, Cartesian2, Cartesian3, defined, SceneMode } from 'cesium'
import { onMounted } from 'vue'

Ion.defaultAccessToken = import.meta.env.VITE_TOKEN_CESIUM
onMounted(() => {
    const view3D = new Viewer('view3D', {
    });
    const view2D = new Viewer('view2D', {
        sceneMode: SceneMode.SCENE2D,
    });
    /**
     * @description: 将二维地图的视图与三维同步
     * @param {*}
     * @return {*}
     */
    function sync2D() {
        // 三维地图中心点
        let center = new Cartesian2(
            Math.floor(view3D.canvas.clientWidth / 2),
            Math.floor(view3D.canvas.clientHeight / 2)
        );
        // 转为世界坐标系
        let position = view3D.scene.camera.pickEllipsoid(center);
        // 判断中心点是否在椭球体上
        if (defined(position)) {
            // 获取三维地图中心点与相机之间的距离
            let distance = Cartesian3.distance(
                position,
                view3D.scene.camera.positionWC
            );
            // 更新二维地图
            view2D.scene.camera.lookAt(
                position,
                new Cartesian3(0.0, 0.0, distance)
            )
        }
    }
    view3D.camera.percentageChanged = 0.01;
    // 监听三维地图变化
    view3D.camera.changed.addEventListener(sync2D);
})
</script>

<style scoped>
#cesiumContainer {
    display: flex;
    width: 100%;
    height: 100%;
}
        
#view3D {
    display: inline-block;
    width: 100%;
}

#view2D {
    display: inline-block;
    width: 100%;
}
</style>