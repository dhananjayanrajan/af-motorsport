// SectionDescription.tsx
"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pBase = "font-bold leading-relaxed"

    if (variant === 2) {
        return (
            <div className="flex w-full border border-black-pure bg-white-pure transition-all duration-300 hover:bg-black-pure group">
                <div className="w-16 bg-primary-500 border-r border-black-pure shrink-0 transition-all duration-300 group-hover:bg-white-pure flex items-center justify-center">
                    <div className="w-2 h-2 bg-black-pure rotate-45 transition-all duration-300 group-hover:bg-primary-500" />
                </div>
                <div className="p-8">
                    <p className={`${pBase} text-base text-black-pure transition-colors duration-300 group-hover:text-white-pure max-w-xl`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border border-black-pure bg-white-pure overflow-hidden">
                <div className="p-8 border-b border-black-pure transition-all duration-300 hover:bg-black-pure group relative">
                    <p className={`${pBase} text-base text-black-pure transition-colors duration-300 group-hover:text-white-pure max-w-xl`}>
                        {text}
                    </p>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </div>
                <div className="flex h-12">
                    <div className="flex-1 bg-primary-500 border-r border-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-x-full group-hover/bar:translate-x-0" />
                    </div>
                    <div className="flex-1 bg-secondary-500 border-r border-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-x-full group-hover/bar:translate-x-0 delay-75" />
                    </div>
                    <div className="flex-1 bg-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 -translate-x-full group-hover/bar:translate-x-0 delay-150" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="p-8 border border-black-pure bg-white-pure transition-all duration-300 hover:translate-x-1 hover:translate-y-1 group">
                <div className="flex items-start gap-4">
                    <div className="w-1 h-12 bg-primary-500 transition-all duration-300 group-hover:h-16" />
                    <p className={`${pBase} text-base text-black-pure flex-1`}>
                        {text}
                    </p>
                </div>
                <div className="flex gap-2 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-6 h-0.5 bg-black-pure/20 transition-all duration-300 group-hover:bg-primary-500 group-hover:w-8" />
                    ))}
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="flex items-center w-full border border-black-pure bg-white-pure overflow-hidden transition-all duration-300 hover:bg-primary-500 group">
                <div className="w-1 h-full bg-black-pure transition-all duration-300 group-hover:w-2" />
                <div className="flex-1 p-8">
                    <p className={`${pBase} text-base text-black-pure transition-colors duration-300 group-hover:text-white-pure`}>
                        {text}
                    </p>
                </div>
                <div className="w-12 h-full bg-secondary-500 flex items-center justify-center transition-all duration-300 group-hover:bg-black-pure">
                    <div className="w-2 h-2 bg-black-pure rotate-45 transition-all duration-300 group-hover:bg-primary-500" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 border border-black-pure bg-white-pure transition-all duration-300 hover:bg-black-pure group relative overflow-hidden">
            <p className={`${pBase} text-base text-black-pure transition-colors duration-300 group-hover:text-white-pure max-w-xl relative z-10`}>
                {text}
            </p>
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500 transition-all duration-500 -translate-y-8 translate-x-8 rotate-45 group-hover:translate-y-0 group-hover:translate-x-0" />
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
        </div>
    )
}

export default SectionDescription