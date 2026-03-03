'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import React from 'react'

interface ClippedButtonProps {
    label: string
    onClick?: () => void
    className?: string
    variant?: 'primary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children?: React.ReactNode
}

const diamondClip = 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)'

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
        sm: 'h-10 px-10 text-[9px]',
        md: 'h-12 px-12 text-[10px]',
        lg: 'h-14 px-14 text-[10px]',
    }

    return (
        <div className={cn('group relative inline-block w-full sm:w-auto z-50 cursor-pointer pointer-events-auto', className)}>
            <Button
                size="lg"
                className={cn(
                    'relative w-full sm:w-auto uppercase tracking-[0.4em] font-black transition-all duration-500 rounded-none overflow-hidden border-none',
                    sizeStyles[size],
                    isOutline
                        ? 'bg-transparent text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-white'
                        : 'bg-red-600 text-white'
                )}
                style={{ clipPath: diamondClip }}
                {...props}
            >
                <span
                    className={cn(
                        'absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]',
                        isOutline ? 'bg-zinc-950 text-white' : 'bg-white'
                    )}
                    style={{ clipPath: diamondClip }}
                />
                <span
                    className={cn(
                        'relative z-10 transition-all duration-300 group-hover:italic',
                        isOutline ? 'group-hover:text-white' : 'group-hover:text-red-600'
                    )}
                >
                    {children || label}
                </span>
            </Button>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[1px] bg-red-500 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        </div>
    )
}