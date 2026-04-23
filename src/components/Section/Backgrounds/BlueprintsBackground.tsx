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
  opacity = 0.4,
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
    let offset = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const step = 56
      for (let x = 0; x < w; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.lineWidth = 0.8
        ctx.strokeStyle = primaryColor
        ctx.globalAlpha = 0.2 * opacity
        ctx.stroke()
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      for (let x = step * 2; x < w; x += step * 3) {
        for (let y = step * 2; y < h; y += step * 3) {
          const ox = x + (offset % step) * 0.5
          const oy = y
          ctx.beginPath()
          ctx.arc(ox, oy, 16, 0, Math.PI * 2)
          ctx.strokeStyle = secondaryColor
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.25 * opacity
          ctx.stroke()
        }
      }

      offset += 0.4
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
