"use client"
import React, { useEffect, useRef } from 'react'

interface HoneycombBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({
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
    let traceOffset = 0

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

    const drawHexagon = (x: number, y: number, size: number, weight: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.lineWidth = weight
      ctx.stroke()
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const size = 48 // Multiples of 8
      const hexWidth = size * Math.sqrt(3)
      const hexHeight = size * 1.5

      traceOffset += 0.8
      if (traceOffset > hexWidth * 4) traceOffset = 0

      const cols = Math.ceil(w / hexWidth) + 1
      const rows = Math.ceil(h / hexHeight) + 1

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * hexWidth + (i % 2 === 0 ? 0 : hexWidth / 2)
          const y = i * hexHeight

          // Primary Structure (0.5px subtle line)
          ctx.strokeStyle = primaryColor
          ctx.globalAlpha = opacity * 0.4
          drawHexagon(x, y, size, 0.5)

          // Active Trace Effect (Spatial Trigger)
          const distToTrace = Math.abs((x + y) - traceOffset * 2)
          if (distToTrace < 128) {
            const intensity = 1 - distToTrace / 128
            ctx.strokeStyle = accentColor
            ctx.globalAlpha = intensity * opacity * 2
            drawHexagon(x, y, size, 1)

            // Corner Nodes
            ctx.fillStyle = accentColor
            for (let k = 0; k < 6; k++) {
              const angle = (k * Math.PI) / 3
              ctx.fillRect(x + size * Math.cos(angle) - 1, y + size * Math.sin(angle) - 1, 2, 2)
            }
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

export default HoneycombBackground