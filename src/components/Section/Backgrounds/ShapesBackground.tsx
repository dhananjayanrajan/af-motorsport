"use client"
import React, { useEffect, useRef } from 'react'

interface ShapesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.8,
  primaryColor = '#D62828',
  accentColor = '#003049'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = `${parent.clientWidth}px`
      canvas.style.height = `${parent.clientHeight}px`
      ctx.scale(dpr, dpr)
      draw()
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      ctx.fillStyle = '#F1E9DB'
      ctx.fillRect(0, 0, w, h)

      const colors = [primaryColor, accentColor, '#FCBF49', '#EAE2B7', '#212121']
      const gridSize = 120
      const cols = Math.ceil(w / gridSize)
      const rows = Math.ceil(h / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          const seed = (i * 13 + j * 7)

          ctx.save()
          ctx.translate(x, y)
          ctx.globalAlpha = opacity
          ctx.fillStyle = colors[seed % colors.length]

          const type = seed % 6

          if (type === 0) {
            ctx.beginPath()
            ctx.rect(0, 0, gridSize, gridSize)
            ctx.fill()
          } else if (type === 1) {
            ctx.beginPath()
            ctx.arc(gridSize / 2, gridSize / 2, gridSize / 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (type === 2) {
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, gridSize, 0, Math.PI / 2)
            ctx.lineTo(0, 0)
            ctx.fill()
          } else if (type === 3) {
            ctx.beginPath()
            ctx.arc(gridSize / 2, 0, gridSize / 2, 0, Math.PI)
            ctx.fill()
          } else if (type === 4) {
            ctx.beginPath()
            ctx.moveTo(0, gridSize)
            ctx.lineTo(gridSize, gridSize)
            ctx.lineTo(gridSize, 0)
            ctx.closePath()
            ctx.fill()
          } else if (type === 5) {
            ctx.fillStyle = '#212121'
            const thickness = gridSize / 4
            ctx.fillRect(gridSize / 2 - thickness / 2, 0, thickness, gridSize)
          }

          ctx.restore()
        }
      }

      ctx.globalAlpha = 0.05
      for (let n = 0; n < 4000; n++) {
        ctx.fillStyle = '#000'
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5)
      }
    }

    window.addEventListener('resize', resize)
    resize()

    return () => window.removeEventListener('resize', resize)
  }, [opacity, primaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default ShapesBackground