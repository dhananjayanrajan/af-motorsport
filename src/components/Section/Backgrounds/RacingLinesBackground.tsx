"use client"
import React, { useRef, useEffect } from 'react'

interface RacingLinesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const RacingLinesBackground: React.FC<RacingLinesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.3,
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
      
      const lineCount = 28
      const spacing = h / lineCount
      
      for (let i = 0; i < lineCount; i++) {
        const y = i * spacing
        const speed = 0.5 + Math.sin(i) * 0.3
        const dashOffset = offset * speed
        const isPrimary = i % 3 === 0
        const lineColor = isPrimary ? primaryColor : secondaryColor
        const lineOpacity = 0.2 + Math.sin(i * 0.5) * 0.1 + Math.random() * 0.2
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.lineWidth = 1
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = lineOpacity * opacity
        ctx.stroke()
        
        ctx.beginPath()
        for (let x = -dashOffset % 60; x < w + 60; x += 60) {
          ctx.moveTo(x, y - 2)
          ctx.lineTo(x + 30, y + 2)
          ctx.lineWidth = 0.5
          ctx.strokeStyle = lineColor
          ctx.globalAlpha = (lineOpacity * 0.7) * opacity
          ctx.stroke()
        }
        
        if (i % 2 === 0) {
          ctx.beginPath()
          ctx.moveTo(0, y - 4)
          ctx.lineTo(w, y - 4)
          ctx.lineWidth = 2
          ctx.strokeStyle = lineColor
          ctx.globalAlpha = 0.15 * opacity
          ctx.stroke()
        }
      }
      
      offset = (offset + 2) % 120
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

export default RacingLinesBackground
