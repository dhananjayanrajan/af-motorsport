'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface ClippedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
  error?: boolean
  valid?: boolean
}

export const ClippedInput = React.forwardRef<HTMLInputElement, ClippedInputProps>(
  ({ containerClassName, className, error, valid, value, defaultValue, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className={cn('group relative w-full max-w-md', containerClassName)}>
        <div
          className={cn(
            "relative h-14 w-full overflow-hidden transition-all duration-300",
            error ? "bg-red-50" : "bg-white"
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        >
          <motion.div
            initial={false}
            animate={{
              x: isFocused ? '0%' : '-110%',
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 opacity-10"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />

          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "relative z-10 w-full h-full bg-transparent px-10 text-[11px] uppercase tracking-[0.2em] font-black outline-none italic",
              "text-black placeholder:text-zinc-300",
              error && "text-red-600 placeholder:text-red-300",
              className
            )}
            {...props}
          />

          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none border transition-colors duration-300",
              error ? "border-red-600" : "border-zinc-200 group-focus-within:border-black"
            )}
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
          />

          <div
            className={cn(
              "absolute bottom-0 left-0 h-[3px] w-full transition-transform duration-500 ease-[0.16,1,0.3,1] translate-x-[-100%] group-focus-within:translate-x-0 z-30",
              error ? "bg-red-600" : ""
            )}
            style={!error ? { backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] } : {}}
          />
        </div>

        <div
          className={cn(
            "absolute -inset-[1px] -z-10 opacity-10 group-focus-within:opacity-30 transition-opacity duration-300",
            error ? "bg-red-600" : "bg-black"
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        />
      </div>
    )
  }
)
ClippedInput.displayName = 'ClippedInput'