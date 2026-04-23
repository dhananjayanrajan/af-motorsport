"use client"
import React, { useEffect, useRef } from 'react'

interface TactileBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const TactileBackground: React.FC<TactileBackgroundProps> = ({
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
    let lightSweep = 0

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

    const drawKnurl = (x: number, y: number, size: number, intensity: number) => {
      ctx.beginPath()
      // Diamond knurl pattern (Tactile Grip)
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - size, y)
      ctx.closePath()

      ctx.strokeStyle = intensity > 0.8 ? accentColor : primaryColor
      ctx.lineWidth = intensity > 0.8 ? 1 : 0.5
      ctx.globalAlpha = intensity * opacity * 2.5
      ctx.stroke()

      if (intensity > 0.9) {
        ctx.fillStyle = accentColor
        ctx.fillRect(x - 1, y - 1, 2, 2)
      }
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const spacing = 24 // 8px * 3
      const size = 8    // 8px * 1

      lightSweep += 0.02
      const sweepX = (Math.sin(lightSweep) * 0.5 + 0.5) * w
      const sweepY = (Math.cos(lightSweep * 0.7) * 0.5 + 0.5) * h

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          // Calculate distance from the light sweep "hotspot"
          const dx = x - sweepX
          const dy = y - sweepY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const range = 256

          let intensity = 0.2
          if (dist < range) {
            intensity = 0.2 + (1 - dist / range) * 0.8
          }

          drawKnurl(x, y, size, intensity)
        }
      }

      // Technical boundary marks
      ctx.globalAlpha = opacity
      ctx.strokeStyle = primaryColor
      ctx.setLineDash([4, 12])
      ctx.strokeRect(16, 16, w - 32, h - 32)
      ctx.setLineDash([])

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

export default TactileBackground