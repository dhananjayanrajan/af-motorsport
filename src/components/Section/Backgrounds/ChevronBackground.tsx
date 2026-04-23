"use client"
import React, { useEffect, useRef } from 'react'

interface ChevronBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
}

const ChevronBackground: React.FC<ChevronBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.08,
  primaryColor = '#00FF41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let offset = 0
    let animationFrame: number

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const rowHeight = 32 // 8px * 4
      const chevronWidth = 48 // 8px * 6
      const spacing = 128 // 8px * 16

      offset += 2
      if (offset > spacing) offset = 0

      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 1

      for (let y = 0; y < h + rowHeight; y += rowHeight) {
        const isAlternate = (y / rowHeight) % 2 === 0
        const rowOffset = isAlternate ? offset : -offset

        ctx.globalAlpha = isAlternate ? opacity : opacity * 0.5

        for (let x = -spacing; x < w + spacing; x += spacing) {
          const currentX = x + rowOffset

          ctx.beginPath()
          ctx.moveTo(currentX, y)
          ctx.lineTo(currentX + (chevronWidth / 2), y + (rowHeight / 2))
          ctx.lineTo(currentX, y + rowHeight)

          // Technical Ticks on the chevron
          ctx.moveTo(currentX + 8, y + 4)
          ctx.lineTo(currentX + (chevronWidth / 2) + 8, y + (rowHeight / 2))
          ctx.lineTo(currentX + 8, y + rowHeight - 4)

          ctx.stroke()
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
  }, [opacity, primaryColor])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${zIndex} pointer-events-none`} />
}

export default ChevronBackground