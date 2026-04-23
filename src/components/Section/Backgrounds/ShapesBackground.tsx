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
  primaryColor = '#C0392B',
  secondaryColor = '#E67E22'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrame: number
    let time = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      const spacing = 48
      const cols = Math.ceil(w / spacing) + 2
      const rows = Math.ceil(h / spacing) + 2
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing
          const y = i * spacing + Math.sin(time + i * 0.5) * 8
          const variant = (i + j) % 5
          const isPrimary = (i + j) % 2 === 0
          const color = isPrimary ? primaryColor : secondaryColor
          const alpha = 0.15 + Math.sin(i * 0.5 + j * 0.3 + time) * 0.1
          
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(Math.sin(time + i * 0.2 + j * 0.3) * 0.2)
          ctx.beginPath()
          
          if (variant === 0) {
            ctx.moveTo(0, -12)
            ctx.lineTo(12, 12)
            ctx.lineTo(-12, 12)
          } else if (variant === 1) {
            ctx.rect(-10, -10, 20, 20)
          } else if (variant === 2) {
            for (let k = 0; k < 6; k++) {
              const angle = k * Math.PI * 2 / 6
              const xOff = Math.cos(angle) * 10
              const yOff = Math.sin(angle) * 10
              if (k === 0) ctx.moveTo(xOff, yOff)
              else ctx.lineTo(xOff, yOff)
            }
            ctx.closePath()
          } else if (variant === 3) {
            ctx.moveTo(-10, 0)
            ctx.lineTo(0, -10)
            ctx.lineTo(10, 0)
            ctx.lineTo(0, 10)
          } else {
            ctx.moveTo(-8, -8)
            ctx.lineTo(8, -8)
            ctx.lineTo(8, 8)
            ctx.lineTo(-8, 8)
          }
          
          ctx.closePath()
          ctx.fillStyle = color
          ctx.globalAlpha = alpha * opacity
          ctx.fill()
          ctx.strokeStyle = color
          ctx.lineWidth = 0.5
          ctx.globalAlpha = alpha * 0.7
          ctx.stroke()
          ctx.restore()
        }
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
