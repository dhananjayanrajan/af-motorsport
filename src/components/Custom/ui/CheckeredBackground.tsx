'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { motion } from 'motion/react'

interface CheckeredBackgroundProps {
  mode?: 'vertical' | 'horizontal'
  direction?: 'forward' | 'reverse'
  speed?: number
  opacity?: number
  className?: string
}

export const CheckeredBackground = ({
  mode = 'horizontal',
  direction = 'forward',
  speed = 10,
  opacity = 0.15,
  className = '',
}: CheckeredBackgroundProps) => {
  const animName = mode === 'horizontal' ? 'horizontalDrift' : 'verticalDrift'
  const fromPos = direction === 'forward' ? '0 0' : mode === 'horizontal' ? '1200px 0' : '0 1200px'
  const toPos = direction === 'forward' ? (mode === 'horizontal' ? '1200px 0' : '0 1200px') : '0 0'

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          opacity: opacity,
          transform: 'skewX(-20deg) scale(1.6)',
          backgroundImage: `
            conic-gradient(
              ${DESIGN_SYSTEM.COLORS.PRIMARY} 0.25turn, 
              transparent 0 0.5turn, 
              ${DESIGN_SYSTEM.COLORS.PRIMARY} 0 0.75turn, 
              transparent 0
            )
          `,
          backgroundSize: '120px 120px',
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        <style jsx>{`
          @keyframes horizontalDrift {
            from { background-position: ${fromPos}; }
            to { background-position: ${toPos}; }
          }
          @keyframes verticalDrift {
            from { background-position: ${fromPos}; }
            to { background-position: ${toPos}; }
          }
        `}</style>
      </motion.div>
    </div>
  )
}