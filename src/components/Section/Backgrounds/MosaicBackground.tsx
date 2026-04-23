"use client"
import React, { useState, useEffect, useRef } from 'react'

interface MosaicBackgroundProps {
  zIndex?: string
  opacity?: number
  primaryColor?: string
  secondaryColor?: string
}

const MosaicBackground: React.FC<MosaicBackgroundProps> = ({
  zIndex = 'z-0',
  opacity = 0.45,
  primaryColor = 'var(--primary)',
  secondaryColor = 'var(--secondary)'
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const tileSize = 64
  const cols = Math.ceil(dimensions.width / tileSize) + 1
  const rows = Math.ceil(dimensions.height / tileSize) + 1

  return (
    <div ref={containerRef} className={`absolute inset-0 ${zIndex} pointer-events-none overflow-hidden`}>
      <div className="relative w-full h-full">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const isPrimary = (row + col) % 2 === 0
            const color = isPrimary ? primaryColor : secondaryColor
            const baseAlpha = 0.15 + Math.sin(row * 0.3 + col * 0.5) * 0.08

            return (
              <div
                key={`${row}-${col}`}
                className="absolute transition-all duration-1000"
                style={{
                  left: col * tileSize,
                  top: row * tileSize,
                  width: tileSize - 6,
                  height: tileSize - 6,
                  backgroundColor: color,
                  opacity: baseAlpha * opacity,
                  borderRadius: '16px'
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default MosaicBackground
