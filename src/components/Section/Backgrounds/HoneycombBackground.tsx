"use client"
import React, { useRef, useEffect } from 'react'

interface HoneycombBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({
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
    let pulse = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const drawHexagon = (x: number, y: number, size: number, color: string, alpha: number, glow: boolean) => {
      if (!ctx) return
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI * 2 / 6 - Math.PI / 6
        const xOff = Math.cos(angle) * size
        const yOff = Math.sin(angle) * size
        if (i === 0) ctx.moveTo(x + xOff, y + yOff)
        else ctx.lineTo(x + xOff, y + yOff)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha * opacity
      ctx.fill()
      if (glow) {
        ctx.shadowBlur = 8
        ctx.shadowColor = color
        ctx.fill()
        ctx.shadowBlur = 0
      }
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.globalAlpha = alpha * opacity * 1.2
      ctx.stroke()
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      const hexSize = 28
      const hexWidth = hexSize * Math.sqrt(3)
      const hexHeight = hexSize * 1.5
      const cols = Math.ceil(w / hexWidth) + 2
      const rows = Math.ceil(h / hexHeight) + 2
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * hexWidth + (i % 2) * (hexWidth / 2)
          const y = i * hexHeight
          const isPrimary = (i * 3 + j) % 2 === 0
          const color = isPrimary ? primaryColor : secondaryColor
          const alpha = 0.15 + Math.sin(i * 0.6 + j * 0.4 + pulse) * 0.1 + Math.random() * 0.1
          const glow = (i + j) % 5 === 0 && Math.sin(pulse * 2) > 0
          
          drawHexagon(x, y, hexSize, color, alpha, glow)
          
          if (i % 2 === 0 && j % 3 === 0) {
            ctx.beginPath()
            ctx.arc(x, y, hexSize * 0.3, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.globalAlpha = alpha * 0.8
            ctx.fill()
          }
        }
      }
      
      pulse += 0.02
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

export default HoneycombBackground
