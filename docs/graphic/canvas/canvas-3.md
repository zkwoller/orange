---
group: canvas
toc: content
order: 3
---

# 绘图技巧

## 图案填充
canvas 除了使用颜色填充形状，也可以通过定义图案来填充形状。

1. 与渐变一样，都是相对于当前坐标系绘制图案。
2. 根据createPattern()绘制图像。函数的第二个参数，设置图片重复方向。
3. translate(0, 210) 将新的 (0,0) 位置设置为 (0,70)。再次绘制新的矩形。
```tsx
import { useRef, useEffect } from 'react';
import logo from './logo.jpg';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
        var img = new Image();
      img.addEventListener("load", loadHandler);
      img.src = logo;

      function loadHandler(e) {
        // createPattern() 在指定的方向上重复元图像
        var pat1 = c.createPattern(img, "repeat");
        c.fillStyle = pat1; // 设置为背景
        c.fillRect(0, 0, 600, 300);
        var pat2 = c.createPattern(img, "repeat-y");
        c.fillStyle = pat2;
        c.translate(0, 210); // 位移
        c.fillRect(0, 160, 600, 300);
      }
    }
  },[])
  return <canvas width="600" height="300" ref={canvasRef}/>
}
```
## 绘制组合图形
1. (Math.PI * degrees) / 180 弧度计算公式。
2. arc() 绘制弧形图形。根据修改绘图位置，组合计算好的图形，形成一个新的图形。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "#00ff00";
      // fillRect() 绘制有填充颜色的矩形
      ctx.fillRect(0, 0, 500, 500);

      // 线
      ctx.lineWidth = 1;

      // 绘制 白色半圆
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(250, 250, 100, getRads(-90), getRads(90), false);
      ctx.fill();

      // 绘制 黑色半圆
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(250, 250, 100, getRads(90), getRads(-90), false);
      ctx.fill();

      // 修改 绘制原点 绘制小球
      // 绘制 白色小圆
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(250, 200, 50, getRads(-90), getRads(90), true);
      ctx.fill();

      // 绘制 黑色小圆
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(250, 300, 50, getRads(-90), getRads(90), false);
      ctx.fill();

      // 绘制 小黑点
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(250, 200, 10, getRads(0), getRads(360), false);
      ctx.fill();

      // 绘制 小白点
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(250, 300, 10, getRads(0), getRads(360), false);
      ctx.fill();

      // 度 转换 弧度
      function getRads(degrees) {
        return (Math.PI * degrees) / 180;
      }
    }
  },[])
  return <canvas width="500" height="500" ref={canvasRef}/>
}
```
## Transforms 修改绘制原点
与许多2D API一样，Canvas 支持标准的平移，旋转和缩放转换。这使您可以在屏幕上绘制变换后的形状，而无需手动计算新点。

修改绘制点后，下一次的绘制会继续在上一次的位置改变。不做特殊操作是永久性的。当然，随着时间的流逝，这可能会造成混乱。您可以像这样撤消转换：
1. .save() 保存上一次的修改位置。
2. .restore() 恢复为之前的位置。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
     var data = [10, 60, 40, 50];
      ctx.fillStyle = "black";
      for (var i = 0; i < data.length; i++) {
        var dp = data[i];
        ctx.translate(100, 0);

        if (i === 2) {
          var rads = (30 * Math.PI * 2.0) / 360.0;
          ctx.rotate(rads);
        }
        ctx.fillRect(0, 0, 50, dp);
      }

      // for (var i = 0; i < data.length; i++) {
      //     ctx.save();
      //     var dp = data[i];
      //     ctx.translate(100, 0);
      //     if (i === 2) {
      //       var rads = (30 * Math.PI * 2.0) / 360.0;
      //       ctx.rotate(rads);
      //     }
      //     ctx.fillRect(0, 0, 50, dp);
      //     ctx.restore();
      // }
    }
  },[])
  return <canvas width="500" height="300" ref={canvasRef}/>
}
```
## 不透明度
通过Canvas API，使用globalAlpha属性控制任何绘图功能的不透明度。
1. 此不透明度设置适用于所有绘图操作。
2. 绘制完成后需要注意设置回来，以免影响后续操作。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(20, 20, 75, 50);
      // 调节透明度
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "blue";
      ctx.fillRect(50, 50, 75, 50);
      ctx.fillStyle = "green";
      ctx.fillRect(80, 80, 75, 50);
      ctx.globalAlpha = 1;
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
## 三次贝塞尔曲线
使用三次贝塞尔曲线，绘制线条时形成曲线的过程。
1. `bezierCurveTo()` 绘制一条三次贝塞尔曲线，三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。

```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
       ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 38, 71, 26, 50, 26);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 21, 63);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 26);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.stroke();
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
## 剪裁
剪切区域。它是Canvas之中由路径所定义的一块区域，这意味着任何绘图都只会在剪辑内部进行。简单来说就是根据clip()函数之前路径定义的图形来进行控制。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 400, 100);

      // 创建三角形路径
      ctx.beginPath();
      ctx.moveTo(200, 50);
      ctx.lineTo(250, 150);
      ctx.lineTo(150, 150);
      ctx.closePath();

      // 使用三角形作为剪辑
      ctx.clip();

      ctx.fillStyle = "yellow";
      ctx.fillRect(0, 0, 400, 120);
    }
  },[])
  return <canvas ref={canvasRef}/>
}
```
