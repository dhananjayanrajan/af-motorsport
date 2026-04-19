'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import { motion } from 'framer-motion'
import React from 'react'

interface ClippedButtonProps {
  label: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'full'
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
    sm: 'h-12 px-8 text-xs tracking-widest',
    md: 'h-14 px-10 text-sm tracking-widest',
    lg: 'h-16 px-12 text-base tracking-widest',
    full: 'h-16 w-full text-sm tracking-widest',
  }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'group relative inline-block cursor-pointer overflow-hidden',
        size === 'full' && 'w-full',
        className
      )}
    >
      <Button
        className={cn(
          "relative w-full uppercase font-black rounded-none border-none bg-transparent hover:bg-transparent transition-none z-10 p-0 overflow-hidden",
          sizeStyles[size],
          isOutline ? "text-black-pure" : "text-black-pure"
        )}
        {...props}
      >
        <div className="absolute inset-0 z-0">
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-200",
              isOutline ? "bg-white-pure border border-black-pure" : "bg-primary"
            )}
          />

          <motion.div
            variants={{
              initial: { x: '-100%' },
              hover: { x: '0%' }
            }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "absolute inset-0 z-10",
              isOutline ? "bg-primary" : "bg-secondary"
            )}
          />
        </div>

        <span
          className={cn(
            "relative z-20 transition-colors duration-200 flex items-center justify-center gap-4 px-8 font-mono",
            isOutline ? "group-hover:text-black-pure" : "group-hover:text-white-pure"
          )}
        >
          <div className="size-2 bg-black-pure" />
          <span className="relative">
            {children || label}
          </span>
          <div className="size-2 bg-black-pure" />
        </span>
      </Button>

      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-black-pure transition-all duration-200",
        size === 'full' ? "w-full" : "w-0 group-hover:w-full"
      )} />
    </motion.div>
  )
}