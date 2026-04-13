// @/components/Custom/ui/ClippedInput.tsx
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
            error ? "bg-red-950" : "bg-black"
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        >
          <motion.div
            initial={false}
            animate={{
              x: isFocused ? '0%' : '-110%',
            }}
            transition={{ duration: 0.45, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-0 z-0 bg-[#00FF41] opacity-20"
          />

          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "relative z-10 w-full h-full bg-transparent px-10 text-[12px] uppercase tracking-[0.2em] font-[950] outline-none italic",
              "text-[#00FF41] placeholder:text-[#00FF41]/30",
              error && "text-red-500 placeholder:text-red-500/30",
              className
            )}
            {...props}
          />

          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none border transition-colors duration-300",
              error ? "border-red-500" : "border-[#00FF41]/40 group-focus-within:border-[#00FF41]"
            )}
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
          />

          <div
            className={cn(
              "absolute bottom-0 left-0 h-[4px] w-full transition-transform duration-500 ease-[0.87,0,0.13,1] translate-x-[-100%] group-focus-within:translate-x-0 z-30",
              error ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]" :
                "bg-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            )}
          />
        </div>

        <div
          className={cn(
            "absolute -inset-[1px] -z-10 opacity-40 group-focus-within:opacity-100 transition-opacity duration-300",
            error ? "bg-red-500" : "bg-[#00FF41]"
          )}
          style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
        />
      </div>
    )
  }
)
ClippedInput.displayName = 'ClippedInput'