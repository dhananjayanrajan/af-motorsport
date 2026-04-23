"use client"
import React, { useEffect, useRef } from 'react'

interface WeaveBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const WeaveBackground: React.FC<WeaveBackgroundProps> = ({
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
    let lightShift = 0

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

    const drawFiber = (x: number, y: number, size: number, angle: number, intensity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      const isAccent = intensity > 0.9
      ctx.strokeStyle = isAccent ? accentColor : primaryColor
      ctx.globalAlpha = intensity * opacity * 2
      ctx.lineWidth = isAccent ? 1 : 0.5

      // Composite strand lines
      ctx.beginPath()
      ctx.moveTo(-size, -size / 2); ctx.lineTo(size, -size / 2)
      ctx.moveTo(-size, 0); ctx.lineTo(size, 0)
      ctx.moveTo(-size, size / 2); ctx.lineTo(size, size / 2)
      ctx.stroke()

      ctx.restore()
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const step = 16 // 8px * 2
      lightShift += 0.015

      for (let x = 0; x < w + step; x += step) {
        for (let y = 0; y < h + step; y += step) {
          const isVertical = (Math.floor(x / step) + Math.floor(y / step)) % 2 === 0

          // Simulation of light moving across a curved carbon surface
          const noise = Math.sin(x * 0.01 + y * 0.01 + lightShift)
          const intensity = 0.3 + (noise * 0.5 + 0.5) * 0.7

          drawFiber(
            x,
            y,
            step / 2,
            isVertical ? 0 : Math.PI / 2,
            intensity
          )
        }
      }

      // Technical perimeter marks
      ctx.globalAlpha = opacity * 0.5
      ctx.fillStyle = primaryColor
      ctx.font = '8px monospace'
      ctx.fillText("COMPOSITE_LATTICE_V3", 16, 16)
      ctx.fillRect(16, 20, 48, 1)

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

export default WeaveBackground