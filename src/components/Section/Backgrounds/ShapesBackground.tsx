"use client"
import React, { useEffect, useRef } from 'react'

interface ShapesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.08,
  primaryColor = '#000000',
  accentColor = '#C0392B'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let scanLine = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = `${parent.clientWidth}px`
      canvas.style.height = `${parent.clientHeight}px`
      ctx.scale(dpr, dpr)
    }

    const drawPrimitive = (x: number, y: number, type: number, size: number) => {
      ctx.beginPath()
      if (type === 0) {
        // Technical Crosshair
        ctx.moveTo(x - size, y); ctx.lineTo(x + size, y)
        ctx.moveTo(x, y - size); ctx.lineTo(x, y + size)
      } else if (type === 1) {
        // Right Angle Bracket
        ctx.moveTo(x + size, y - size); ctx.lineTo(x - size, y - size); ctx.lineTo(x - size, y + size)
      } else {
        // Parallel Dash Segments
        ctx.moveTo(x - size, y - 4); ctx.lineTo(x + size, y - 4)
        ctx.moveTo(x - size, y + 4); ctx.lineTo(x + size, y + 4)
      }
      ctx.stroke()
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const spacing = 64 // 8px * 8
      const activeZone = 160 // 8px * 20

      scanLine += 2.5
      if (scanLine > h + activeZone) scanLine = -activeZone

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dist = Math.abs(y - scanLine)
          const isActive = dist < activeZone
          const primitiveType = (Math.floor(x / spacing) + Math.floor(y / spacing)) % 3

          if (isActive) {
            const factor = 1 - dist / activeZone
            ctx.strokeStyle = accentColor
            ctx.globalAlpha = factor * opacity * 2.5
            ctx.lineWidth = 1

            // Apply slight jitter/offset to active primitives
            const jitter = Math.sin(scanLine * 0.05 + x) * 4
            drawPrimitive(x, y + jitter, primitiveType, 12)

            // Add technical ID label to active clusters
            if (factor > 0.8 && x % (spacing * 4) === 0) {
              ctx.font = '8px monospace'
              ctx.fillStyle = accentColor
              ctx.fillText(`TRK_${Math.floor(x)}`, x + 16, y)
            }
          } else {
            ctx.strokeStyle = primaryColor
            ctx.globalAlpha = opacity * 0.4
            ctx.lineWidth = 0.5
            drawPrimitive(x, y, primitiveType, 8)
          }
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, primaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default ShapesBackground