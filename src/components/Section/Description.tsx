"use client"

import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    if (variant === 2) {
        return (
            <div className="flex flex-col border-l-8 border-primary pl-8 py-4">
                <div className="w-12 h-1 bg-black-pure mb-6" />
                <p className="text-lg md:text-xl font-mono uppercase leading-relaxed text-foreground font-black tracking-[0.15em] max-w-lg">
                    {text}
                </p>
                <div className="flex gap-2 mt-8">
                    <div className="w-8 h-8 bg-tertiary-500" />
                    <div className="w-8 h-8 bg-black-pure" />
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col items-start text-left">
                <div className="flex gap-1 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-primary" />
                    ))}
                </div>
                <p className="text-lg md:text-xl font-mono uppercase leading-tight text-foreground font-black tracking-tight max-w-md">
                    {text}
                </p>
                <div className="mt-8 w-full h-px bg-black-pure/20" />
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="h-24 flex items-center gap-24">
                <div className="w-24 h-24 bg-primary hover:bg-primary-400 transition-colors duration-300" />
                <div className="w-24 h-24 bg-tertiary-500 hover:bg-tertiary-400 transition-colors duration-300" />
            </div>
            <div className="h-24 flex items-center">
                <p className="text-lg md:text-xl font-mono uppercase leading-relaxed text-foreground font-black tracking-[0.15em] max-w-lg">
                    {text}
                </p>
            </div>
            <div className="h-24">
                <div className="w-48 h-12 bg-black-pure hover:bg-black-400 transition-colors duration-300" />
            </div>
        </div>
    )
}

export default SectionDescription