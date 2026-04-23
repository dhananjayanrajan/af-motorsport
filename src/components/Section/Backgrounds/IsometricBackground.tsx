"use client"
import React, { useEffect, useRef } from 'react'

interface IsometricBackgroundProps {
  zIndex?: string
  opacity?: number
  gridColor?: string
  accentColor?: string
}

const IsometricBackground: React.FC<IsometricBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.1,
  gridColor = '#000000',
  accentColor = '#C0392B'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let scanOffset = 0

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

    const project = (x: number, y: number, z: number) => {
      const scale = 32 // 8px * 4
      return {
        px: (x - y) * Math.cos(Math.PI / 6) * scale,
        py: (x + y) * Math.sin(Math.PI / 6) * scale - z
      }
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const gridSize = 24
      scanOffset += 0.05

      ctx.save()
      ctx.translate(w / 2, h / 4)

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          const wave = Math.sin(x * 0.3 + y * 0.3 + scanOffset * 5)
          const z = wave * 8

          const p1 = project(x, y, z)
          const p2 = project(x + 1, y, z)
          const p3 = project(x, y + 1, z)

          // Grid Lines
          ctx.beginPath()
          ctx.moveTo(p1.px, p1.py)
          ctx.lineTo(p2.px, p2.py)
          ctx.moveTo(p1.px, p1.py)
          ctx.lineTo(p3.px, p3.py)

          const isActive = Math.abs(wave) > 0.8
          ctx.strokeStyle = isActive ? accentColor : gridColor
          ctx.lineWidth = isActive ? 1 : 0.5
          ctx.globalAlpha = isActive ? opacity * 2 : opacity * 0.4
          ctx.stroke()

          // Intersection Nodes
          if (isActive && x % 2 === 0 && y % 2 === 0) {
            ctx.fillStyle = accentColor
            ctx.globalAlpha = opacity * 3
            ctx.fillRect(p1.px - 1, p1.py - 1, 2, 2)
          }
        }
      }

      ctx.restore()
      animationFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, gridColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default IsometricBackground