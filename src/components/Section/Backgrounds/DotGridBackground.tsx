"use client"
import React, { useRef, useEffect } from 'react'

interface DotGridBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.4,
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
    let time = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const width = parent.clientWidth
      const height = parent.clientHeight
      canvas.width = width
      canvas.height = height
    }

    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      const spacing = 32
      const cols = Math.ceil(w / spacing) + 2
      const rows = Math.ceil(h / spacing) + 2
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing - (time * 0.5) % spacing
          const y = i * spacing
          if (x < -spacing || x > w + spacing) continue
          
          const isEven = (i + j) % 2 === 0
          const color = isEven ? primaryColor : secondaryColor
          const dynamicOpacity = 0.15 + Math.sin(i * 0.5 + j * 0.3 + time) * 0.1 + Math.random() * 0.2
          const size = 2 + Math.sin(i * 0.8 + j * 0.5) * 1.5
          
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.globalAlpha = dynamicOpacity * opacity
          ctx.fill()
          
          if (i % 3 === 0 && j % 2 === 0) {
            ctx.beginPath()
            ctx.moveTo(x - 4, y)
            ctx.lineTo(x + 4, y)
            ctx.lineWidth = 0.5
            ctx.strokeStyle = color
            ctx.globalAlpha = dynamicOpacity * 0.5
            ctx.stroke()
          }
        }
      }
      
      time += 0.016
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

export default DotGridBackground
