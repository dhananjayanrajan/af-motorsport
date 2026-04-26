"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pBase = "text-base font-bold leading-tight"

    if (variant === 2) {
        return (
            <div className="group grid grid-cols-[10px_1fr] gap-4 bg-black-pure p-6 hover:bg-primary-500 transition-colors duration-500">
                <div className="grid grid-rows-3 gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-full h-full bg-white-pure group-hover:bg-black-pure" />
                    ))}
                </div>
                <p className={`${pBase} text-white-pure group-hover:text-black-pure`}>
                    {text}
                </p>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="group border-4 border-black-pure p-0 flex flex-col">
                <div className="p-6 bg-white-pure group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 border-b-4 border-black-pure">
                    <p className={`${pBase} text-black-pure`}>{text}</p>
                </div>
                <div className="h-4 bg-secondary-500" />
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="group relative p-8 border-2 border-dashed border-black-pure hover:border-solid transition-all">
                <div className="absolute -top-3 -left-3 bg-black-pure text-white-pure text-[10px] px-2 py-1 font-black">
                    DESC_04
                </div>
                <p className={`${pBase} text-black-pure opacity-60 group-hover:opacity-100`}>
                    {text}
                </p>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="flex items-stretch group border-2 border-black-pure">
                <div className="w-2 bg-black-pure group-hover:w-8 transition-all duration-500" />
                <div className="p-6 flex-1">
                    <p className={`${pBase} text-black-pure italic group-hover:not-italic transition-all`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative p-6 border-2 border-black-pure shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
            <p className={`${pBase} text-black-pure`}>
                {text}
            </p>
        </div>
    )
}

export default SectionDescription