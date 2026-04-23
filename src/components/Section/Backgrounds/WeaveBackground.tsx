"use client"
import React, { useRef, useEffect } from 'react'

interface WeaveBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const WeaveBackground: React.FC<WeaveBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.45,
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
    let phase = 0

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

      const spacing = 48
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + (phase % spacing) * 0.5
          const y = i * spacing + (phase * 0.3) % spacing
          const color = (i + j) % 2 === 0 ? primaryColor : secondaryColor
          const alpha = (0.18 + Math.sin(i * 0.5 + j * 0.5 + phase * 0.1) * 0.1) * opacity

          ctx.beginPath()
          ctx.moveTo(x - 14, y - 14)
          ctx.lineTo(x + 14, y + 14)
          ctx.lineWidth = 2
          ctx.strokeStyle = color
          ctx.globalAlpha = alpha
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x + 14, y - 14)
          ctx.lineTo(x - 14, y + 14)
          ctx.stroke()
        }
      }

      phase += 0.5
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

export default WeaveBackground
