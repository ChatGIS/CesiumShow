import { createRouter, createWebHashHistory } from 'vue-router'

// 定义一些路由
// 每个路由都需要映射到一个组件
const routes = [
  {
    name: 'BaseMenu',
    path: '/',
    component: () => import('@/views/system/BaseMenu.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'BaseCesium',
    path: '/base-cesium',
    component: () => import('@/views/BaseCesium.vue')
  }, {
    name: 'ImageryLayerOnline',
    path: '/online',
    component: () => import('@/views/ImageryLayerOnline.vue')
  }, {
    name: '2D3DLinkage',
    path: '/2d3d-linkage',
    component: () => import('@/views/2D3DLinkage.vue')
  }, {
    name: 'EntityShow',
    path: '/entity-show',
    component: () => import('@/views/EntityShow.vue')
  }, {
    name: 'EntityShowTerrain',
    path: '/entity-show-terrain',
    component: () => import('@/views/EntityShowTerrain.vue')
  }, {
    name: 'GeomPrimitive',
    path: '/geom-primitive',
    component: () => import('@/views/GeomPrimitive.vue')
  }, {
    name: '3dtiles',
    path: '/3dtiles',
    component: () => import('@/views/3DTileset.vue')
  }, {
    name: 'DialogShow',
    path: '/dialog-show',
    component: () => import('@/views/DialogShow.vue')
  }, {
    name: 'MaterialVideo',
    path: '/material-video',
    component: () => import('@/views/MaterialVideo.vue')
  }, {
    name: 'CloudShow',
    path: '/cloud-show',
    component: () => import('@/views/CloudShow.vue')
  }, {
    name: 'TerrainShow',
    path: '/terrain-show',
    component: () => import('@/views/TerrainShow.vue')
  }, {
    name: 'CameraParam',
    path: '/camera-param',
    component: () => import('@/views/CameraParam.vue')
  }, {
    name: 'ElectricFence',
    path: '/electric-fence',
    component: () => import('@/views/ElectricFence.vue')
  }, {
    name: 'DoubleArrow',
    path: '/double-arrow',
    component: () => import('@/views/DoubleArrow.vue')
  }, {
    name: 'ZIndexTest',
    path: '/zindex-test',
    component: () => import('@/views/ZIndexTest.vue')
  }, {
    name: 'BaiMo',
    path: '/baimo',
    component: () => import('@/views/BaiMo.vue')
  }, {
    name: 'RaderScan',
    path: '/rader-scan',
    component: () => import('@/views/RaderScan.vue')
  }
]

// 创建路由实例并传递`routes`配置
const router = createRouter({
  history: createWebHashHistory(),  // 改为hash模式，在nginx部署时正常访问路由
  routes
})

export default router