---
group: canvas
toc: content
order: 5
---

# 像素缓冲区
## 使用createImageData() 创建像素缓冲区

- createImageData 创建一个新的、空白的、指定大小的 ImageData 对象。 新对象中默认像素值都是 transparent(透明的)。
- 两个参数时，第一个参数 ImageData 新对象的宽度，第二个参数 ImageData 新对象的高度。
- 一个参数时，传入参数为ImageData 对象。从现有的 ImageData 对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制。
## 生成黑白交替的纹理

1. 这个功能很简单。我们创建一个新的缓冲区，遍历缓冲区的像素，根据 x 和 y 坐标设置像素颜色，然后将图像数据放回画布。
2. 需要注意的是，像素缓冲区也只是一个一维数组。所以我们必须自己计算像素坐标索引。
3. 每个像素分量都有一个整数值。像素依次由 红色、绿色、蓝色和alpha 分量组成，所以由4个值来确认一个像数的颜色。所以每次循环中都要注意，索引位置的计算。

```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      // 创建像数 缓冲区
      var data = c.createImageData(300, 200)
      console.log('data: ', data);
      // 循环 每个像数 -- 4个值 代表一个像数
      // -- 前三个值代表 颜色 第二个值 代表透明度
      for (var x = 0; x < data.width; x++) {
        for (var y = 0; y < data.height; y++) {
          var val = 0

          // 每4个像数 组合为一个 方块
          var horz = Math.floor(x / 4) % 2 == 0 // 宽
          var vert = Math.floor(y / 4) % 2 == 0 // 高
          if ((horz && !vert) || (!horz && vert)) {
            val = 255
          } else {
            val = 0
          }
          // data.width 一行像数 宽度
          var index = (y * data.width + x) * 4 // 计数 -- 每个像数 4个值
          data.data[index] = Math.random() * 255  // 红
          data.data[index + 1] = Math.random() * 255  // 绿
          data.data[index + 2] = Math.random() * 255  // 蓝
          data.data[index + 3] = 255 // 透明度
        }
      }
      // 将图像数据放回画布
      c.putImageData(data, 0, 0)
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
## 图片垂直镜像
```tsx
import { useRef, useEffect } from 'react';
import logo from './logo.jpg';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      var img = new Image()
      img.onload = function () {
        // 绘制图片
        c.drawImage(img, 0, 0)
        // 获取画布 上数据缓冲区
        var data = c.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        // 它本质上和之前的没撒区别，只是换了一种对像素的操作方式。这会将彩色图像变成黑白图像。
        for (let n = 0; n < data.width * data.height; n++) {
          var index = n * 4
          var r = data.data[index]
          var g = data.data[index + 1]
          var b = data.data[index + 2]
          var v = r * 0.21 + g * 0.71 + b * 0.07 // 颜色加权
          data.data[index] = v
          data.data[index + 1] = v
          data.data[index + 2] = v
        }
        // 创建新的 缓冲区
        var newData = c.createImageData(canvasRef.current.width, canvasRef.current.height)
        // 对像素数据 反转
        for (let i = 0, h = data.height; i < h; i++) {
          for (let j = 0, w = data.width; j < w; j++) {
            newData.data[i * w * 4 + j * 4 + 0] = data.data[(h - i) * w * 4 + j * 4 + 0]
            newData.data[i * w * 4 + j * 4 + 1] = data.data[(h - i) * w * 4 + j * 4 + 1]
            newData.data[i * w * 4 + j * 4 + 2] = data.data[(h - i) * w * 4 + j * 4 + 2]
            newData.data[i * w * 4 + j * 4 + 3] = data.data[(h - i) * w * 4 + j * 4 + 3]
          }
        }
        // 新缓冲区 放回画布
        c.putImageData(newData, 0, 0)
      }
      img.src = logo;
    }
  },[])
  return <canvas width="500" height="500" ref={canvasRef}/>
}
```
## 复合模式

当我们同时绘制多个图形时，通过设置复合模式，相交处的像是，根据某个公式计算最终像素。
通常我们使用source-over，源像素（您正在绘制的像素）将被绘制在目标像素上。
lighter 显示源图像 + 目标图像,相交处用的白最大信号值。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      c.globalCompositeOperation = 'lighter' // 设置复合模式
      c.fillStyle = '#000222' // 填充颜色

      for (var i = 0; i < 50; i++) {
        c.beginPath()
        c.arc(Math.random() * 400, Math.random() * 400, 40, 0, Math.PI * 2)
        c.closePath()
        c.fill()
      }
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
## 阴影
根据 `shadowColor`、`shadowOffsetX`、`shadowOffsetY`、`shadowBlur`属性来设置，阴影的颜色、偏移和模糊级数来模拟不同的效果
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      c.fillStyle = 'black'
      c.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      c.shadowColor = 'white' // 设置或返回用于阴影的颜色
      c.shadowOffsetX = 0 // 设置或返回形状与阴影的水平距离
      c.shadowOffsetY = 0
      c.shadowBlur = 30 // 设置或返回阴影的模糊级数

      c.font = 'bold 80pt Arial'
      c.fillStyle = '#55cc55'
      c.fillText('快乐', 30, 200)
    }
  },[])
  return <canvas height="300" ref={canvasRef}/>
}
```
