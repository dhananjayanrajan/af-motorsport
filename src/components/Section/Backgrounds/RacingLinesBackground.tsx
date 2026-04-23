"use client"
import React, { useEffect, useRef } from 'react'

interface RacingLinesBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  accentColor?: string
}

const RacingLinesBackground: React.FC<RacingLinesBackgroundProps> = ({
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
    const lineData: { y: number; x: number; speed: number; length: number; isAccent: boolean }[] = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = `${parent.clientWidth}px`
      canvas.style.height = `${parent.clientHeight}px`
      ctx.scale(dpr, dpr)
      initLines()
    }

    const initLines = () => {
      const h = canvas.height / (window.devicePixelRatio || 1)
      const w = canvas.width / (window.devicePixelRatio || 1)
      lineData.length = 0

      // Lines placed strictly on 8px grid increments
      for (let y = 32; y < h; y += 32) {
        lineData.push({
          y,
          x: Math.random() * w,
          speed: 4 + Math.random() * 12, // 8px * 0.5 to 2.0 velocity
          length: 128 + Math.random() * 256,
          isAccent: Math.random() > 0.85
        })
      }
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      lineData.forEach((line) => {
        line.x += line.speed
        if (line.x - line.length > w) {
          line.x = -line.length
          line.speed = 4 + Math.random() * 12
        }

        // Draw Streamline Trace
        const gradient = ctx.createLinearGradient(line.x - line.length, 0, line.x, 0)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.8, line.isAccent ? accentColor : primaryColor)
        gradient.addColorStop(1, line.isAccent ? accentColor : primaryColor)

        ctx.beginPath()
        ctx.moveTo(line.x - line.length, line.y)
        ctx.lineTo(line.x, line.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = line.isAccent ? 1 : 0.5
        ctx.globalAlpha = line.isAccent ? opacity * 2.5 : opacity
        ctx.stroke()

        // Leading Edge "HUD" Marker
        if (line.isAccent) {
          ctx.globalAlpha = opacity * 3
          ctx.fillStyle = accentColor
          ctx.fillRect(line.x, line.y - 1, 4, 2)

          ctx.font = '8px monospace'
          ctx.fillText(`V_${Math.floor(line.speed * 10)}`, line.x + 8, line.y + 3)
        }
      })

      // Vertical Technical Rules (Left and Right gutters)
      ctx.globalAlpha = opacity * 0.5
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(32, 0); ctx.lineTo(32, h)
      ctx.moveTo(w - 32, 0); ctx.lineTo(w - 32, h)
      ctx.stroke()

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

export default RacingLinesBackground