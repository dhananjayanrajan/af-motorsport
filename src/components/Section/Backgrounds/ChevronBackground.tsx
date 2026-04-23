"use client"
import React, { useRef, useEffect } from 'react'

interface ChevronBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const ChevronBackground: React.FC<ChevronBackgroundProps> = ({
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
    let scrollX = 0
    let scrollY = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const drawChevron = (x: number, y: number, size: number, direction: number, color: string, alpha: number) => {
      if (!ctx) return
      const halfSize = size / 2
      ctx.beginPath()
      if (direction === 0) { // right
        ctx.moveTo(x - halfSize, y - halfSize)
        ctx.lineTo(x + halfSize, y)
        ctx.lineTo(x - halfSize, y + halfSize)
      } else if (direction === 1) { // left
        ctx.moveTo(x + halfSize, y - halfSize)
        ctx.lineTo(x - halfSize, y)
        ctx.lineTo(x + halfSize, y + halfSize)
      } else if (direction === 2) { // down
        ctx.moveTo(x - halfSize, y - halfSize)
        ctx.lineTo(x, y + halfSize)
        ctx.lineTo(x + halfSize, y - halfSize)
      } else { // up
        ctx.moveTo(x - halfSize, y + halfSize)
        ctx.lineTo(x, y - halfSize)
        ctx.lineTo(x + halfSize, y + halfSize)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha * opacity
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.stroke()
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
          const x = j * spacing + (scrollX % spacing)
          const y = i * spacing + (scrollY % spacing)
          const direction = (i + j) % 4
          const isPrimary = (i * 2 + j) % 2 === 0
          const color = isPrimary ? primaryColor : secondaryColor
          const alpha = 0.2 + Math.sin(i * 0.5 + j * 0.3) * 0.1 + Math.random() * 0.15
          const size = 16 + Math.sin(i * 0.8 + j * 0.6) * 4
          
          drawChevron(x, y, size, direction, color, alpha)
          
          if (direction === 0 || direction === 1) {
            ctx.beginPath()
            ctx.moveTo(x - 4, y)
            ctx.lineTo(x + 4, y)
            ctx.lineWidth = 0.5
            ctx.strokeStyle = color
            ctx.globalAlpha = alpha * 0.6
            ctx.stroke()
          }
        }
      }
      
      scrollX = (scrollX + 1.2) % spacing
      scrollY = (scrollY + 0.8) % spacing
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

export default ChevronBackground
