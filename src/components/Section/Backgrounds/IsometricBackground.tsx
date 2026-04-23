"use client"
import React, { useRef, useEffect } from 'react'

interface IsometricBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const IsometricBackground: React.FC<IsometricBackgroundProps> = ({
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

      const tileW = 70
      const tileH = 35
      const cols = Math.ceil(w / tileW) + 2
      const rows = Math.ceil(h / tileH) + 2

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * tileW + (i % 2) * (tileW / 2)
          const y = i * tileH
          const color = (i + j) % 2 === 0 ? primaryColor : secondaryColor
          const alpha = (0.18 + Math.sin(i * 0.4 + j * 0.5 + time * 0.5) * 0.1) * opacity

          ctx.beginPath()
          ctx.moveTo(x, y - 14)
          ctx.lineTo(x + 14, y)
          ctx.lineTo(x, y + 14)
          ctx.lineTo(x - 14, y)
          ctx.closePath()
          ctx.fillStyle = color
          ctx.globalAlpha = alpha
          ctx.fill()
          ctx.strokeStyle = color
          ctx.lineWidth = 1.2
          ctx.globalAlpha = alpha * 0.9
          ctx.stroke()
        }
      }

      time += 0.016
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

export default IsometricBackground
