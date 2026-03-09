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
    xs: 'h-8 px-6 text-[8px] tracking-[0.2em]',
    sm: 'h-10 px-10 text-[9px]',
    md: 'h-12 px-12 text-[10px]',
    lg: 'h-14 px-14 text-[11px]',
    xl: `h-16 px-20 text-[12px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`,
    '2xl': `h-20 px-24 text-[14px] ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`,
    full: 'h-14 w-full text-[11px]',
  }

  return (
    <div className={cn('group relative inline-block w-full sm:w-auto z-50 cursor-pointer pointer-events-auto', size === 'full' && 'w-full', className)}>
      <div
        className={`absolute inset-0 bg-[#00FF41]/15 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity ${DESIGN_SYSTEM.ANIMATION.DURATION_GLOW} rounded-full scale-95 pointer-events-none`}
      />

      <Button
        size="lg"
        className={cn(
          `relative w-full sm:w-auto uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT} font-black transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} rounded-none overflow-hidden border-none cursor-pointer z-10`,
          sizeStyles[size],
          isOutline
            ? 'bg-transparent text-neutral-600 border border-zinc-800'
            : 'bg-[#00FF41] text-black'
        )}
        style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        {...props}
      >
        <span
          className={cn(
            `absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} ease-[${DESIGN_SYSTEM.ANIMATION.EASING_CUBIC}]`,
            isOutline ? 'bg-zinc-950' : 'bg-black'
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        />

        <span
          className={cn(
            `relative z-20 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW} group-hover:italic flex items-center justify-center gap-2`,
            isOutline
              ? 'group-hover:text-white group-hover:[text-shadow:0_0_15px_rgba(255,255,255,0.7)]'
              : 'group-hover:text-[#00FF41] group-hover:[text-shadow:0_0_18px_rgba(0,255,65,0.9)]'
          )}
        >
          {children || label}
        </span>
      </Button>

      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[1px] bg-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,1)] transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} opacity-0 group-hover:opacity-100 z-30`} />
    </div>
  )
}