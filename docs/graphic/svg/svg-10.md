---
group: svg
toc: content
order: 9
---
# 滤镜

什么是滤镜

使用滤镜后，在SVG中不会直接将图形渲染到画布上。是先将图形的像素保存到缓存中，然后将滤镜指定的操作应用图形的像素对象中，然后在把新的图形像素对象展示在画布上。

使用filter元素指定一组（滤镜元素），在渲染图形对象时，将该操作应用在最终图形上。

## 滤镜元素

滤镜元素有很多，每一个元素代表一种功能。
```
feBlend 
feColorMatrix
feComponentTransfer
feComposite
feConvolveMatrix
feDiffuseLighting
feDisplacementMap
feFlood
feGaussianBlur
feImage
feMerge
feMorphology
feOffset
feSpecularLighting
feTile
feTurbulence
feDistantLight
fePointLight
feSpotLight
```
## 使用滤镜

- 需要使用 `<filter>` 标签来定义一个 SVG 滤镜。设置唯一标识id属性，SVG 图形使用这个 id 来引用滤镜。


1. 使用`feGaussianBlur`创建模糊效果。`in="SourceGraphic"`属性定义了模糊效果要应用于整个图片，`stdDeviation` 属性定义了模糊的程度。
```jsx
export default () => {
  return <svg>
    <defs>
      <filter id="ga2" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
      </filter>
    </defs>
    <defs>
      <filter id="ga3" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5"></feGaussianBlur>
      </filter>
    </defs>
    <rect x="10" y="10" width="100" height="100" fill="#ccc" filter="url(#ga2)"></rect>
    <rect x="140" y="10" width="100" height="100" fill="#ccc" filter="url(#ga3)"></rect>
  </svg>
}
```
2. 使用多个滤镜模拟阴影效果。

  - `in`属性简介：`SourceGraphic` 表示图形元素自身将作为 `<filter>` 原始输入。SourceAlpha 图形元素自身将作为 `<filter>` 原语的原始输入，只使用元素的非透明部分。
  - `result="blur"` 通过 `result`元素，产出一个中间滤镜，唯一标识为`blur`。其他滤镜通过`in`属性引入中间滤镜，在已有的效果上继续操作。
  - `feOffset`元素，创建位移效果。
  - `feMerge`元素，合并多个效果。子元素`feMergeNode`，获取滤镜的效果输出。
  - `<feMergeNode in="offsetBlur" />` 输出offsetBlur的结合滤镜效果。
  - `<feMergeNode in="SourceGraphic" />` 输出SourceGraphic图形元素自身。

```jsx
export default () => {
  return <svg>
    <defs>
      <filter id="ga5" x="0" y="0">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
        <feOffset in="blur" dx="10" dy="10" result="offsetBlur"></feOffset>
        <feMerge>
          <feMergeNode in="offsetBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="10" y="10" width="100" height="100" fill="black" filter="url(#ga5)"></rect>

  </svg>
}
```
## 其他滤镜使用
- feColorMatrix滤镜

  feColorMatrix元素，通过修改矩阵对颜色进行变换。
```jsx
export default () => {
  return <svg>
    <defs>
      <filter id="matrix">
        <feColorMatrix
          type="matrix"
          values="
          0 0 0 0   0
          0 0 0 0.9 0
          0 0 0 0.9 0
          0 0 0 1   0
        "
        ></feColorMatrix>
      </filter>
    </defs>
    <text x="10" y="100" font-size="40" style={{filter: 'url(#matrix)'}}>你好 SVG</text>
  </svg>
}
```
## feBlend 滤镜

混合模式滤镜。允许使用任意的JPG\PNG\SVG文件或带有id属性SVG元素作为输入源。

模式:
1. normal — 正常
2. multiply — 正片叠底
3. screen — 滤色
4. darken — 变暗
5. lighten— 变亮
```jsx
import logo from './logo.jpg'
export default () => {
  return <svg width="800" height="300">
    <defs>
      <filter id="ga12" x="0" y="0" >
        <feImage xlinkHref={logo} result="img1" />
        <feImage xlinkHref={logo} result="img2" />
        <feBlend mode="darken" in="img1" in2="img2" />
      </filter>
    </defs>
    <defs>
      <filter id="ga13" x="0" y="0" >
        <feImage xlinkHref={logo} result="img1" />
        <feImage xlinkHref={logo} result="img2" />
        <feBlend mode="multiply" in="img1" in2="img2" />
      </filter>
    </defs>
    <rect x="10" y="10" width="280" height="160" fill="black" filter="url(#ga12)"></rect>
    <rect x="350" y="10" width="280" height="160" fill="black" filter="url(#ga13)"></rect>
  </svg>
}
```
