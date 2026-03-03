'use client'

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
            'relative overflow-hidden h-14 transition-all duration-300',
            'bg-zinc-900 group-focus-within:bg-zinc-800',
            error && 'bg-red-950/40',
            valid && !error && 'bg-emerald-950/20',
            props.disabled && 'bg-zinc-950 opacity-50'
          )}
          style={{ clipPath: diamondClip }}
        >
          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              'w-full h-full bg-transparent px-10 text-[10px] uppercase tracking-[0.2em] font-bold outline-none',
              'placeholder:text-zinc-600 disabled:cursor-not-allowed',
              isFilled ? 'text-white' : 'text-zinc-400',
              error && 'text-red-200',
              valid && !error && 'text-emerald-200',
              className
            )}
            {...props}
          />
          <div
            className={cn(
              'absolute inset-0 border pointer-events-none transition-colors duration-300',
              'border-zinc-800 group-focus-within:border-zinc-700',
              error && 'border-red-600',
              valid && !error && 'border-emerald-500/50'
            )}
            style={{ clipPath: diamondClip }}
          />
        </div>

        <div
          className={cn(
            'absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500',
            error ? 'w-2/3 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,1)] opacity-100' :
              valid ? 'w-2/3 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] opacity-100' :
                'w-0 bg-white group-focus-within:w-1/2 opacity-0 group-focus-within:opacity-100 group-focus-within:bg-red-600 group-focus-within:shadow-[0_0_12px_rgba(220,38,38,1)]'
          )}
        />
      </div>
    )
  }
)

ClippedInput.displayName = 'ClippedInput'