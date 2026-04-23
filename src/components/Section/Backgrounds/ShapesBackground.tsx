"use client"
import React, { useRef, useEffect } from 'react'

interface ShapesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.35,
  primaryColor = 'var(--primary)',
  secondaryColor = 'var(--secondary)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrame: number
    let shapes: Array<{x: number, y: number, type: number, speed: number, size: number, rotation: number, rotSpeed: number}>
    let time = 0
    
    const initShapes = (w: number, h: number) => {
      const count = Math.floor(w * h / 8000)
      shapes = []
      for (let i = 0; i < count; i++) {
        shapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          type: Math.floor(Math.random() * 5),
          speed: 0.2 + Math.random() * 1,
          size: 16 + Math.random() * 32,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02
        })
      }
    }
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      initShapes(canvas.width, canvas.height)
    }
    
    const drawShape = (ctx: CanvasRenderingContext2D, shape: any, color: string, globalAlpha: number) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.scale(1 + Math.sin(time * 0.5 + shape.x * 0.01) * 0.1, 1)
      ctx.beginPath()
      
      switch(shape.type) {
        case 0: // triangle
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          break
        case 1: // rectangle
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case 2: // hexagon
          for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI * 2 / 6
            const x = Math.cos(angle) * shape.size / 2
            const y = Math.sin(angle) * shape.size / 2
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          break
        case 3: // cross
          ctx.rect(-shape.size / 6, -shape.size / 2, shape.size / 3, shape.size)
          ctx.rect(-shape.size / 2, -shape.size / 6, shape.size, shape.size / 3)
          break
        case 4: // chevron
          ctx.moveTo(-shape.size / 2, -shape.size / 4)
          ctx.lineTo(0, shape.size / 4)
          ctx.lineTo(shape.size / 2, -shape.size / 4)
          break
      }
      
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = globalAlpha
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.globalAlpha = globalAlpha * 0.7
      ctx.stroke()
      ctx.restore()
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      for (const shape of shapes) {
        shape.x += shape.speed * (Math.sin(time * 0.2) * 0.5 + 0.5)
        shape.rotation += shape.rotSpeed
        if (shape.x > w + shape.size) shape.x = -shape.size
        if (shape.x < -shape.size) shape.x = w + shape.size
        
        const isPrimary = Math.floor(shape.x / 40 + shape.y / 40) % 2 === 0
        const color = isPrimary ? primaryColor : secondaryColor
        const dynamicOpacity = 0.15 + Math.sin(shape.x * 0.02 + shape.y * 0.02 + time) * 0.1
        drawShape(ctx, shape, color, dynamicOpacity * opacity)
      }
      
      time += 0.033
      animationFrame = requestAnimationFrame(draw)
    }
    
    window.addEventListener('resize', resize)
    resize()
    draw()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, primaryColor, secondaryColor])
  
  return <canvas ref={canvasRef} className={`absolute inset-0 ${zIndex} pointer-events-none`} />
}

export default ShapesBackground
