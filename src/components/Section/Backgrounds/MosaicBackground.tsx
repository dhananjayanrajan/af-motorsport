"use client"
import React, { useEffect, useRef } from 'react'

interface MosaicBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const MosaicBackground: React.FC<MosaicBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.5,
  primaryColor = '#000000',
  accentColor = '#00FF41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    const tileSize = 80
    let grid: { alpha: number; targetAlpha: number; isAccent: boolean }[] = []
    let cols = 0
    let rows = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const w = parent.clientWidth
      const h = parent.clientHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)

      cols = Math.ceil(w / tileSize)
      rows = Math.ceil(h / tileSize)

      grid = Array.from({ length: cols * rows }, () => ({
        alpha: 0,
        targetAlpha: 0,
        isAccent: Math.random() > 0.85
      }))
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const cell = grid[i]
          const x = c * tileSize
          const y = r * tileSize

          if (Math.random() > 0.995) {
            cell.targetAlpha = Math.random() * opacity
          }

          const dx = x + tileSize / 2 - mouseRef.current.x
          const dy = y + tileSize / 2 - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          let currentTarget = cell.targetAlpha
          if (dist < 150) {
            currentTarget = opacity * 1.5
          }

          cell.alpha += (currentTarget - cell.alpha) * 0.05
          cell.targetAlpha *= 0.96

          if (cell.alpha > 0.01) {
            ctx.save()
            ctx.globalAlpha = cell.alpha
            ctx.fillStyle = cell.isAccent ? accentColor : primaryColor

            const padding = 4
            ctx.fillRect(
              x + padding,
              y + padding,
              tileSize - padding * 2,
              tileSize - padding * 2
            )

            if (cell.isAccent) {
              ctx.strokeStyle = accentColor
              ctx.lineWidth = 0.5
              ctx.strokeRect(x + 2, y + 2, tileSize - 4, tileSize - 4)
            }
            ctx.restore()
          }

          ctx.globalAlpha = opacity * 0.2
          ctx.fillStyle = primaryColor
          ctx.fillRect(x, y, 1, 1)
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, primaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default MosaicBackground