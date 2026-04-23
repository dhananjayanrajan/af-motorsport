"use client"
import React, { useRef, useEffect } from 'react'

interface TactileBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const TactileBackground: React.FC<TactileBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.5,
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

      const spacing = 56
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + (offset % spacing)
          const y = i * spacing
          const variant = (i + j) % 3
          const color = (i * 2 + j) % 2 === 0 ? primaryColor : secondaryColor
          const alpha = (0.2 + Math.sin(i * 0.6 + j * 0.4 + offset * 0.1) * 0.1) * opacity

          ctx.beginPath()
          if (variant === 0) {
            ctx.arc(x, y, 12, 0, Math.PI * 2)
          } else if (variant === 1) {
            ctx.rect(x - 12, y - 12, 24, 24)
          } else {
            ctx.moveTo(x, y - 14)
            ctx.lineTo(x + 12, y + 8)
            ctx.lineTo(x - 12, y + 8)
            ctx.closePath()
          }
          ctx.fillStyle = color
          ctx.globalAlpha = alpha
          ctx.fill()
        }
      }

      offset += 0.6
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

export default TactileBackground
