"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pBase = "font-mono font-black uppercase tracking-tighter leading-relaxed"

    if (variant === 2) {
        return (
            <div className="flex w-full border-2 border-black-pure bg-white-pure overflow-hidden transition-all duration-300 hover:bg-black-pure group">
                <div className="w-12 sm:w-16 bg-primary-500 border-r-2 border-black-pure shrink-0 group-hover:bg-white-pure transition-colors duration-300 flex items-center justify-center">
                    <div className="size-2 bg-black-pure rotate-45 group-hover:bg-primary-500 transition-colors" />
                </div>
                <div className="p-6 sm:p-8">
                    <p className={`${pBase} text-xs sm:text-sm text-black-pure group-hover:text-white-pure max-w-xl`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-black-pure bg-white-pure overflow-hidden">
                <div className="p-6 sm:p-8 border-b-2 border-black-pure group hover:bg-black-pure transition-colors duration-300 relative">
                    <p className={`${pBase} text-xs sm:text-sm text-black-pure group-hover:text-white-pure max-w-xl`}>
                        {text}
                    </p>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <div className="flex h-10 sm:h-12">
                    <div className="flex-1 bg-primary-500 border-r-2 border-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-black-pure transform -translate-x-full group-hover/bar:translate-x-0 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 bg-secondary-500 border-r-2 border-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-black-pure transform -translate-x-full group-hover/bar:translate-x-0 transition-transform duration-500 delay-100" />
                    </div>
                    <div className="flex-1 bg-black-pure relative overflow-hidden group/bar">
                        <div className="absolute inset-0 bg-primary-500 transform -translate-x-full group-hover/bar:translate-x-0 transition-transform duration-500 delay-200" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 sm:p-8 md:p-12 border-2 border-black-pure bg-white-pure transition-all duration-300 hover:bg-black-pure group relative overflow-hidden">
            <p className={`${pBase} text-xs sm:text-sm text-black-pure group-hover:text-white-pure max-w-xl relative z-10`}>
                {text}
            </p>
            <div className="absolute top-0 right-0 size-16 bg-primary-500 -translate-y-8 translate-x-8 rotate-45 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    )
}

export default SectionDescription