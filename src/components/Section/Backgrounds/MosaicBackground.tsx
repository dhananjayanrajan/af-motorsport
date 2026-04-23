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
  opacity = 0.08,
  primaryColor = '#000000',
  accentColor = '#C0392B'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let frameCount = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = `${parent.clientWidth}px`
      canvas.style.height = `${parent.clientHeight}px`
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const tileSize = 64 // 8 * 8
      const cols = Math.ceil(w / tileSize)
      const rows = Math.ceil(h / tileSize)

      frameCount++

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tileSize
          const y = r * tileSize

          // Generate deterministic but "random" feel based on coordinates
          const noise = Math.sin(r * 0.5 + c * 0.8 + frameCount * 0.02)
          const isActive = noise > 0.6
          const isAccent = noise > 0.92

          if (isActive) {
            ctx.save()

            // Fragmented Tile logic - vary size by 8px multiples
            const fragmentWidth = tileSize - 16
            const fragmentHeight = tileSize - (isAccent ? 32 : 16)

            ctx.globalAlpha = isAccent ? opacity * 2 : opacity
            ctx.fillStyle = isAccent ? accentColor : primaryColor

            // Draw the main fragment
            ctx.fillRect(x + 8, y + 8, fragmentWidth, fragmentHeight)

            // Add technical "bit" marker for accent tiles
            if (isAccent) {
              ctx.globalAlpha = 1
              ctx.fillRect(x + 8, y + 8, 4, 4)

              ctx.strokeStyle = accentColor
              ctx.lineWidth = 1
              ctx.strokeRect(x + 4, y + 4, tileSize - 8, tileSize - 8)
            }

            ctx.restore()
          } else {
            // Static grid intersection points (1px dots)
            ctx.globalAlpha = opacity * 0.3
            ctx.fillStyle = primaryColor
            ctx.fillRect(x, y, 1, 1)
          }
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
  }, [opacity, primaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default MosaicBackground