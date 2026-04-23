"use client"
import React, { useEffect, useRef } from 'react'

interface DotGridBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.1,
  primaryColor = '#000000',
  secondaryColor = '#00FF41'
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

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const spacing = 16 // 8px * 2
      const activeRange = 128 // 8px * 16

      scanLine += 4
      if (scanLine > h + activeRange) scanLine = -activeRange

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dist = Math.abs(y - scanLine)
          const isActive = dist < activeRange

          if (isActive) {
            const intensity = 1 - dist / activeRange

            // Active Square Marker
            ctx.globalAlpha = intensity * opacity * 2
            ctx.fillStyle = secondaryColor
            ctx.fillRect(x - 1, y - 1, 2, 2)

            // Optical Trace Line
            if (intensity > 0.8) {
              ctx.beginPath()
              ctx.moveTo(x - 4, y)
              ctx.lineTo(x + 4, y)
              ctx.strokeStyle = secondaryColor
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          } else {
            // Standard Passive Point
            ctx.globalAlpha = opacity * 0.4
            ctx.fillStyle = primaryColor
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1)
          }
        }
      }

      // Metadata Coordinates
      ctx.globalAlpha = opacity
      ctx.font = '8px monospace'
      ctx.fillStyle = primaryColor
      ctx.fillText(`SEQ_${Math.floor(scanLine)}`, 16, h - 16)

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

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default DotGridBackground