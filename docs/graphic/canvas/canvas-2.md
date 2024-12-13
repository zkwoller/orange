---
group: canvas
toc: content
order: 2
---
# 绘制图表
Canvas元素是类似于DIV的块级DOM元素，因此您可以对其进行样式设置或定位，就像在页面中进行其他操作一样。

## 折线图 
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      // 绘制背景
      c.fillStyle = "gray";
      c.fillRect(0, 0, 500, 500);
        // 绘制轴线
      c.fillStyle = "black";
      c.lineWidth = 2.0;
      c.beginPath();
      c.moveTo(30, 10);
      c.lineTo(30, 460);
      c.lineTo(490, 460);
      c.stroke();
      // 绘制 Y轴 刻度值
      c.fillStyle = "black";
      for (var i = 0; i < 6; i++) {
        // 绘制是 从上向下绘制的
        c.fillText((5 - i) * 20 + "", 4, i * 80 + 60);
        c.beginPath();
        c.moveTo(25, i * 80 + 60);
        c.lineTo(30, i * 80 + 60);
        c.stroke();
      }

      // 绘制 X 轴刻度
      var labels = ["一", "二", "三", "四", "五"];
      // 添加刻个 从左向右绘制
      for (var i = 0; i < 5; i++) {
        c.fillText(labels[i], 50 + i * 100, 475);
        c.beginPath();
        c.moveTo(55 + i * 100, 460);
        c.lineTo(55 + i * 100, 465);
        c.stroke();
      }

      // 添加数据
      var data = [20, 10, 20, 30, 54];
      c.beginPath();
      for (var i = 0; i < data.length; i++) {
        var dp = data[i];
        if (dp) {
          if (i != 0) {
            c.lineTo(55 + i * 100, 460 - dp * 4);
          }
          c.stroke();
          c.beginPath();

          c.arc(55 + i * 100, 460 - dp * 4, 3, 0, 2 * Math.PI);
          c.fill();
          c.beginPath();

          c.moveTo(55 + i * 100, 460 - dp * 4);
        } else {
          c.beginPath();
        }
      }
      // 获取最大值
      var maxData = [...data].sort((a, b) => a - b)[data.length - 1];

      // 添加渐变色
      var g1 = c.createLinearGradient(0, 460 - maxData, 0, 460);
      g1.addColorStop(0, "rgba(5, 234, 200, 0.8)");
      g1.addColorStop(1, "rgba(5, 234, 200, 0.1)");
      c.fillStyle = g1;

      // 绘制填充
      for (var i = 0; i < data.length; i++) {
        var dp = data[i];
        if (dp) {
          if (data[i + 1]) {
            // 绘制 当前点 和 后一个点组合成 的图形 填充
            c.moveTo(55 + i * 100, 460 - dp * 4);
            c.lineTo(55 + (i + 1) * 100, 460 - data[i + 1] * 4);
            c.lineTo(55 + (i + 1) * 100, 460);
            c.lineTo(55 + i * 100, 460);

            c.fill();
            c.beginPath();
          }
        } else {
          c.beginPath();
        }
      }
    }
  },[])
  return <canvas width="500" height="500" ref={canvasRef}/>
}
```
1. 通过循环数据计算出点的位置。
2. 需要注意的是画布的坐标，是以左上角为原点(0,0)。所以 y轴 计算高度是用 y轴线的高度 - 坐标轴和数据的比例 = 显示位置。

## 饼形图
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var c = canvasRef.current.getContext("2d");
      // 现在进行数据总值计算和颜色规定;
      // 数据
      var data = [100, 80, 10, 30, 200];
      // 颜色
      var colors = ["orange", "green", "blue", "yellow", "teal"];
      // 总值
      var total = 0;
      for (var i = 0; i < data.length; i++) {
        total += data[i];
      }

      //
      var proportion = 0;
      for (var i = 0; i < data.length; i++) {
        // 比例
        var fraction = data[i] / total;
        // 弧度
        var angle = proportion + fraction * Math.PI * 2;

        // 设置颜色
        var grad = c.createRadialGradient(250, 250, 0, 250, 250, 100);
        grad.addColorStop(0, "white");
        grad.addColorStop(1, colors[i]);
        c.fillStyle = grad;

        // 绘制弧形图
        c.beginPath();
        c.moveTo(250, 250);
        c.arc(250, 250, 100, proportion, angle, false);
        c.lineTo(250, 250);
        // 填充
        c.fill();

        // 边框
        c.strokeStyle = "black";
        c.stroke();

        // 修改下一次起点
        proportion = angle;
      }

    }
  },[])
  return <canvas width="500" height="500" ref={canvasRef}/>
}
```
