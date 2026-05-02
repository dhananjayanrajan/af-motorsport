"use client"
import React, { useEffect, useRef } from 'react'

interface DotGridBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 1,
  primaryColor = '#444444',
  secondaryColor = '#00FF41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let time = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const resize = () => {
      const parent = canvas.parentElement
      const width = parent?.clientWidth || window.innerWidth
      const height = parent?.clientHeight || window.innerHeight

      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, w, h)

      const spacing = 30
      const repelRadius = 250
      time += 0.01

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dx = mouseRef.current.x - x
          const dy = mouseRef.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const strength = Math.max(0, 1 - dist / repelRadius)
          const noise = Math.sin(x * 0.01 + y * 0.01 + time) * 0.3

          if (strength > 0) {
            ctx.globalAlpha = Math.min(1, (opacity * 0.6) + strength)
            ctx.fillStyle = secondaryColor

            const moveX = (dx / (dist + 0.1)) * strength * -30
            const moveY = (dy / (dist + 0.1)) * strength * -30

            ctx.beginPath()
            ctx.arc(x + moveX, y + moveY, 1.5 + strength * 2.5, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.globalAlpha = opacity * (0.4 + noise)
            ctx.fillStyle = primaryColor

            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)

    resize()
    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, primaryColor, secondaryColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none block`}
    />
  )
}

export default DotGridBackground