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
    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t border-border">
                <button
                    onClick={onClick}
                    className="flex items-stretch group outline-none h-20 md:h-24 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <div className={`flex-1 ${buttonBgColor} ${buttonTextColor} flex items-center px-8 md:px-12 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground`}>
                        <span className="font-bold text-xl md:text-2xl uppercase tracking-wide truncate">{label}</span>
                    </div>
                    <div className="w-24 md:w-32 bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background border-l border-border transition-colors duration-300 shrink-0">
                        <svg className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto p-8 border-t border-border bg-foreground rounded-lg">
                {proceedLabel && (
                    <p className="text-primary font-mono text-sm mb-6 tracking-wide uppercase font-semibold">{proceedLabel} // {path}</p>
                )}
                <button
                    onClick={onClick}
                    className="w-full border-2 border-background py-4 px-8 text-background font-bold font-mono tracking-wide uppercase hover:bg-background hover:text-foreground focus:bg-primary focus:text-primary-foreground focus:border-primary transition-colors duration-300 text-base outline-none rounded-md"
                >
                    {label}
                </button>
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {description && (
                <div className="p-8 border-b border-border">
                    {infoLabel && (
                        <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">{infoLabel}</p>
                    )}
                    <p className="text-base font-medium uppercase leading-relaxed text-foreground border-l-4 border-primary pl-6">
                        {description}
                    </p>
                </div>
            )}

            <div className="flex flex-col">
                <div className="flex items-center justify-between px-8 h-12 bg-muted/50 overflow-hidden">
                    <span className="text-sm font-semibold uppercase text-muted-foreground tracking-wide whitespace-nowrap">{directoryLabel || 'Path'}</span>
                    <span className="text-sm font-semibold uppercase text-primary tracking-wide whitespace-nowrap ml-4">{path}</span>
                </div>
                <button
                    onClick={onClick}
                    className={`w-full h-20 md:h-24 ${buttonBgColor} ${buttonTextColor} font-mono text-base font-bold uppercase tracking-wide hover:bg-primary hover:text-primary-foreground focus:bg-secondary focus:text-secondary-foreground transition-colors duration-300 outline-none`}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}

export default SectionCTA