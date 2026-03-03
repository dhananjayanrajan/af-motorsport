'use client'

import { cn } from '@/utilities/cn'
import React from 'react'

interface ClippedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string
}

const diamondClip = 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'

export const ClippedInput = ({
    containerClassName,
    className,
    ...props
}: ClippedInputProps) => {
    return (
        <div className={cn('group relative w-full max-w-md', containerClassName)}>
            <div
                className="relative bg-neutral-100 dark:bg-zinc-900 overflow-hidden h-14"
                style={{ clipPath: diamondClip }}
            >
                <input
                    className={cn(
                        'w-full h-full bg-transparent px-10 text-[10px] uppercase tracking-[0.2em] font-medium outline-none text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-zinc-600',
                        className
                    )}
                    {...props}
                />
                <div
                    className="absolute inset-0 border border-neutral-300 dark:border-zinc-800 pointer-events-none"
                    style={{ clipPath: diamondClip }}
                />
            </div>
            <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-focus-within:w-1/2 h-[1px] bg-red-600 transition-all duration-500 opacity-0 group-focus-within:opacity-100"
            />
        </div>
    )
}