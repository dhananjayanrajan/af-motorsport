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
  opacity = 0.3,
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
  
  const tileSize = 48
  const cols = Math.ceil(dimensions.width / tileSize) + 2
  const rows = Math.ceil(dimensions.height / tileSize) + 2
  
  return (
    <div ref={containerRef} className={`absolute inset-0 ${zIndex} pointer-events-none overflow-hidden`}>
      <div className="relative w-full h-full">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const pattern = (row * 7 + col * 13) % 6
            const randomOpacity = 0.1 + (Math.sin(row * 0.7 + col * 0.3) * 0.1) + Math.random() * 0.15
            const isPrimary = (row + col) % 3 === 0
            const color = isPrimary ? primaryColor : secondaryColor
            
            return (
              <div
                key={`${row}-${col}`}
                className="absolute group transition-all duration-500 hover:scale-110"
                style={{
                  left: col * tileSize,
                  top: row * tileSize,
                  width: tileSize,
                  height: tileSize,
                  opacity: randomOpacity * opacity
                }}
              >
                {pattern === 0 && (
                  <div
                    className="w-full h-full"
                    style={{
                      background: color,
                      clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
                    }}
                  />
                )}
                {pattern === 1 && (
                  <div
                    className="w-full h-full"
                    style={{
                      background: color,
                      clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
                    }}
                  />
                )}
                {pattern === 2 && (
                  <div
                    className="w-full h-full"
                    style={{
                      background: color,
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }}
                  />
                )}
                {pattern === 3 && (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0" style={{ background: color, clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)' }} />
                    <div className="absolute inset-0" style={{ background: color, clipPath: 'polygon(0% 100%, 100% 100%, 50% 50%)', opacity: 0.6 }} />
                  </div>
                )}
                {pattern === 4 && (
                  <div
                    className="w-full h-full rounded-full"
                    style={{ background: color, opacity: 0.5 }}
                  />
                )}
                {pattern === 5 && (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0" style={{ border: `1px solid ${color}`, transform: 'rotate(45deg)' }} />
                  </div>
                )}
                <div className="absolute inset-0 transition-all duration-300 group-hover:bg-white/10" />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MosaicBackground
