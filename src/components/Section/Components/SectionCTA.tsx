"use client"
import React from 'react'

interface SectionCTAProps {
    label: string
    path: string
    description?: string
    onClick?: () => void
    buttonBgColor?: string
    buttonTextColor?: string
    variant?: 1 | 2 | 3
    infoLabel?: string
    directoryLabel?: string
    proceedLabel?: string
}

const SectionCTA: React.FC<SectionCTAProps> = ({
    label,
    path,
    description,
    onClick,
    buttonBgColor = "bg-foreground",
    buttonTextColor = "text-background",
    variant = 1,
    infoLabel = "",
    directoryLabel = "",
    proceedLabel = ""
}) => {
    const buttonBase = "font-mono font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95"

    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t border-border">
                <button
                    onClick={onClick}
                    className="flex items-stretch group outline-none h-16 md:h-20 lg:h-24 rounded-lg overflow-hidden shadow-sm hover:shadow-md focus:shadow-md transition-all duration-300"
                >
                    <div className={`flex-1 ${buttonBgColor} ${buttonTextColor} flex items-center px-6 md:px-8 lg:px-12 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-focus:bg-primary group-focus:text-primary-foreground active:scale-[0.99]`}>
                        <span className="font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-wide truncate">{label}</span>
                    </div>
                    <div className="w-20 md:w-24 lg:w-32 bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-focus:bg-foreground group-focus:text-background border-l border-border transition-all duration-300 shrink-0">
                        <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-45 group-focus:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto p-6 md:p-8 border-t border-border bg-foreground rounded-lg">
                {proceedLabel && (
                    <p className="text-primary font-mono text-xs sm:text-sm mb-4 md:mb-6 tracking-wide uppercase font-semibold">{proceedLabel} // {path}</p>
                )}
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full border-2 border-background py-3 md:py-4 px-6 md:px-8 text-background hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus:border-primary active:bg-primary active:text-primary-foreground text-sm md:text-base rounded-md`}
                >
                    {label}
                </button>
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {description && (
                <div className="p-6 md:p-8 border-b border-border group hover:bg-accent/50 transition-colors duration-300">
                    {infoLabel && (
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-secondary mb-3 md:mb-4">{infoLabel}</p>
                    )}
                    <p className="text-sm md:text-base font-medium uppercase leading-relaxed text-foreground border-l-4 border-primary pl-4 md:pl-6">
                        {description}
                    </p>
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-10 md:h-12 bg-muted/50 overflow-hidden">
                    <span className="text-xs md:text-sm font-semibold uppercase text-muted-foreground tracking-wide whitespace-nowrap">{directoryLabel || 'Path'}</span>
                    <span className="text-xs md:text-sm font-semibold uppercase text-primary tracking-wide whitespace-nowrap ml-4">{path}</span>
                </div>
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full h-16 md:h-20 lg:h-24 ${buttonBgColor} ${buttonTextColor} hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-secondary active:text-secondary-foreground`}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}

export default SectionCTA
