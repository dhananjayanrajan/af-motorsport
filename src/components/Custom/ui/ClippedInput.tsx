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
    const isFilled = (value !== undefined && value !== '') || (defaultValue !== undefined && defaultValue !== '')

    return (
      <div className={cn('group relative w-full max-w-md', containerClassName)}>
        <div
          className={cn(
            `relative overflow-hidden h-14 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
            'bg-zinc-100 group-focus-within:bg-white',
            error && 'bg-red-50',
            valid && !error && `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5`,
            props.disabled && 'bg-zinc-200 opacity-50'
          )}
          style={{ clipPath: diamondClip }}
        >
          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              `w-full h-full bg-transparent px-10 text-[12px] uppercase tracking-[0.2em] font-bold outline-none`,
              'placeholder:text-zinc-400 disabled:cursor-not-allowed',
              isFilled ? 'text-black' : 'text-zinc-600',
              error && 'text-red-600',
              valid && !error && `text-black`,
              className
            )}
            {...props}
          />
          <div
            className={cn(
              `absolute inset-0 border-2 pointer-events-none transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
              'border-zinc-200 group-focus-within:border-black',
              error && 'border-red-600',
              valid && !error && `border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
            )}
            style={{ clipPath: diamondClip }}
          />
        </div>

        <div
          className={cn(
            'absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500',
            error ? 'w-2/3 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)] opacity-100' :
              valid ? `w-2/3 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_12px_rgba(0,255,65,0.4)] opacity-100` :
                `w-0 bg-black group-focus-within:w-1/2 opacity-0 group-focus-within:opacity-100`
          )}
        />
      </div>
    )
  }
)

ClippedInput.displayName = 'ClippedInput'