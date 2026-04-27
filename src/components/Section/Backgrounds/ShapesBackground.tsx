"use client"
import React, { useEffect, useRef } from 'react'

interface ShapesBackgroundProps {
  zIndex?: string
  opacity?: number
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const colors = {
      bg: '#EBEBE8',
      primary: '#121212',
      accent: '#FF3B00',
      alt: '#0047FF',
      muted: '#C4C4BC'
    }

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.tx = e.clientX - rect.left
      mouse.current.ty = e.clientY - rect.top
    }

    const draw = (time: number) => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05

      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, w, h)

      const drawShape = (x: number, y: number, size: number, type: number, color: string, lerp: number) => {
        ctx.save()
        ctx.translate(x, y)

        const offsetX = (mouse.current.x - x) * lerp
        const offsetY = (mouse.current.y - y) * lerp
        ctx.translate(offsetX, offsetY)

        ctx.fillStyle = color
        ctx.globalAlpha = opacity

        if (type === 0) {
          ctx.fillRect(-size / 2, -size / 2, size, size)
        } else if (type === 1) {
          ctx.beginPath()
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (type === 2) {
          ctx.beginPath()
          ctx.moveTo(-size / 2, size / 2)
          ctx.lineTo(size / 2, size / 2)
          ctx.lineTo(0, -size / 2)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      }

      const gridX = 5
      const gridY = 3
      const stepX = w / gridX
      const stepY = h / gridY

      for (let i = 0; i <= gridX; i++) {
        for (let j = 0; j <= gridY; j++) {
          const px = i * stepX
          const py = j * stepY
          const seed = i * 13 + j * 7

          drawShape(px, py, 120, seed % 3, colors.muted, 0.02)

          if ((i + j) % 3 === 0) {
            drawShape(px, py, 40, (seed + 1) % 3, colors.accent, 0.08)
          }

          if ((i * j) % 4 === 0) {
            drawShape(px, py, 80, (seed + 2) % 3, colors.primary, 0.04)
          }
        }
      }

      ctx.strokeStyle = colors.primary
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.1
      ctx.beginPath()
      ctx.moveTo(mouse.current.x, 0)
      ctx.lineTo(mouse.current.x, h)
      ctx.moveTo(0, mouse.current.y)
      ctx.lineTo(w, mouse.current.y)
      ctx.stroke()

      ctx.fillStyle = colors.primary
      ctx.globalAlpha = 1
      ctx.font = '10px monospace'
      ctx.fillText(`X: ${Math.round(mouse.current.x)}`, mouse.current.x + 10, 20)
      ctx.fillText(`Y: ${Math.round(mouse.current.y)}`, 10, mouse.current.y - 10)

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default ShapesBackground