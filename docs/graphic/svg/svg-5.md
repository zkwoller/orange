---
group: svg
toc: content
order: 5
---

# 坐标系统变换

SVG中自带transform属性，控制图形的坐标变换。它与css3中的transform是有区别的，css3中变换是以元素的中心点变换，SVG中中的transform是相对于画布的左上角计算的。

## translate 位移

- 用于设置元素的位移变换。
- 参数格式 translate(tx[ ty]) 参数值之间使用逗号,或者直接空格分隔，但是不能包含单位。
```jsx
export default () => {
  return <svg width="400" height="400">
    <circle cx="50" cy="50" r="50" fill="green" stroke="none" transform="translate(100 100)"></circle>
  </svg>
}
```
- 位移也是支持多声明累加的。
```jsx
export default () => {
  return <svg width="400" height="400">
    <circle
      cx="50"
      cy="50"
      r="50"
      fill="green"
      stroke="none"
      transform="translate(100 100) translate(100 100)"
    ></circle>
  </svg>
}
```
## rotate 旋转
- 用于设置元素的旋转变换。需要注意，旋转的是整个坐标不是元素本身，其中心点是画布的左上角。
- 参数格式rotate(angle [ x y])。angle代表旋转角度，[ x y]可选参数设置旋转中心点，参数都不能包含单位。
```jsx
export default () => {
  return <svg width="400" height="400">
    <rect x="20" y="30" width="100" height="50" fill="green" transform="rotate(45)" />
    <rect x="20" y="30" width="100" height="50" fill="black" transform="rotate(45 60 40)" />
  </svg>
}
```
## scale缩放
- 缩放坐标系统。
- 参数格式scale(sx[, sy])。 sx表示横坐标缩放比例，sy表示纵坐标缩放比例，sy是可缺省的，如果缺失，表示使用和sx一样的值，也就是等比例缩放。
```jsx
export default () => {
  return <svg width="400" height="400">
    <rect x="100" y="50" width="100" height="50" fill="green" transform="scale(2,1.5)" />
  </svg>
}
```
- 因为是缩放坐标系统，元素的位置发生了变化，想以元素中心缩放就需要特殊处理。
```jsx
export default () => {
  return <svg width="400" height="400">
    <rect
      x="100"
      y="50"
      width="100"
      height="50"
      fill="green"
      transform="translate(150 75) scale(2,1.5) translate(-150 -75)"
    />
    <rect
      x="100"
      y="50"
      width="100"
      height="50"
      fill="green"
      transform="translate(150 75) scale(2,1.5)"
    />

  </svg>
}
```
## skew斜切
- 坐标系统斜切变换。只支持X轴和Y轴分开设置，skewX或者skewY。
- 需要注意，多声明累加在一起的斜切变换是不一样的，因为是以画布的左上角为圆心的。

```jsx
export default () => {
  return <svg width="400" height="400">
    <rect x="20" y="30" width="100" height="50" fill="green" transform="skewX(45)" />
  </svg>
}
```
## matrix 矩阵变换
- 用于设置元素的，平移、旋转、缩放等。
- 理解CSS3 transform中的Matrix(矩阵)，其原理和css3中矩阵一样。

```jsx
export default () => {
  return <svg width="400" height="400">
    <rect x="20" y="30" width="100" height="50" fill="green" transform="matrix(1, 0, 0, 1, 30, 30)" />
  </svg>
}
```
