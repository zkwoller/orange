---
group: css
order: 1
toc: content
---
# flex

## flex模型

主轴（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 main start 和 main end。
交叉轴（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。

![](./images//flex_terms.png)

弹性盒子提供了 `flex-direction` 这样一个属性，它可以指定主轴的方向（弹性盒子子类放置的地方）——它默认值是 row，这使得它们在按你浏览器的默认语言方向排成一排（在英语/中文浏览器中是从左到右）。

由 `flex-direction` 定义，可以取 4 个值：
- row
- row-reverse
- column
- column-reverse

与主轴垂直的称为交叉轴；

## 换行

`flex-wrap: wrap;`

## 对齐的属性

`justify-content` - 控制主轴（横轴）上所有 flex 项目的对齐。
`align-content` - 控制“多条主轴”的 flex 项目在交叉轴的对齐。
`align-items` - 控制交叉轴（纵轴）上所有 flex 项目的对齐。
`align-self` - 控制交叉轴（纵轴）上的单个 flex 项目的对齐。

`flex-grow` 该元素获得（伸张）多少正可用空间（positive free space）？
`flex-shrink` 该元素要消除（收缩）多少负可用空间（negative free space）？
`flex-basis` 在该元素未伸张和收缩之前，它的大小是多少？
