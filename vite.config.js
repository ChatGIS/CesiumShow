/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:18:42
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-04 18:30:46
 * @FilePath: \CesiumShow\vite.config.js
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // 路径别名
    }
  },
})
