<script setup>
import getAssetsFile from '@/utils/sys-use'
import router from '@/router'
import { computed } from 'vue'
import menuBackground from '@/assets/image/menu-background.jpg'
import ImageProjectIcon from '@/assets/image/project_icon_transparent.png'

// 所有菜单项
const allMenu = [{
  title: '雷达圆扫',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/rader-scan',
  desc: '雷达扫描效果',
  tags: ['动态特效', '点', '雷达']
}, {
  title: '圆扩散',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/ellipsoid-fade',
  desc: '圆扩散动态效果',
  tags: ['动态特效', '点', '圆', '扩散']
}, {
  title: '线圈扩散',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/scan-line',
  desc: '线圈扩散动态效果',
  tags: ['动态特效', '点', '圆', '扩散']
}, {
  title: '水波纹扩散',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/circle-wave',
  desc: '水波纹扩散动态效果',
  tags: ['动态特效', '点', '圆', '扩散']
}, {
  title: '六边形扩散',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/hexagon-spread',
  desc: '水波纹扩散动态效果',
  tags: ['动态特效', '点', '六边形', '扩散']
}, {
  title: '飞线',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/fly-line',
  desc: '飞线效果',
  tags: ['动态特效', '线', '飞线']
}, {
  title: '道路穿梭',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/sprite-line',
  desc: '道路穿梭',
  tags: ['动态特效', '线', '道路穿梭']
}, {
  title: '模型展示',
  imgSrc: getAssetsFile('rader-scan.png'),
  showRoute: '/model-show',
  desc: '模型展示',
  tags: ['模型']
}]

// 计算属性，拆为二维数组
const menus = computed(() => {
  const menuArr = []
  allMenu.forEach((item, index) => {
    const row = Math.floor(index / 4)
    if (!menuArr[row]) {
      menuArr[row] = []
    }
    menuArr[row].push(item)
  })
  return menuArr
})
// 计算数量
const menuNum = computed(() => {
  return allMenu.length
})
// 跳转页面
const toPage = (route) => {
  router.push(route)
}
</script>

<template>
  <div id="menu-div" :style="'background-image:url(' + menuBackground + ')'">
    <el-image style="width: 100px; height: 100px" :src="ImageProjectIcon" fit="fill" />
    <h1>功能菜单（{{ menuNum }}）</h1>
    <el-scrollbar>
      <el-row :gutter="20" justify="center" v-for="(items, index) in menus" :key="index">
        <el-col v-for="(item) in items" :key="item" :span="4">
          <el-card :body-style="{ padding: '0px' }" @click="toPage(item.showRoute)" shadow="hover">
            <img style="width:200px; height:100px" :src="item.imgSrc" class="image" />
            <div class="info">
              <span>{{ item.title }}</span>
            </div>
            <div class="desc">
              <span>{{ item.desc }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<style scoped>
#menu-div {
  /* background-image: url(); */
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

h1 {
  color: #FFFFFF;
}

.el-scrollbar {
  height: calc(100% - 85px);
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-row {
  margin: 10px 100px;
}

img {
  margin: 10px 5px 0;
}

.info {
  margin: 5px;
  font-weight: bold;
}

.desc {
  font-size: smaller;
  height: 50px;
}

.el-card {
  cursor: pointer;
}

/* 图片旋转 */
.el-image:hover {
  animation-play-state: paused;
}

.el-image {
  position: absolute;
  left: 20px;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}
</style>