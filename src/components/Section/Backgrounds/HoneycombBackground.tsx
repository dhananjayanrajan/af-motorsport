"use client"
import React, { useEffect, useRef } from 'react'

interface HoneycombBackgroundProps {
  zIndex?: string
  opacity?: number
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({
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

    let animationFrame: number

    const colors = {
      base: '#F5F5F3',
      top: '#FFFFFF',
      side1: '#E8E8E4',
      side2: '#DEDEDA',
      accent: { r: 0, g: 120, b: 255 }
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

    const drawHex = (x: number, y: number, size: number, mX: number, mY: number) => {
      const dx = x - mX
      const dy = y - mY
      const dist = Math.sqrt(dx * dx + dy * dy)

      const maxDist = 250
      const influence = Math.max(0, 1 - dist / maxDist)
      const easeInfluence = Math.sin(influence * Math.PI / 2)

      const z = easeInfluence * 5
      const tiltX = (dx / maxDist) * z
      const tiltY = (dy / maxDist) * z

      const h = (size * Math.sqrt(3)) / 2

      const drawFace = (points: number[][], color: string) => {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(points[0][0], points[0][1])
        points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]))
        ctx.closePath()
        ctx.fill()
      }

      ctx.save()
      ctx.globalAlpha = opacity

      const tr = 255, tg = 255, tb = 255
      const currR = Math.round(tr + (colors.accent.r - tr) * (easeInfluence * 0.4))
      const currG = Math.round(tg + (colors.accent.g - tg) * (easeInfluence * 0.4))
      const currB = Math.round(tb + (colors.accent.b - tb) * (easeInfluence * 0.4))

      drawFace([
        [x + h + tiltX, y - size / 2 + tiltY],
        [x + h, y - size / 2],
        [x + h, y + size / 2],
        [x + h + tiltX, y + size / 2 + tiltY]
      ], colors.side2)

      drawFace([
        [x + h + tiltX, y + size / 2 + tiltY],
        [x + h, y + size / 2],
        [x, y + size],
        [x + tiltX, y + size + tiltY]
      ], colors.side1)

      drawFace([
        [x + tiltX, y - size + tiltY],
        [x + h + tiltX, y - size / 2 + tiltY],
        [x + h + tiltX, y + size / 2 + tiltY],
        [x + tiltX, y + size + tiltY],
        [x - h + tiltX, y + size / 2 + tiltY],
        [x - h + tiltX, y - size / 2 + tiltY]
      ], `rgb(${currR}, ${currG}, ${currB})`)

      ctx.restore()
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05

      ctx.fillStyle = colors.base
      ctx.fillRect(0, 0, w, h)

      const size = 32
      const xDist = size * Math.sqrt(3)
      const yDist = size * 1.5

      for (let j = -1; j < (h / yDist) + 1; j++) {
        const offset = (j % 2 === 0) ? 0 : xDist / 2
        for (let i = -1; i < (w / xDist) + 1; i++) {
          const x = i * xDist + offset
          const y = j * yDist
          drawHex(x, y, size - 1.5, mouse.current.x, mouse.current.y)
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
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${zIndex} pointer-events-none`}
    />
  )
}

export default HoneycombBackground