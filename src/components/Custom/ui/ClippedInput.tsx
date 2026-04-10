// @/components/Custom/ui/ClippedInput.tsx
'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import React from 'react'

interface ClippedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  error?: boolean
  valid?: boolean
}

const diamondClip = 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'

export const ClippedInput = React.forwardRef<HTMLInputElement, ClippedInputProps>(
  ({ containerClassName, className, error, valid, value, defaultValue, ...props }, ref) => {
    return (
      <div className={cn('group relative w-full max-w-md', containerClassName)}>
        <div
          className={cn(
            `relative overflow-hidden h-14 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
            'bg-zinc-200/50 dark:bg-zinc-800/50 group-focus-within:bg-zinc-100 dark:group-focus-within:bg-zinc-900 backdrop-blur-md',
            error && 'bg-red-500/10',
            props.disabled && 'opacity-30'
          )}
          style={{ clipPath: diamondClip }}
        >
          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              `w-full h-full bg-transparent px-10 text-[12px] uppercase tracking-[0.2em] font-bold outline-none`,
              'placeholder:text-zinc-500 text-black dark:text-white',
              error && 'text-red-500',
              className
            )}
            {...props}
          />

          <div
            className="absolute inset-0 pointer-events-none border border-black/[0.08] dark:border-white/[0.08]"
            style={{ clipPath: diamondClip }}
          />

          <div
            className={cn(
              "absolute bottom-0 left-0 h-[4px] w-full transition-transform duration-500 ease-out translate-x-[-100%] group-focus-within:translate-x-0",
              error ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                valid ? `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}80]` :
                  "bg-black dark:bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            )}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full"
            style={{ transitionDuration: '1s' }}
          />
        </div>
      </div>
    )
  }
)
ClippedInput.displayName = 'ClippedInput'