'use client'

import { Button } from '@/components/ui/button'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion } from 'framer-motion'
import React from 'react'

interface ClippedButtonProps {
  label: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  children?: React.ReactNode
}

export const ClippedButton = ({
  label,
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ClippedButtonProps) => {
  const isOutline = variant === 'outline'

  const sizeStyles = {
    xs: 'h-8 px-8 text-[11px] tracking-[0.2em]',
    sm: 'h-10 px-10 text-[12px]',
    md: 'h-12 px-12 text-[13px]',
    lg: 'h-14 px-14 text-[14px]',
    xl: `h-16 px-20 text-[15px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`,
    '2xl': `h-20 px-24 text-[18px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`,
    full: 'h-14 w-full text-[14px]',
  }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'group relative inline-block z-50 cursor-pointer overflow-visible',
        size === 'full' && 'w-full',
        className
      )}
    >
      <Button
        className={cn(
          "relative w-full sm:w-auto uppercase font-[950] rounded-none border-none bg-transparent hover:bg-transparent transition-none z-10 p-0 overflow-visible",
          sizeStyles[size],
          isOutline ? "text-[#00FF41]" : "text-black"
        )}
        {...props}
      >
        <div
          className="absolute inset-0 z-0"
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        >
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-300",
              isOutline ? "bg-black" : "bg-[#00FF41]"
            )}
          />

          <motion.div
            variants={{
              initial: { x: '-110%', skewX: -25 },
              hover: { x: '0%', skewX: -25 }
            }}
            transition={{ duration: 0.45, ease: [0.87, 0, 0.13, 1] }}
            className={cn(
              "absolute inset-0 z-10",
              isOutline ? "bg-[#00FF41]" : "bg-black"
            )}
          />

          <motion.div
            variants={{
              initial: { x: '-110%', skewX: -25 },
              hover: { x: '-25%', skewX: -25 }
            }}
            transition={{ duration: 0.45, ease: [0.87, 0, 0.13, 1], delay: 0.05 }}
            className={cn(
              "absolute inset-0 z-20 opacity-40",
              isOutline ? "bg-black" : "bg-[#00FF41]"
            )}
          />

          <motion.div
            variants={{
              initial: { x: '-110%', skewX: -25 },
              hover: { x: '-50%', skewX: -25 }
            }}
            transition={{ duration: 0.45, ease: [0.87, 0, 0.13, 1], delay: 0.1 }}
            className={cn(
              "absolute inset-0 z-30 opacity-20",
              isOutline ? "bg-black" : "bg-[#00FF41]"
            )}
          />
        </div>

        <span
          className={cn(
            "relative z-40 transition-colors duration-300 flex items-center justify-center gap-4 italic",
            isOutline ? "group-hover:text-black" : "group-hover:text-[#00FF41]"
          )}
        >
          <motion.div
            variants={{
              initial: { scale: 1, rotate: 45, backgroundColor: isOutline ? '#00FF41' : '#000000' },
              hover: { scale: 1.1, rotate: 225, backgroundColor: isOutline ? '#000000' : '#00FF41' }
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2"
          />

          <span className="relative">
            {children || label.replace(/_/g, ' ')}
          </span>

          <motion.div
            variants={{
              initial: { scale: 1, rotate: 45, backgroundColor: isOutline ? '#00FF41' : '#000000' },
              hover: { scale: 1.1, rotate: 225, backgroundColor: isOutline ? '#000000' : '#00FF41' }
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2"
          />
        </span>
      </Button>

      <div
        className={cn(
          "absolute -inset-[1px] z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300",
          isOutline ? "bg-[#00FF41]" : "bg-black"
        )}
        style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
      >
        <div
          className="w-full h-full bg-transparent"
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        />
      </div>
    </motion.div>
  )
}