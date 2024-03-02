/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:18:42
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-02 22:22:07
 * @FilePath: \CesiumShow\vite.config.js
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),  // 路径别名
    }
  },
})
