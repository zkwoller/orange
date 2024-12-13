---
nav:
  title: 图形
  order: 12
group: canvas
toc: content
order: 1
---
# 基础信息

## 什么是画布
Canvas是HTML的2D绘图API，并且大多数浏览器都支持它。简单理解，就是浏览器在屏幕上为您提供了一个矩形区域，您可以在该区域画图。包括绘制线条，形状，图像，文本等。

## 对比页面其余绘图部分

- SVG： SVG是绘制可缩放的矢量图形。每个形状都有一个对象，您可以将事件处理程序附加到该对象。放大缩小形状都会保持平滑。而 "画布" 是将图形像素化。
- CSS： CSS是通过样式化DOM元素来实现图形。由于在Canvas中绘制的东西没有DOM对象，所以不能对其设置CSS样式。CSS仅会影响Canvas本身的矩形区域，因此您可以设置边框和背景色。
- DOM动画： 使用 DOM或文档对象模型在屏幕上绘制图形。通过使用CSS或JavaScript来移动对象的DOM动画在某些情况下比使用Canvas进行动画更平滑，但这取决于您的浏览器实现。

## 什么时候使用画布
1. 当你只需要在屏幕上渲染现有形状时，可以直接使用SVG。
2. 当页面上大多数动画都有静态原型DOM时，或者要使用3D变换时，可以直接CSS或DOM动画。
3. 对于展示图表，图形，动态图，还有视频游戏，可以直接使用Canvas。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      c.fillStyle = "rgb(0,0,0)";
      c.beginPath();
      c.moveTo(300, 20);
      c.lineTo(100, 50);
      c.lineTo(150, 80);
      c.closePath();
      c.fill();
      c.strokeStyle = "rgb(0,128,0)";
      c.lineWidth = 5;
      c.stroke();
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
1. `var c = canvas.getContext("2d")` 先创建画布上下文。
2. `c.fillStyle = "rgb(0,0,0)"` 设置填充颜色。填充颜色和笔触颜色设置后就不会自动改变，要修改后续绘图颜色，需要重新设置。格式可以是任何有效的CSS颜色表示法，如`"#000000"`，名称或`rgb()`函数。
3. `.beginPath()` 表示开始一条路径，或重置当前的路径。
4. `.moveTo(300, 20)` 移动绘制点的位置。
5. `.lineTo(100, 50)` 添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）。可以理解为上一个点到这个点绘制一条连接线段。
6. `.closePath()` 进行设置从当前点到开始点的路径。
7. `.fill()` 填充当前的图像（路径）。使用定义好的填充颜色填充图像背景。
8. `c.strokeStyle = "rgb(0,128,0)"` 设置笔触颜色。简单理解为画画时使用笔的颜色。
9. `c.lineWidth = 5 `设置线条宽度。
10. `.stroke()` 开始在画布上绘制之前设置的图形。
## 路径

画布仅直接支持矩形形状。要绘制任何其他形状，您必须使用路径自己绘制。

1. `.bezierCurveTo(50, 90, 150, -30, 170, 30)` 绘制一条三次贝塞尔曲线。三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      c.fillStyle = "red";
      c.beginPath();
      c.moveTo(10, 30);
      c.bezierCurveTo(50, 90, 150, -30, 170, 30);
      c.lineTo(200, 90);
      c.lineTo(10, 90);
      c.closePath();
      c.fill();
      c.lineWidth = 4;
      c.strokeStyle = "黑色";
      c.stroke();
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
## 文本
画布也可以绘制文本。font属性与CSS中font属性等效的。

1. createLinearGradient(0, 0, 300, 0) 创建线性的渐变对象。主要用于设置渐变背景色。
2. addColorStop(0, "white") 规定 gradient 对象中的颜色和位置。可以设置多个来展示不同位置的渐变色。
3. font 设置字体样式。与 CSS font 属性相同
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      var grad = c.createLinearGradient(0, 0, 300, 0);
      grad.addColorStop(0, "white");
      grad.addColorStop(0.5, "red");
      grad.addColorStop(1, "black");
      c.fillStyle = grad;
      c.font = "96px Arial";
      c.fillText("添加文本", 20, 150);
    }
  },[])
  return <canvas ref={canvasRef} width="800" height="300" />
}
```
