"use client"

import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pStyle = "text-sm md:text-base font-mono uppercase font-black tracking-normal leading-normal max-w-xl"

    if (variant === 2) {
        return (
            <div className="flex w-full border-2 border-black-pure bg-secondary-500">
                <div className="w-12 md:w-16 bg-black-pure shrink-0" />
                <div className="p-8">
                    <p className={`${pStyle} text-black-pure`}>
                        {text || 'The requested information is currently being processed for this specific entry.'}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-black-pure bg-white-pure">
                <div className="p-8 border-b-2 border-black-pure">
                    <p className={`${pStyle} text-black-pure`}>
                        {text || 'Full descriptive documentation for this sequence is listed below.'}
                    </p>
                </div>
                <div className="flex h-12">
                    <div className="flex-1 bg-primary-500 border-r-2 border-black-pure" />
                    <div className="flex-1 bg-secondary-500 border-r-2 border-black-pure" />
                    <div className="flex-1 bg-black-pure" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 md:p-12 border-2 border-black-pure bg-white-pure">
            <p className={`${pStyle} text-black-pure`}>
                {text || 'Standard detailed overview regarding the selected technical parameters.'}
            </p>
        </div>
    )
}

export default SectionDescription