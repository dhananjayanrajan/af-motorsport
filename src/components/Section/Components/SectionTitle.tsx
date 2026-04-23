"use client"
import React from 'react'

interface SectionTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    label,
    lineOne,
    lineTwo,
    highlight,
    variant = 1
}) => {
    const textBase = "font-bold uppercase tracking-tight leading-none"
    const responsiveText = {
        xs: "text-xl",
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-4xl",
        xl: "text-5xl",
        "2xl": "text-6xl"
    }

    if (variant === 2) {
        return (
            <div className="flex flex-col w-full bg-primary border-2 border-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-foreground bg-background">
                    <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-foreground">{label}</p>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-foreground rounded-sm" />
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-secondary rounded-sm" />
                    </div>
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                    <h2 className={`${textBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-foreground`}>
                        <div className="mb-2">{lineOne}</div>
                        <div className="mb-2 text-background">{highlight}</div>
                        <div>{lineTwo}</div>
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-foreground rounded-lg overflow-hidden">
                <div className="flex border-b-2 border-foreground">
                    <div className="flex-1 p-6 sm:p-8 bg-secondary group hover:bg-secondary/90 transition-colors duration-300">
                        <h2 className={`${textBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-secondary-foreground`}>
                            {lineOne}
                        </h2>
                    </div>
                    <div className="w-1/4 bg-foreground flex items-center justify-center transition-all duration-300 hover:bg-primary focus:bg-primary group active:scale-95" tabIndex={0}>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-background group-hover:bg-foreground transition-colors duration-300 rounded-sm" />
                    </div>
                </div>
                <div className="p-6 sm:p-8 bg-background">
                    <h2 className={`${textBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-foreground`}>
                        <span className="text-primary">{highlight}</span> {lineTwo}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border-2 border-foreground bg-background rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="flex items-stretch border-b-2 border-foreground h-14 sm:h-16 md:h-20">
                <div className="w-14 sm:w-16 md:w-20 bg-primary border-r-2 border-foreground hover:bg-primary/90 transition-colors duration-300" />
                <div className="w-14 sm:w-16 md:w-20 bg-secondary border-r-2 border-foreground hover:bg-secondary/90 transition-colors duration-300" />
                <div className="flex-1 flex items-center px-4 sm:px-6">
                    <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-foreground">{label}</p>
                </div>
            </div>
            <div className="p-6 sm:p-8 md:p-12 bg-background">
                <h2 className={`${textBase} ${responsiveText.xs} sm:${responsiveText.sm} md:${responsiveText.md} text-foreground`}>
                    <div className="text-primary">{highlight}</div>
                    <div>{lineOne}</div>
                    <div>{lineTwo}</div>
                </h2>
            </div>
        </div>
    )
}

export default SectionTitle
