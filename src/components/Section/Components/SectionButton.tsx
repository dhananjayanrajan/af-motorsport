"use client"
import React from 'react'
import Link from 'next/link'

interface SectionButtonProps {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    disabled?: boolean
    className?: string
}

const SectionButton: React.FC<SectionButtonProps> = ({
    label,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    iconPosition = 'right',
    disabled = false,
    className = ''
}) => {
    const baseStyles = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary border border-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary border border-transparent",
        outline: "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-foreground active:bg-foreground active:text-background",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-accent border border-transparent"
    }

    const sizes = {
        sm: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm gap-1.5 sm:gap-2",
        md: "px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base gap-2 sm:gap-3",
        lg: "px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg gap-3 sm:gap-4"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:scale-110">{icon}</span>}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">{icon}</span>}
        </>
    )

    if (href && !disabled) {
        return (
            <Link href={href} className={`${combinedClassName} group`} onClick={onClick}>
                {content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} disabled={disabled} className={`${combinedClassName} group`}>
            {content}
        </button>
    )
}

export default SectionButton
