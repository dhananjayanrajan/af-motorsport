'use client'

import { cn } from '@/utilities/cn'
import React, { useState } from 'react'

interface ClippedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  containerClassName?: string
  error?: boolean
}

export const ClippedInput = React.forwardRef<HTMLInputElement, ClippedInputProps>(
  ({ label, containerClassName, className, error, value, defaultValue, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className={cn('relative w-full flex flex-col', containerClassName)}>
        <div className={cn(
          "h-6 px-4 inline-flex items-center self-start transition-colors duration-300",
          error ? "bg-secondary text-white-pure" : isFocused ? "bg-primary text-black-pure" : "bg-black-pure text-white-pure"
        )}>
          <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">
            {label}
          </span>
        </div>

        <div className={cn(
          "relative h-14 flex items-stretch border-l-8 transition-all duration-300",
          error ? "border-secondary bg-secondary/5" : isFocused ? "border-primary bg-primary/5" : "border-black-pure bg-white-pure"
        )}>
          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
            className={cn(
              "flex-1 bg-transparent px-6 text-[11px] font-mono font-black uppercase tracking-[0.25em] outline-none border-y border-r border-black-pure",
              "text-black-pure placeholder:text-black-pure/20",
              className
            )}
            {...props}
          />

          {isFocused && (
            <div className="w-2 bg-black-pure border-y border-r border-black-pure animate-pulse" />
          )}

          {error && (
            <div className="px-4 flex items-center justify-center bg-secondary text-white-pure border-y border-r border-black-pure">
              <span className="text-[11px] font-mono font-black">!</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)
ClippedInput.displayName = 'ClippedInput'