"use client"

import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    if (variant === 2) {
        return (
            <div className="flex flex-col border-l-4 border-primary pl-5 py-3 max-w-full">
                <div className="w-8 h-0.5 bg-black-pure mb-4" />
                <p className="text-[11px] md:text-xs font-mono uppercase leading-relaxed text-black-pure font-black tracking-[0.15em] max-w-lg">
                    {text}
                </p>
                <div className="flex gap-1.5 mt-5">
                    <div className="w-5 h-5 bg-tertiary-500" />
                    <div className="w-5 h-5 bg-black-pure" />
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col items-start text-left max-w-full">
                <div className="flex gap-0.5 mb-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 bg-primary" />
                    ))}
                </div>
                <p className="text-[11px] md:text-xs font-mono uppercase leading-tight text-black-pure font-black tracking-tight max-w-md">
                    {text}
                </p>
                <div className="mt-5 w-full h-px bg-black-pure/20" />
            </div>
        )
    }

    return (
        <div className="flex flex-col max-w-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary hover:bg-primary-400 transition-colors duration-300 shrink-0" />
                <div className="w-12 h-12 bg-tertiary-500 hover:bg-tertiary-400 transition-colors duration-300 shrink-0" />
            </div>
            <p className="text-[11px] md:text-xs font-mono uppercase leading-relaxed text-black-pure font-black tracking-[0.15em] max-w-lg">
                {text}
            </p>
        </div>
    )
}

export default SectionDescription