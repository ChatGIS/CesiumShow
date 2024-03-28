/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-10-18 17:18:42
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-02 22:17:27
 * @FilePath: \CesiumShow\src\main.js
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
  .use(router)
  .mount('#app')
