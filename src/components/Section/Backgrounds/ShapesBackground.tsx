"use client"
import React, { useRef, useEffect } from 'react'

interface ShapesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.5,
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
    let time = 0

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

      const spacing = 72
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing
          const y = i * spacing + Math.sin(time * 0.8 + i * 0.4) * 10
          const color = (i + j) % 2 === 0 ? primaryColor : secondaryColor
          const alpha = (0.18 + Math.sin(time * 0.7 + i * 0.5 + j * 0.6) * 0.12) * opacity

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(time * 0.1 + i * 0.2)
          ctx.beginPath()
          ctx.arc(0, 0, 16, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.globalAlpha = alpha
          ctx.fill()
          ctx.restore()
        }
      }

      time += 0.02
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

export default ShapesBackground
