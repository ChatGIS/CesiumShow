/*
 * @Author: ChatGIS ChatGIS@outlook.com
 * @Date: 2022-10-23 22:44:04
 * @LastEditors: ChatGIS ChatGIS@outlook.com
 * @LastEditTime: 2024-11-08 13:58:26
 * @FilePath: \CesiumShow\src\utils\sys-use.js
 * @Description: 
 */

// 获取assets静态资源
const getAssetsFile = (url) => {
  return new URL(`../assets/image/menu/${url}`, import.meta.url).href
}
export default getAssetsFile