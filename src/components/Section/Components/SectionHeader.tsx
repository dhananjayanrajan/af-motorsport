"use client"
import React from 'react'

interface SectionHeaderProps {
    title: string
    subtitle: string
    variant?: 1 | 2 | 3
    metadata?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    variant = 1,
    metadata
}) => {
    const baseStyles = {
        heading: "font-bold uppercase tracking-tight leading-none",
        subheading: "font-mono font-semibold uppercase tracking-wider",
        metadata: "font-semibold text-center"
    }

    const responsiveHeading = {
        xs: "text-xl",
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-4xl",
        xl: "text-5xl",
        "2xl": "text-6xl"
    }

    if (variant === 2) {
        return (
            <header className="w-full bg-foreground border-b border-border flex flex-col md:flex-row items-stretch rounded-t-lg overflow-hidden transition-all duration-300">
                <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/20 bg-primary flex-1 group hover:bg-primary/90 transition-colors duration-300">
                    <h1 className={`${baseStyles.heading} ${responsiveHeading.xs} sm:${responsiveHeading.sm} md:${responsiveHeading.md} lg:${responsiveHeading.lg} text-primary-foreground`}>
                        {title}
                    </h1>
                </div>
                <div className="p-6 sm:p-8 flex-1 bg-background">
                    <h2 className={`${baseStyles.heading} ${responsiveHeading.xs} sm:${responsiveHeading.sm} md:${responsiveHeading.md} text-foreground opacity-60`}>
                        {subtitle}
                    </h2>
                </div>
                {metadata && (
                    <div className="w-20 sm:w-24 bg-secondary flex items-center justify-center border-l border-border">
                        <span className={`${baseStyles.metadata} text-base sm:text-lg md:text-xl text-secondary-foreground`}>
                            {metadata}
                        </span>
                    </div>
                )}
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full border-b border-border bg-background grid grid-cols-1 md:grid-cols-4 rounded-t-lg overflow-hidden">
                <div className="col-span-1 md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border group hover:bg-accent/50 transition-colors duration-300">
                    <h1 className={`${baseStyles.heading} ${responsiveHeading.xs} sm:${responsiveHeading.sm} md:${responsiveHeading.md} lg:${responsiveHeading.lg} text-foreground`}>
                        {title}
                    </h1>
                </div>
                <div className="p-6 sm:p-8 bg-primary flex items-center justify-between group hover:bg-primary/90 transition-colors duration-300">
                    <span className={`${baseStyles.subheading} text-sm text-primary-foreground`}>Total</span>
                    <span className={`${baseStyles.metadata} text-xl sm:text-2xl text-primary-foreground`}>{metadata || '0'}</span>
                </div>
            </header>
        )
    }

    return (
        <header className="w-full bg-background border-b border-border flex items-stretch rounded-t-lg overflow-hidden">
            <div className="w-16 sm:w-20 md:w-24 bg-primary border-r border-border flex items-center justify-center group hover:bg-primary/90 transition-colors duration-300">
                <span className={`${baseStyles.metadata} text-base sm:text-lg md:text-xl text-primary-foreground`}>
                    {metadata || '0'}
                </span>
            </div>
            <div className="p-6 sm:p-8 flex-1 group hover:bg-accent/50 transition-colors duration-300">
                <h1 className={`${baseStyles.heading} ${responsiveHeading.xs} sm:${responsiveHeading.sm} md:${responsiveHeading.md} text-foreground mb-2`}>
                    {title}
                </h1>
                <p className={`${baseStyles.subheading} text-sm text-secondary`}>{subtitle}</p>
            </div>
        </header>
    )
}

export default SectionHeader
