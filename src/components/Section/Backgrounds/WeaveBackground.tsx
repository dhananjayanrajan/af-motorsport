"use client"
import React, { useEffect, useRef } from 'react'

interface WeaveBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const WeaveBackground: React.FC<WeaveBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.08,
  primaryColor = '#000000',
  accentColor = '#00FF41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    const rows = 12
    const cols = 24

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
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const draw = (time: number) => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, w, h)

      const cellW = w / cols
      const cellH = h / rows

      ctx.strokeStyle = primaryColor
      ctx.fillStyle = primaryColor
      ctx.lineWidth = 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW
          const y = j * cellH

          const dx = mouseRef.current.x - x
          const dy = mouseRef.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const active = dist < 150

          const noise = Math.sin(i * 0.5 + j * 0.3 + time * 0.0005)

          ctx.globalAlpha = active ? opacity * 2 : opacity
          ctx.strokeRect(x, y, cellW, cellH)

          if (noise > 0.92 || active) {
            ctx.globalAlpha = active ? opacity * 4 : opacity * 2
            ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4)

            if (active && noise > 0.8) {
              ctx.fillStyle = accentColor
              ctx.fillRect(x + (cellW / 2) - 2, y + (cellH / 2) - 2, 4, 4)
              ctx.fillStyle = primaryColor
            }
          }

          if ((i + j) % 6 === 0) {
            ctx.globalAlpha = active ? opacity * 6 : opacity * 3
            ctx.beginPath()
            ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5)
            ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = opacity * 3
      ctx.fillRect(w - 20, 0, 20, h)

      animationFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    requestAnimationFrame(draw)

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

export default WeaveBackground