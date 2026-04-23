"use client"
import React, { useRef, useEffect } from 'react'

interface WeaveBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const WeaveBackground: React.FC<WeaveBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.3,
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
    let offset = 0
    
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
      
      const step = 24
      const warpCount = Math.ceil(w / step) + 2
      const weftCount = Math.ceil(h / step) + 2
      
      for (let i = 0; i < warpCount; i++) {
        const x = i * step + offset % step
        const isPrimary = i % 3 === 0
        const color = isPrimary ? primaryColor : secondaryColor
        const opacityVal = 0.2 + Math.sin(i * 0.5) * 0.1
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        for (let y = 0; y < h; y += step * 2) {
          ctx.lineTo(x + 8, y + step)
          ctx.lineTo(x - 8, y + step * 2)
        }
        ctx.lineWidth = 1
        ctx.strokeStyle = color
        ctx.globalAlpha = opacityVal * opacity
        ctx.stroke()
        
        for (let y = 0; y < h; y += step) {
          ctx.beginPath()
          ctx.rect(x - 2, y, 4, step)
          ctx.fillStyle = color
          ctx.globalAlpha = (opacityVal * 0.5) * opacity
          ctx.fill()
        }
      }
      
      for (let i = 0; i < weftCount; i++) {
        const y = i * step - (offset * 0.7) % step
        const isSecondary = i % 2 === 0
        const color = isSecondary ? secondaryColor : primaryColor
        const opacityVal = 0.2 + Math.cos(i * 0.7) * 0.1
        
        ctx.beginPath()
        for (let x = 0; x < w; x += step * 2) {
          ctx.moveTo(x, y)
          ctx.lineTo(x + step, y + 8)
          ctx.lineTo(x + step * 2, y)
        }
        ctx.lineWidth = 0.5
        ctx.strokeStyle = color
        ctx.globalAlpha = opacityVal * opacity
        ctx.stroke()
      }
      
      offset = (offset + 0.8) % step
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

export default WeaveBackground
