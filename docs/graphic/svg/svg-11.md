---
group: svg
toc: content
order: 11
---

# 动画
SVG中的动画

- 在SVG中动画是根据`SMIL`规范来进行开发的。

SVG中有4个动画元素：


1. `set` 实现延迟功能。在规定时间之后，修改某个属性的值。
2. `animate` 实现单属性的过渡动画。
3. `animateTransform` 用于实现transform变换动画。
4. `animateMotion` 实现路径动画，让SVG各个图形，沿着指定路径运动。

## set

常用属性：
1. `attributeName` 属性名称。
2. `attributeType` 属性类型，参数 `CSS/XML/auto`。默认值auto。
3. `to` 变化到的值。
4. `begin` 延迟时间。
```jsx
export default () => {
  return <svg>
    <circle cx="100" cy="100" r="100" fill="green" stroke="none">
      <set attributeName="cx" to="160" begin="4s" />
    </circle>
  </svg>
}
```
## animate

常用属性：

1. `attributeName` 属性名称。
2. `attributeType` 属性类型，参数 `CSS/XML/auto`。默认值auto。
3. `from` 属性开始值。
4. `to` 属性结束值。
5. `dur` 动画过渡时间。
6. `repeatCount` 动画重复次数。设置为 `indefinite` 表示无限循环，一直执行。
7. `fill` 动画结束后，`freeze`表示冻结，`remove`表示恢复。
```jsx
export default () => {
  return <svg>
    <rect x="10" y="10" width="200" height="200" stroke="green" fill="none">
      <animate attributeName="width" attributeType="XML" from="200" to="20" dur="5s" fill="remove" repeatCount="indefinite"></animate>
    </rect>
  </svg>
}
```
## animateTransform

常用属性：
1. `attributeName` 属性名称。
2. `attributeType` 属性类型，参数 `CSS/XML/auto`。默认值auto。
3. `repeatCount` 动画重复次数。
4. `type transform`变换类型。
```jsx
export default () => {
  return <svg>
    <rect x="-10" y="-10" width="40" height="40" fill="ff9">
      <animateTransform
        attributeType="XML"
        attributeName="transform"
        repeatCount="indefinite"
        type="scale"
        from="1"
        to="4"
        dur="3s"
        fill="remove"
      ></animateTransform>
    </rect>
  </svg>
}
```
## animateMotion
常用属性：
1. `attributeName` 属性名称。
2. `attributeType` 属性类型，参数 `CSS/XML/auto`。默认值auto。
3. `path` 定义路径。
4. `dur` 动画过渡时间。
```jsx
export default () => {
  return <svg>
    <circle cx="10" cy="10" r="15" fill="green" stroke="none">
      <animateMotion path="M50,135C100,25 150,225 200,125" dur="6s" fill="remove" repeatCount="indefinite"></animateMotion>
    </circle>
  </svg>
}
```
```jsx
export default () => {
  return <svg>
    <circle cx="10" cy="10" r="15" fill="green" stroke="none">
      <animateMotion path="M50,135C100,25 150,225 200,125" dur="6s" fill="remove" repeatCount="indefinite"></animateMotion>
    </circle>
  </svg>
}
```
## CSS操作SVG动画
在内联模式下，SVG元素作为html标签。直接成为DOM的一部分，我们就能使用CSS直接控制。

简单使用
```jsx
import './style.css'
export default () => {
  return <svg>
    <circle id="cir" cx="100" cy="100" r="100" fill="green" stroke="none"></circle>
  </svg>
}
```
时钟动画
```jsx
import './style.css'
export default () => {
  return <svg height="100" width="100" viewBox="-52 -52 104 104">
    <circle fill="none" stroke="#DE3E35" stroke-width="6" stroke-miterlimit="10" cx="0" cy="0" r="48" />
    <line
      class="fast-line"
      fill="none"
      stroke-linecap="round"
      stroke="#DE3E35"
      stroke-width="6"
      stroke-miterlimit="10"
      x1="0"
      y1="0"
      x2="35"
      y2="0"
    ></line>
    <line
      class="slow-line"
      fill="none"
      stroke-linecap="round"
      stroke="#DE3E35"
      stroke-width="6"
      stroke-miterlimit="10"
      x1="0"
      y1="0"
      x2="0"
      y2="24"
    ></line>
  </svg>
}
```
