'use client'

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
      <div className={cn('group relative w-full', containerClassName)}>
        <div
          className={cn(
            "relative h-16 w-full transition-all duration-200 border border-black-pure",
            error ? "bg-secondary/10" : "bg-white-pure"
          )}
        >
          <motion.div
            initial={false}
            animate={{
              width: isFocused ? '100%' : '0%',
            }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-y-0 left-0 z-0 bg-primary opacity-20"
          />

          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "relative z-10 w-full h-full bg-transparent px-8 text-sm uppercase tracking-widest font-black outline-none font-mono",
              "text-black-pure placeholder:text-black-pure/20",
              error && "text-secondary placeholder:text-secondary/40",
              className
            )}
            {...props}
          />

          <div
            className={cn(
              "absolute bottom-0 left-0 h-1 w-full transition-transform duration-300 translate-x-[-100%] group-focus-within:translate-x-0 z-30",
              error ? "bg-secondary translate-x-0" : "bg-primary"
            )}
          />
        </div>
      </div>
    )
  }
)
ClippedInput.displayName = 'ClippedInput'