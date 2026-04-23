"use client"
import React, { useRef, useEffect } from 'react'

interface HoneycombBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({
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
    let pulse = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    const drawHexagon = (x: number, y: number, size: number, color: string, alpha: number) => {
      if (!ctx) return
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI * 2 / 6
        const xOff = Math.cos(angle) * size
        const yOff = Math.sin(angle) * size
        if (i === 0) ctx.moveTo(x + xOff, y + yOff)
        else ctx.lineTo(x + xOff, y + yOff)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha
      ctx.fill()
    }

    const draw = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const size = 30
      const hexWidth = size * Math.sqrt(3)
      const hexHeight = size * 1.5
      const cols = Math.ceil(w / hexWidth) + 1
      const rows = Math.ceil(h / hexHeight) + 1

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * hexWidth + (i % 2) * (hexWidth / 2)
          const y = i * hexHeight
          const color = (i + j) % 2 === 0 ? primaryColor : secondaryColor
          const wave = Math.sin(pulse * 1.5 + i * 0.3 + j * 0.4) * 0.5 + 0.5
          const alpha = (0.15 + wave * 0.15) * opacity

          drawHexagon(x, y, size, color, alpha)
        }
      }

      pulse += 0.015
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

export default HoneycombBackground
