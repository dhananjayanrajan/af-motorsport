"use client"
import React, { useRef, useEffect } from 'react'

interface ChevronBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const ChevronBackground: React.FC<ChevronBackgroundProps> = ({
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

    const drawChevron = (x: number, y: number, size: number, color: string, alpha: number) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x - size, y - size * 0.6)
      ctx.lineTo(x, y)
      ctx.lineTo(x + size, y - size * 0.6)
      ctx.lineWidth = 2
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.stroke()
    }

    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const spacing = 72
      const cols = Math.ceil(w / spacing) + 2
      const rows = Math.ceil(h / spacing) + 2

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + (offset % spacing)
          const y = i * spacing
          const color = (i + j) % 2 === 0 ? primaryColor : secondaryColor
          const alpha = (0.2 + Math.sin(i * 0.5 + j * 0.4 + offset * 0.05) * 0.12) * opacity

          drawChevron(x, y, 18, color, alpha)
        }
      }

      offset += 0.9
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

export default ChevronBackground
