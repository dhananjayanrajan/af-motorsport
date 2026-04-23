"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pBase = "font-mono uppercase font-semibold tracking-normal leading-relaxed"
    const responsiveText = {
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl"
    }

    if (variant === 2) {
        return (
            <div className="flex w-full border-2 border-foreground bg-secondary rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="w-12 sm:w-16 bg-foreground shrink-0 hover:bg-foreground/90 transition-colors duration-300" />
                <div className="p-6 sm:p-8">
                    <p className={`${pBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-secondary-foreground max-w-xl`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-foreground bg-background rounded-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b-2 border-foreground group hover:bg-accent/50 transition-colors duration-300">
                    <p className={`${pBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-foreground max-w-xl`}>
                        {text}
                    </p>
                </div>
                <div className="flex h-10 sm:h-12">
                    <div className="flex-1 bg-primary border-r-2 border-foreground hover:bg-primary/90 transition-colors duration-300" />
                    <div className="flex-1 bg-secondary border-r-2 border-foreground hover:bg-secondary/90 transition-colors duration-300" />
                    <div className="flex-1 bg-foreground hover:bg-foreground/90 transition-colors duration-300" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 sm:p-8 md:p-12 border-2 border-foreground bg-background rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-accent/50">
            <p className={`${pBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-foreground max-w-xl`}>
                {text}
            </p>
        </div>
    )
}

export default SectionDescription
