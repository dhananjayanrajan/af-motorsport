"use client"
import React, { useEffect, useRef } from 'react'

interface TactileBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const TactileBackground: React.FC<TactileBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.1,
  primaryColor = '#1A1A1A',
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
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

    const drawModule = (x: number, y: number, size: number, influence: number) => {
      const dx = mouseRef.current.x - x
      const dy = mouseRef.current.y - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const active = Math.max(0, 1 - dist / influence)

      const offset = active * 6

      // Shadow / Depth Layer (Hard edge)
      ctx.fillStyle = '#000000'
      ctx.fillRect(x - size / 2 + 4, y - size / 2 + 4, size, size)

      // Main Block
      ctx.fillStyle = active > 0.5 ? '#252525' : primaryColor
      ctx.fillRect(x - size / 2 - offset, y - size / 2 - offset, size, size)

      // Technical Detail (Accent)
      if (active > 0.1) {
        ctx.strokeStyle = accentColor
        ctx.lineWidth = 1
        ctx.globalAlpha = active * opacity * 2
        ctx.strokeRect(x - size / 2 - offset + 4, y - size / 2 - offset + 4, size - 8, size - 8)
        ctx.globalAlpha = opacity
      }

      // Small "Bolt" or Corner Mark
      ctx.fillStyle = active > 0.8 ? accentColor : '#333'
      ctx.fillRect(x - size / 2 - offset + 2, y - size / 2 - offset + 2, 2, 2)
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const size = 60
      const gap = 20
      const step = size + gap
      const influence = 250

      ctx.globalAlpha = opacity

      for (let x = gap; x < w; x += step) {
        for (let y = gap; y < h; y += step) {
          drawModule(x + size / 2, y + size / 2, size, influence)
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
  }, [opacity, primaryColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none block`}
    />
  )
}

export default TactileBackground