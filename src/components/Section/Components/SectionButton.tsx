"use client"
import Link from 'next/link'
import React from 'react'

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
    const baseStyles = "inline-flex items-center justify-center font-mono font-black uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] border-2 relative overflow-hidden group"

    const variants = {
        primary: "bg-primary-500 text-black-pure border-black-pure hover:bg-black-pure hover:text-white-pure",
        secondary: "bg-secondary-500 text-black-pure border-black-pure hover:bg-black-pure hover:text-white-pure",
        outline: "bg-transparent border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure",
        ghost: "bg-transparent border-transparent text-black-pure hover:border-black-pure hover:bg-white-100"
    }

    const sizes = {
        sm: "px-3 py-1.5 text-[10px] gap-1.5",
        md: "px-5 py-2.5 text-xs gap-2",
        lg: "px-8 py-3.5 text-sm gap-3"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>}
            <span className="relative z-10">{label}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </>
    )

    if (href && !disabled) {
        return (
            <Link href={href} className={`${combinedClassName}`} onClick={onClick}>
                {content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} disabled={disabled} className={`${combinedClassName}`}>
            {content}
        </button>
    )
}

export default SectionButton