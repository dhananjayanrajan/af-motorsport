// SectionButton.tsx
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
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 border"

    const variants = {
        primary: "bg-primary-500 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure focus:ring-primary-500",
        secondary: "bg-secondary-500 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure focus:ring-secondary-500",
        outline: "bg-transparent border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure focus:ring-black-pure",
        ghost: "bg-transparent border-transparent text-black-pure hover:bg-neutral-100 hover:border-black-pure focus:ring-primary-500"
    }

    const sizes = {
        sm: "px-4 py-2 text-base gap-2",
        md: "px-6 py-3 text-base gap-3",
        lg: "px-8 py-4 text-2xl gap-4"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
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