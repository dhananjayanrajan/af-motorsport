// @/components/Custom/ui/ClippedButton.tsx
'use client'

import { Button } from '@/components/ui/button'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
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
    xs: 'h-8 px-6 text-[11px] tracking-[0.2em]',
    sm: 'h-10 px-10 text-[12px]',
    md: 'h-12 px-12 text-[13px]',
    lg: 'h-14 px-14 text-[14px]',
    xl: `h-16 px-20 text-[15px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`,
    '2xl': `h-20 px-24 text-[18px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`,
    full: 'h-14 w-full text-[14px]',
  }

  return (
    <div className={cn('group relative inline-block w-full sm:w-auto z-50 cursor-pointer pointer-events-auto', size === 'full' && 'w-full', className)}>
      <div
        className={`absolute inset-0 blur-[25px] opacity-0 group-hover:opacity-40 transition-opacity ${DESIGN_SYSTEM.ANIMATION.DURATION_GLOW} scale-110 pointer-events-none`}
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
      />

      <Button
        size="lg"
        className={cn(
          `relative w-full sm:w-auto uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT} font-black transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} rounded-none overflow-hidden border-none cursor-pointer z-10`,
          sizeStyles[size],
          isOutline
            ? 'bg-zinc-950/20 text-zinc-400 border border-zinc-800 backdrop-blur-md'
            : 'text-white'
        )}
        style={{
          clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP,
          backgroundColor: isOutline ? 'transparent' : DESIGN_SYSTEM.COLORS.PRIMARY
        }}
        {...props}
      >
        <div
          className={cn(
            `absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} ease-[${DESIGN_SYSTEM.ANIMATION.EASING_CUBIC}]`,
            isOutline ? 'bg-white' : 'bg-black'
          )}
        />

        <span
          className={cn(
            `relative z-20 transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} flex items-center justify-center gap-2`,
            isOutline
              ? 'group-hover:text-black'
              : 'group-hover:text-white'
          )}
        >
          {children || label}
        </span>

        <div
          className={cn(
            "absolute inset-0 border-2 pointer-events-none transition-opacity duration-300",
            isOutline ? "border-zinc-700 opacity-50 group-hover:opacity-100" : "border-white/20 opacity-100"
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        />
      </Button>
    </div>
  )
}