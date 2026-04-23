"use client"
import React, { useEffect, useRef } from 'react'

interface BlueprintsBackgroundProps {
  zIndex?: string
  opacity?: number
  gridColor?: string
  accentColor?: string
}

const BlueprintsBackground: React.FC<BlueprintsBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.1,
  gridColor = '#000000',
  accentColor = '#00FF41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let scanPos = 0

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

      const majorGrid = 64 // 8 * 8
      const minorGrid = 16 // 8 * 2

      // Draw Minor Grid (0.5px Sharpness)
      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 0.5
      ctx.globalAlpha = opacity * 0.3

      for (let x = 0; x <= w; x += minorGrid) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = 0; y <= h; y += minorGrid) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()

      // Draw Major Grid (1px Precision)
      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      ctx.globalAlpha = opacity * 0.6

      for (let x = 0; x <= w; x += majorGrid) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        // Coordinate Markers
        ctx.font = '8px monospace'
        ctx.fillStyle = gridColor
        ctx.fillText(`${Math.round(x)}`, x + 4, 12)
      }
      for (let y = 0; y <= h; y += majorGrid) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()

      // Drawing Scanning Blade
      scanPos += 1.5
      if (scanPos > h) scanPos = 0

      const gradient = ctx.createLinearGradient(0, scanPos - 40, 0, scanPos)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(1, accentColor)

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.globalAlpha = opacity * 0.8
      ctx.fillRect(0, scanPos - 1, w, 1) // The sharp line

      ctx.globalAlpha = opacity * 0.2
      ctx.fillRect(0, scanPos - 40, w, 40) // The trailing glow

      // Crosshair Points at intersections
      ctx.globalAlpha = opacity
      ctx.fillStyle = accentColor
      for (let x = majorGrid; x < w; x += majorGrid * 2) {
        for (let y = majorGrid; y < h; y += majorGrid * 2) {
          if (Math.abs(y - scanPos) < 100) {
            ctx.fillRect(x - 1, y - 1, 2, 2)
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
  }, [opacity, gridColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default BlueprintsBackground