"use client"

import React from 'react'

interface SectionMainTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3
}

const SectionMainTitle: React.FC<SectionMainTitleProps> = ({ label, lineOne, lineTwo, highlight, variant = 1 }) => {
    if (variant === 2) {
        return (
            <div className="flex flex-col">
                <div className="h-16 md:h-24 flex items-center">
                    <div className="w-12 h-1 bg-black-pure" />
                    <p className="px-6 text-base md:text-xl lg:text-2xl font-mono tracking-[0.3em] text-foreground uppercase font-black">
                        {label}
                    </p>
                    <div className="flex-1 h-px bg-black-pure/10" />
                </div>
                <div className="flex flex-col py-8">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.8]">
                        <span className="text-primary-500">{highlight}</span><br />
                        {lineOne} {lineTwo}
                    </h2>
                </div>
                <div className="flex gap-1">
                    <div className="w-12 h-12 bg-primary-500" />
                    <div className="w-12 h-12 bg-secondary-500" />
                    <div className="w-12 h-12 bg-black-pure" />
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col">
                <div className="flex items-end gap-4 mb-4">
                    <div className="w-2 h-16 bg-black-pure" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
                        {lineOne}<br />{lineTwo}
                    </h2>
                    <div className="w-12 h-12 bg-primary-500 rotate-45 mb-2" />
                </div>
                <div className="bg-black-pure px-4 py-2 self-start">
                    <p className="text-white-pure font-mono text-sm font-black tracking-[0.4em] uppercase">{highlight}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="h-16 md:h-24 flex items-start">
                <div className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary-500 hover:bg-primary-400 transition-colors duration-300" />
                <div className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-secondary-500 hover:bg-secondary-400 transition-colors duration-300 ml-12 md:ml-20 lg:ml-24" />
                <div className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-black-pure hover:bg-black-400 transition-colors duration-300 ml-12 md:ml-20 lg:ml-24" />
            </div>
            <div className="h-16 md:h-24 flex items-center">
                <p className="text-base md:text-xl lg:text-2xl font-mono tracking-[0.3em] text-foreground uppercase font-black">
                    {label}
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl lg:text-5xl flex gap-4 md:gap-6 font-black uppercase tracking-tighter text-foreground">
                    {lineOne}
                    <span className="text-primary-500">{highlight}</span>
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground">
                    {lineTwo}
                </h2>
            </div>
            <div className="h-16 md:h-24 flex items-end">
                <div className="w-48 md:w-72 lg:w-96 h-8 md:h-10 lg:h-12 bg-secondary-500 hover:bg-secondary-400 transition-colors duration-300" />
            </div>
        </div>
    )
}

export default SectionMainTitle