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
    const baseStyles = "relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 disabled:opacity-30 border-2 border-black-pure overflow-hidden active:translate-y-1 active:translate-x-1 active:shadow-none"

    const variants = {
        primary: "bg-primary-500 text-black-pure shadow-[4px_4px_0px_#000] hover:bg-black-pure hover:text-white-pure",
        secondary: "bg-secondary-500 text-black-pure shadow-[4px_4px_0px_#000] hover:bg-primary-500",
        outline: "bg-white-pure text-black-pure shadow-[4px_4px_0px_#000] hover:bg-neutral-100",
        ghost: "border-transparent text-black-pure hover:bg-black-pure hover:text-white-pure shadow-none"
    }

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-8 py-4 text-base",
        lg: "px-12 py-6 text-xl"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

    const content = (
        <div className="relative z-10 flex items-center gap-3">
            {icon && iconPosition === 'left' && <span className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform">{icon}</span>}
            <span>{label}</span>
            {icon && iconPosition === 'right' && <span className="w-5 h-5 shrink-0 group-hover:-rotate-12 transition-transform">{icon}</span>}
        </div>
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