/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:34:01
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-11-27 01:03:44
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
    }
]

// 创建路由实例并传递`routes`配置
const router = createRouter({
    history: createWebHashHistory(),  // 改为hash模式，在nginx部署时正常访问路由
    routes
})

export default router