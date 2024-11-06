/*
 * @Date: 2023-07-21 15:15:32
 * @LastEditors: ChatGIS ChatGIS@outlook.com
 * @LastEditTime: 2024-11-19 11:05:39
 * @FilePath: \CesiumShow\src\views\MaterialDefine\EllipsoidFadeMaterialProperty.js
 * @Description: 扩散圆材质
 */
import * as Cesium from 'cesium'

export default class EllipsoidFadeMaterialProperty {
  constructor(color, duration) {
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this._time = (new Date()).getTime()
    this.color = color
    this.duration = duration
  }

  get isConstant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }

  getType() {
    return Cesium.Material.EllipsoidFadeMaterialType
  }

  getValue(time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }

    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
    return result
  }

  equals(other) {
    return (this === other ||
      (other instanceof EllipsoidFadeMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
    )
  }
}

Object.defineProperties(EllipsoidFadeMaterialProperty.prototype, {
  color: Cesium.createPropertyDescriptor('color'),
})

// Cesium.EllipsoidFadeMaterialProperty = EllipsoidFadeMaterialProperty;
Cesium.Material.EllipsoidFadeMaterialProperty = 'EllipsoidFadeMaterialProperty'
Cesium.Material.EllipsoidFadeMaterialType = 'EllipsoidFadeMaterialType'
Cesium.Material.EllipsoidFadeSource = `
czm_material czm_getMaterial(czm_materialInput materialInput) {
	czm_material material = czm_getDefaultMaterial(materialInput);
  
	material.diffuse = 1.5 * color.rgb;
	vec2 st = materialInput.st;
	float dis = distance(st, vec2(0.5, 0.5));
  float bl = .0;
  float offset = 0.42;
  if( dis > 0.5) {
		material.alpha = 0.0;
		discard;
	}
  if( dis > offset) {
    bl = color.a * 1.0 / (0.5 - offset) * (dis - offset);
    material.alpha =  pow(bl, 3.0);
	} else {
    material.alpha = 0.0;
		discard;
  }
	return material;
}
`
/* Cesium.Material.EllipsoidFadeMaterialSource =
  `
  czm_material czm_getMaterial(czm_materialInput materialInput)
  {
    czm_material material = czm_getDefaultMaterial(materialInput);
    material.diffuse = 1.5 * color.rgb;
    vec2 st = materialInput.st;
    float dis = distance(st, vec2(0.5, 0.5));
    float per = fract(time);
    if(dis > per * 0.5){
      material.alpha = 0.0;
      discard;
    }else {
      material.alpha = color.a  * dis / per / 1.0;
    }
    return material;
  }
  ` */

Cesium.Material._materialCache.addMaterial(Cesium.Material.EllipsoidFadeMaterialType, {
  fabric: {
    type: Cesium.Material.EllipsoidFadeMaterialType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      time: 0
    },
    source: Cesium.Material.EllipsoidFadeMaterialSource
  },
  translucent: function () {
    return true
  }
})
console.log('成功加载扩散圆材质')


// ? 如何使用
// import EllipsoidFadeMaterialProperty from '@/utils/Material/EllipsoidFadeMaterialProperty.js'

// material: new EllipsoidFadeMaterialProperty({
//   color: new Cesium.Color(1.0, 1.0, 0.0, 0.8),
//   duration: 3000,
// })
