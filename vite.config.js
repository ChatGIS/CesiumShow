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
  server: {
    port: 8081,
    proxy: {
      '/terrain': {
        target: 'http://localhost:1301',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/pjone-server/, '')
      },
    }
  }
})
