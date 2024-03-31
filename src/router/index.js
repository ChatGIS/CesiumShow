/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:34:01
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-04-08 10:50:38
 * @FilePath: \CesiumShow\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义一些路由
// 每个路由都需要映射到一个组件
const routes = [
  {
    name: 'BaseMenu',
    path: '/',
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
  }
]

// 创建路由实例并传递`routes`配置
const router = createRouter({
  history: createWebHashHistory(),  // 改为hash模式，在nginx部署时正常访问路由
  routes
})

export default router