---
nav:
  title: 图形
  order: 12
group: svg
toc: content
order: 1
---
# 基础入门

## SVG是什么
- SVG是一种XML应用，用来表示可伸缩的矢量图形。
- 通过XML文本来描述二维图形和绘图程序的语言。

## SVG的优势
- 图像质量不下降的情况下放大。
- 所有的图形有关信息被存储为纯文本，具有XML的开放性、可移植性和可交互性。
- 在HTML中使用时，每个形状都有一个对象，可以将事件处理程序附加到每个对象上。

## 简单示例
```jsx
export default () => {
  return  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full" width="300" height="200">
    <rect width="100%" height="100%" stroke="#FF5151" stroke-width="4" fill="#FF8EFF" />
    <circle cx="150" cy="100" r="80" fill="#BE77FF" />
    <text x="150" y="110" font-size="16" text-anchor="middle" fill="white">你好</text>
  </svg>
}

```
- SVG 代码都是在 <svg> 元素中，这是根元素。version 属性可定义所使用的 SVG 版本，xmlns 属性可定义 SVG 命名空间。
- 使用 <rect> 绘制了一个矩形。stroke设置边框颜色。stroke-width设置边框宽度。fill设置矩形的背景颜色。
- 使用 <circle> 绘制了一个圆形。cx和cy设置元素在svg中的位置，(0,0)位于视口的左上角。
- 使用 <text> 绘制了一个文本。x和y设置元素在svg中的位置。font-size设置字体大小。text-anchor设置文本排序。
- SVG 中元素渲染顺序是后面渲染的元素覆盖前面渲染的元素。
