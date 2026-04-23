"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pStyle = "text-base md:text-lg font-mono uppercase font-semibold tracking-normal leading-normal max-w-xl"

    if (variant === 2) {
        return (
            <div className="flex w-full border-2 border-foreground bg-secondary rounded-lg overflow-hidden">
                <div className="w-12 md:w-16 bg-foreground shrink-0" />
                <div className="p-8">
                    <p className={`${pStyle} text-secondary-foreground`}>
                        {text || 'The requested information is currently being processed for this specific entry.'}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-foreground bg-background rounded-lg overflow-hidden">
                <div className="p-8 border-b-2 border-foreground">
                    <p className={`${pStyle} text-foreground`}>
                        {text || 'Full descriptive documentation for this sequence is listed below.'}
                    </p>
                </div>
                <div className="flex h-12">
                    <div className="flex-1 bg-primary border-r-2 border-foreground" />
                    <div className="flex-1 bg-secondary border-r-2 border-foreground" />
                    <div className="flex-1 bg-foreground" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 md:p-12 border-2 border-foreground bg-background rounded-lg">
            <p className={`${pStyle} text-foreground`}>
                {text || 'Standard detailed overview regarding the selected technical parameters.'}
            </p>
        </div>
    )
}

export default SectionDescription