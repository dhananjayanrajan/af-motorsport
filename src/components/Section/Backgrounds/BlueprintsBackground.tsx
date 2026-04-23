"use client"
import React, { useRef, useEffect } from 'react'

interface BlueprintsBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const BlueprintsBackground: React.FC<BlueprintsBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.25,
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
    let gridOffset = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const drawGrid = (x: number, y: number, w: number, h: number) => {
      if (!ctx) return
      const step = 32
      for (let i = 0; i <= w; i += step) {
        ctx.beginPath()
        ctx.moveTo(x + i, y)
        ctx.lineTo(x + i, y + h)
        ctx.lineWidth = 0.5
        ctx.strokeStyle = primaryColor
        ctx.globalAlpha = 0.1 * opacity
        ctx.stroke()
      }
      for (let i = 0; i <= h; i += step) {
        ctx.beginPath()
        ctx.moveTo(x, y + i)
        ctx.lineTo(x + w, y + i)
        ctx.stroke()
      }
    }
    
    const drawDimension = (x1: number, y1: number, x2: number, y2: number, value: string) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineWidth = 0.5
      ctx.strokeStyle = secondaryColor
      ctx.globalAlpha = 0.3 * opacity
      ctx.stroke()
      
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      ctx.font = '8px monospace'
      ctx.fillStyle = secondaryColor
      ctx.fillText(value, midX - 10, midY - 4)
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      drawGrid(0, 0, w, h)
      
      for (let x = 0; x < w; x += 128) {
        for (let y = 0; y < h; y += 128) {
          const offsetX = x + (gridOffset % 128)
          const offsetY = y
          
          ctx.beginPath()
          ctx.moveTo(offsetX, offsetY)
          ctx.lineTo(offsetX + 32, offsetY - 32)
          ctx.lineTo(offsetX + 64, offsetY)
          ctx.lineTo(offsetX + 32, offsetY + 32)
          ctx.closePath()
          ctx.strokeStyle = primaryColor
          ctx.globalAlpha = 0.2 * opacity
          ctx.stroke()
          
          ctx.beginPath()
          ctx.arc(offsetX + 32, offsetY, 8, 0, Math.PI * 2)
          ctx.strokeStyle = primaryColor
          ctx.stroke()
          
          if ((x / 128 + y / 128) % 2 === 0) {
            drawDimension(offsetX, offsetY, offsetX + 64, offsetY, '64.00')
            drawDimension(offsetX + 32, offsetY - 32, offsetX + 32, offsetY + 32, '32.00')
          }
        }
      }
      
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 + gridOffset * 0.5) * Math.PI / 180
        const radius = 120
        const cx = w / 2 + Math.cos(angle) * radius
        const cy = h / 2 + Math.sin(angle) * radius
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + 20, cy)
        ctx.lineTo(cx + 10, cy + 17.32)
        ctx.closePath()
        ctx.fillStyle = secondaryColor
        ctx.globalAlpha = 0.15 * opacity
        ctx.fill()
      }
      
      gridOffset = (gridOffset + 0.5) % 128
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

export default BlueprintsBackground
