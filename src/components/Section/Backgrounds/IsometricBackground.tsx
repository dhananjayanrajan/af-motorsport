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
  accentColor = '#00ff41'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const ticking = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const fullHeight = parent.scrollHeight
      const fullWidth = parent.clientWidth

      canvas.width = fullWidth * dpr
      canvas.height = fullHeight * dpr
      canvas.style.width = `${fullWidth}px`
      canvas.style.height = `${fullHeight}px`
      ctx.scale(dpr, dpr)
      draw()
    }

    const isoX = (x: number, y: number) => (x - y) * 0.866
    const isoY = (x: number, y: number) => (x + y) * 0.5

    const drawBlock = (x: number, y: number, size: number, h: number, color: string, currentOpacity: number) => {
      const tx = isoX(x, y) * size
      const ty = isoY(x, y) * size - h

      ctx.globalAlpha = currentOpacity
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.moveTo(tx, ty)
      ctx.lineTo(tx + 0.866 * size, ty + 0.5 * size)
      ctx.lineTo(tx, ty + size)
      ctx.lineTo(tx - 0.866 * size, ty + 0.5 * size)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.stroke()

      if (h > 1) {
        ctx.beginPath()
        ctx.moveTo(tx + 0.866 * size, ty + 0.5 * size)
        ctx.lineTo(tx + 0.866 * size, ty + 0.5 * size + h)
        ctx.lineTo(tx, ty + size + h)
        ctx.lineTo(tx, ty + size)
        ctx.closePath()
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.fill()
        ctx.stroke()
      }
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const size = 60
      const xCount = Math.ceil(w / size) + 10
      const yCount = Math.ceil(h / size) + 10

      ctx.save()
      ctx.translate(w / 2, size * 2)

      for (let x = -Math.floor(xCount / 2); x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
          const screenX = (w / 2) + isoX(x, y) * size
          const screenY = (size * 2) + isoY(x, y) * size

          const dx = mouseRef.current.x - screenX
          const dy = mouseRef.current.y - screenY
          const distSq = dx * dx + dy * dy

          let blockHeight = 0
          let isActive = false

          if (distSq < 90000) {
            const dist = Math.sqrt(distSq)
            const influence = Math.max(0, 1 - dist / 300)
            blockHeight = influence * 100
            isActive = influence > 0.4
          }

          const color = isActive ? accentColor : 'rgba(0,0,0,0.02)'
          const finalOpacity = isActive ? opacity * 3 : opacity

          drawBlock(x, y, size, blockHeight, color, finalOpacity)
        }
      }
      ctx.restore()
      ticking.current = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      if (!ticking.current) {
        requestAnimationFrame(draw)
        ticking.current = true
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    resize()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
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