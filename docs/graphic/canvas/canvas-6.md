---
group: canvas
toc: content
order: 6
---

# 圆球水波

## 绘制水波曲线
1. 水波曲线最简单的生成公式就是使用三角函数。这里使用Math.sin()来生成曲线。
2. 使用正弦曲线公式，根据外部参数来控制曲线在画布中的位置和在坐标轴中的位置。
3. 这里比较简单，通过clearRect()清空画布，然后修改sinX大小，让曲线动起来。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
      var width = canvasRef.current.width
      var height = canvasRef.current.height

      var sinX = 0 // x轴
      var offsetY = 0.3 // 高度  -- 越大高度越高

      drawWave(ctx, sinX, offsetY, 0.06, 4, '#a4def6')

      /**
       * 波浪线
       * @param ctx --canvas上下文
       * @param sinX -- 波浪线 sin坐标中 x轴的位置
       * @param offsetY -- 波浪线 在画布中的 高度比 画布垂直距离
       * @param waveW -- 波浪宽度
       * @param waveH -- 波浪深度
       * */
      function drawWave(ctx, sinX, offsetY, waveW, waveH, color) {
        var canvasW = width
        var canvasH = height
        var offsetX = 0 // 波浪线 初始x轴坐标
        ctx.beginPath()
        ctx.lineWidth = 1
        for (var x = offsetX; x < canvasW; x += 20 / canvasW) {
          // 正弦曲线公式：y = Asin(ωx+φ) + k
          var y = waveH * Math.sin((offsetX + x) * waveW + sinX) + (1 - offsetY) * canvasH
          ctx.lineTo(x, y)
        }
        ctx.stroke()

        // 填充背景 水
        ctx.lineTo(canvasW, canvasH)
        ctx.lineTo(offsetX, canvasH)
        ctx.fillStyle = color
        ctx.fill()

      }
      var offsetY = 0.3 // 高度  -- 越大高度越高

      var speed = 0.2 // x轴 移动距离

      var count = 0
      var temInterval = setInterval(() => {
        draw(count)
        count++
      }, 16)
      // 绘制 波浪
      function draw(countNum) {
        ctx.clearRect(0, 0, width, height)
        sinX = countNum * speed
        drawWave(ctx, sinX, offsetY, 0.06, 4, '#a4def6')
      }
    }
  },[])
  return <canvas width="100" height="200" ref={canvasRef}/>
}
```

## 在圆球加入水波

- 前面我们只让轮询执行100次，这里直接获取对应的数字，展示在页面上就好了。需要注意文本绘制要在最后执行，保证文字在最上层。
- 这里多绘制了一成水波，让小球更有立体感。
```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      var ctx = canvasRef.current.getContext("2d");
      var width = canvasRef.current.width
      var height = canvasRef.current.height

      var sinX = 0 // x轴
      var offsetY = 0.3 // 高度  -- 越大高度越高

      var speed = 0.2 // x轴 移动距离

      var offsetYRange = 1.1 // 高度比
      // 裁剪圆形区
      function drawContainer() {
        var pointR = width / 2
        var lineWidth = 5
        var circleR = pointR - lineWidth

        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.arc(pointR, pointR, circleR, 0, 2 * Math.PI)
        ctx.strokeStyle = 'rgba(192,225,242,0.8)'
        ctx.stroke()
        ctx.clip()
      }
      /**
       * 波浪线
       * @param ctx --canvas上下文
       * @param sinX -- 波浪线 sin坐标中 x轴的位置
       * @param offsetY -- 波浪线 在画布中的 高度比 画布垂直距离
       * @param waveW -- 波浪宽度
       * @param waveH -- 波浪深度
       * */
      function drawWave(ctx, sinX, offsetY, waveW, waveH, color) {
        var canvasW = width
        var canvasH = height
        var offsetX = 0 // 波浪线 初始x轴坐标
        ctx.beginPath()
        ctx.lineWidth = 1
        for (var x = offsetX; x < canvasW; x += 20 / canvasW) {
          // 正弦曲线公式：y = Asin(ωx+φ) + k
          var y = waveH * Math.sin((offsetX + x) * waveW + sinX) + (1 - offsetY) * canvasH
          ctx.lineTo(x, y)
        }
        ctx.stroke()

        // 填充背景 水
        ctx.lineTo(canvasW, canvasH)
        ctx.lineTo(offsetX, canvasH)
        ctx.fillStyle = color
        ctx.fill()

      }
      drawContainer()

      // 绘制 波浪
      function draw(countNum) {
        ctx.clearRect(0, 0, width, height)

        const num = offsetYRange / 100
        offsetY = countNum * num

        sinX = countNum * speed
        drawWave(ctx, sinX, offsetY, 0.06, 4, '#a4def6')
        drawWave(ctx, sinX + 2, offsetY - 0.02, 0.06, 6, '#79d4f9')
        drawText(countNum)
      }

      var count = 0
      var temInterval = setInterval(() => {
        if (count <= 100) {
          draw(count)
        } else {
          clearInterval(temInterval)
        }
        count++
      }, 50)

      /**
       * 百分比文字
       * */
      function drawText(countNum) {
        var size = width / 4 - 5
        ctx.font = 'bold ' + size + 'px Microsoft Yahei'
        let txt = countNum + '%'
        ctx.fillStyle = '#f6b71e'
        ctx.textAlign = 'center'
        ctx.fillText(txt, width / 2 + 2, width / 2 + 5)
      }
    }
  },[])
  return <canvas width="100" height="200" ref={canvasRef}/>
}
```
