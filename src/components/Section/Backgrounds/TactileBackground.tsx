"use client"
import React, { useRef, useEffect } from 'react'

interface TactileBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const TactileBackground: React.FC<TactileBackgroundProps> = ({
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
    let patternOffset = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const drawHexPattern = (x: number, y: number, size: number, color: string, alpha: number) => {
      if (!ctx) return
      const height = size * Math.sqrt(3)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI * 2 / 6
        const xOff = Math.cos(angle) * size
        const yOff = Math.sin(angle) * size
        if (i === 0) ctx.moveTo(x + xOff, y + yOff)
        else ctx.lineTo(x + xOff, y + yOff)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha * opacity
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
    
    const drawDiamondMesh = (x: number, y: number, size: number, color: string, alpha: number) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - size, y)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha * opacity * 0.6
      ctx.fill()
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      const spacing = 40
      const cols = Math.ceil(w / spacing) + 2
      const rows = Math.ceil(h / spacing) + 2
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + (patternOffset % spacing)
          const y = i * spacing
          const variant = (i + j) % 7
          const isPrimary = (i * 3 + j) % 2 === 0
          const color = isPrimary ? primaryColor : secondaryColor
          const randomAlpha = 0.1 + Math.sin(i * 0.8 + j * 0.4) * 0.1 + Math.random() * 0.15
          
          if (variant === 0) {
            drawHexPattern(x, y, 12, color, randomAlpha)
          } else if (variant === 1 || variant === 2) {
            drawDiamondMesh(x, y, 10, color, randomAlpha)
          } else if (variant === 3) {
            ctx.beginPath()
            ctx.arc(x, y, 6, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.globalAlpha = randomAlpha * opacity
            ctx.fill()
          } else if (variant === 4) {
            ctx.fillRect(x - 4, y - 2, 8, 4)
            ctx.fillStyle = color
            ctx.globalAlpha = randomAlpha * opacity * 0.7
            ctx.fill()
          } else if (variant === 5) {
            ctx.beginPath()
            ctx.moveTo(x, y - 8)
            ctx.lineTo(x + 6, y + 4)
            ctx.lineTo(x - 6, y + 4)
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.rect(x - 6, y - 6, 12, 12)
            ctx.fill()
          }
        }
      }
      
      patternOffset = (patternOffset + 0.4) % spacing
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

export default TactileBackground
