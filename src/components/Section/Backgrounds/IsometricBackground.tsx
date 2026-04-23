"use client"
import React, { useRef, useEffect } from 'react'

interface IsometricBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const IsometricBackground: React.FC<IsometricBackgroundProps> = ({
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
    let time = 0
    
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    
    const drawIsometricTile = (x: number, y: number, size: number, height: number, colorTop: string, colorLeft: string, colorRight: string, alpha: number) => {
      if (!ctx) return
      const isoX = x
      const isoY = y - height * 0.5
      
      ctx.beginPath()
      ctx.moveTo(isoX, isoY - size)
      ctx.lineTo(isoX + size, isoY)
      ctx.lineTo(isoX, isoY + size)
      ctx.lineTo(isoX - size, isoY)
      ctx.closePath()
      ctx.fillStyle = colorTop
      ctx.globalAlpha = alpha * opacity
      ctx.fill()
      
      ctx.beginPath()
      ctx.moveTo(isoX, isoY + size)
      ctx.lineTo(isoX + size, isoY)
      ctx.lineTo(isoX + size, isoY - height)
      ctx.lineTo(isoX, isoY + size - height)
      ctx.closePath()
      ctx.fillStyle = colorRight
      ctx.fill()
      
      ctx.beginPath()
      ctx.moveTo(isoX, isoY + size)
      ctx.lineTo(isoX - size, isoY)
      ctx.lineTo(isoX - size, isoY - height)
      ctx.lineTo(isoX, isoY + size - height)
      ctx.closePath()
      ctx.fillStyle = colorLeft
      ctx.fill()
    }
    
    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      
      const tileW = 48
      const tileH = 24
      const cols = Math.ceil(w / tileW) + 2
      const rows = Math.ceil(h / tileH) + 2
      
      for (let i = -2; i < rows; i++) {
        for (let j = -2; j < cols; j++) {
          const x = j * tileW + (i % 2) * (tileW / 2)
          const y = i * tileH
          const heightVal = 12 + Math.sin(i * 0.5 + j * 0.3 + time) * 6
          const isPrimary = (i + j) % 2 === 0
          const alphaVal = 0.2 + Math.sin(i * 0.7 + j * 0.5) * 0.1
          
          drawIsometricTile(
            x, y, 16, heightVal,
            isPrimary ? primaryColor : secondaryColor,
            `${isPrimary ? primaryColor : secondaryColor}80`,
            `${isPrimary ? primaryColor : secondaryColor}40`,
            alphaVal
          )
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

export default IsometricBackground
