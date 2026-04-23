"use client"
import React, { useRef, useEffect } from 'react'

interface RacingLinesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const RacingLinesBackground: React.FC<RacingLinesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.45,
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
    let shift = 0

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

      const lineCount = 18
      const step = h / lineCount

      for (let i = 0; i < lineCount; i++) {
        const y = i * step
        const dashOffset = shift * (0.7 + (i % 3) * 0.2)
        const color = i % 3 === 0 ? primaryColor : secondaryColor
        const baseAlpha = 0.2 + Math.sin(i * 0.7) * 0.1
        const alpha = baseAlpha * opacity

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.lineWidth = 2
        ctx.strokeStyle = color
        ctx.globalAlpha = alpha
        ctx.stroke()

        ctx.beginPath()
        ctx.setLineDash([30, 50])
        ctx.lineDashOffset = -dashOffset
        ctx.moveTo(0, y + 3)
        ctx.lineTo(w, y + 3)
        ctx.lineWidth = 1.2
        ctx.strokeStyle = color
        ctx.globalAlpha = alpha * 0.8
        ctx.stroke()
        ctx.setLineDash([])
      }

      shift += 1.5
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

export default RacingLinesBackground
