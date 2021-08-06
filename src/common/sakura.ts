// IIFE
(function () {
  let canvas, ctx
  const points = []
  const maxDist = 100
  const img1 = new Image()
  const img2 = new Image()
  img1.src = require('../static/img/Sakura1.png')
  img2.src = require('../static/img/sakura2.png')

  function init () {
    // Add on load scripts
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    resizeCanvas()
    generatePoints(60)
    pointFun()
    setInterval(pointFun, 25)
    window.addEventListener('resize', resizeCanvas, false)
  }
  // Particle constructor
  function point () {
    const x = Math.random() * (canvas.width + maxDist) - (maxDist / 2)
    const y = Math.random() * (canvas.height + maxDist) - (maxDist / 2)
    const z = (Math.random() * 0.5) + 0.5
    const vx = ((Math.random() * 5) - 0.1) * z
    const vy = ((Math.random() * 1.5) + 1.5) * z
    const fill = 'rgba(255,255,255,' + ((0.5 * Math.random()) + 0.5) + ')'
    points.push({ x, y, z, vx, vy, fill })
  }
  // Point generator
  function generatePoints (amount) {
    for (let i = 0; i < amount; i++) {
      // eslint-disable-next-line new-cap,@typescript-eslint/no-unused-vars
      point()
    }
    // console.log(points);
  }
  // Point drawer
  function draw (obj) {
    ctx.beginPath() // 开始一条路径
    ctx.strokeStyle = 'transparent' // 设置或返回用于笔触的颜色、渐变或模式
    ctx.fillStyle = obj.fill // 设置或返回用于填充绘画的颜色、渐变或模式
    // ctx.arc(obj.x,obj.y,obj.dia,0,2*Math.PI);
    ctx.drawImage(img1, obj.x, obj.y, 10, 10)
    ctx.drawImage(img2, obj.x, obj.y, 9, 9)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }
  // Updates point position values
  function update (obj) {
    obj.x += obj.vx
    obj.y += obj.vy
    if (obj.x > canvas.width + (maxDist / 2)) {
      obj.x = -(maxDist / 2)
    } else if (obj.x < -(maxDist / 2)) {
      obj.x = canvas.width + (maxDist / 2)
    }
    if (obj.y > canvas.height + (maxDist / 2)) {
      obj.y = -(maxDist / 2)
    } else if (obj.y < -(maxDist / 2)) {
      obj.y = canvas.height + (maxDist / 2)
    }
    return obj
  }
  //
  function pointFun () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < points.length; i++) {
      draw(points[i])
      points[i] = update(points[i])
    }
  }

  function resizeCanvas () {
    canvas.width = window.innerWidth
    canvas.height = 180
    pointFun()
  }
  // Execute when DOM has loaded
  document.addEventListener('DOMContentLoaded', init, false)
})()
