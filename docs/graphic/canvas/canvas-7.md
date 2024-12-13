---
group: canvas
toc: content
order: 7
---

# 文字粒子

```tsx
import { useRef, useEffect } from 'react';
var particles = [] // 所有粒子
/**
 * 粒子
 * */
function Particle(option) {
  this.radius = option.radius || 6
  this.color = option.color || '#000'
  this.x = option.x || 0
  this.y = option.y || 0
  this.dynamicRadius = option.radius || 6
}
Particle.prototype.draw = function (ctx) {
  var x, y
  x = this.x * 3 + 50
  y = this.y * 3 + 50
  ctx.beginPath()
  ctx.arc(x, y, this.dynamicRadius, 0, 2 * Math.PI, false)
  ctx.fillStyle = this.color
  ctx.fill()
}
Particle.prototype.update = function () {
  this.dynamicRadius = 5 + 2 * Math.sin(((new Date() / 1000) % 1000) * this.radius)
}
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  useEffect(()=>{
    if(canvasRef.current){
      // var ctx = canvasRef.current.getContext("2d");
      //  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
       function getImage(canvas, ctx) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        var diff = 4
        // 遍历所有的数组
        for (var j = 0; j < canvas.height; j += diff) {
          for (var i = 0; i < canvas.width; i += diff) {
            // 当有颜色时 默认透明度 是 255
            var opacityIndex = (i + j * canvas.width) * 4 + 3
            if (imageData.data[opacityIndex] > 0) {
              // 放入粒子对象
              var par = new Particle({ radius: 0, color: '#000', x: i, y: j })
              particles.push(par)
              // particles.draw(newCtx)
            }
          }
        }
      }
      function loadCanvas(value) {
        var fontSize = 100 // 文本大小
        var diff = 4
        // 文本长度
        var width = calWordWidth(value, fontSize)
        var ctxTxt = canvasRef.current.getContext("2d");
        // canvasRef.current.width = width
        // canvasRef.current.height = fontSize
        ctxTxt.font = fontSize + 'px Microsoft YaHei'
        ctxTxt.fillStyle = 'orange'
        ctxTxt.fillText(value, 0, fontSize - 16) // 调整绘制字符位置

        getImage(canvasRef.current, ctxTxt)
        requestAnimationFrame(function loop() {
          // requestAnimationFrame(loop)
          ctxTxt.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          for (const particle of particles) {
            particle.update()
            particle.draw(ctxTxt)
          }
        })
      }
      // 传入文本
      loadCanvas('学习')

      /**
       * 计算 文本总长度
       * */
      function calWordWidth(value, fontSize) {
        var arr = value.split('')
        var reg = /\w/
        var width = 0
        arr.forEach(function (item, index) {
          if (reg.test(item)) {
            width += fontSize // 字母宽度
          } else {
            width += fontSize + 10 // 汉字宽度
          }
        })
        return width
      }
    }
  },[])
  return <canvas width="800" height="500" ref={canvasRef}/>
}
```
