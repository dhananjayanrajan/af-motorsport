"use client"
import React from 'react'

interface SectionMainTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3
}

const SectionMainTitle: React.FC<SectionMainTitleProps> = ({
    label,
    lineOne,
    lineTwo,
    highlight,
    variant = 1
}) => {
    const textBase = "font-bold uppercase tracking-normal leading-none"

    if (variant === 2) {
        return (
            <div className="flex flex-col w-full bg-primary border-2 border-foreground rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b-2 border-foreground bg-background">
                    <p className="text-base md:text-lg font-mono font-semibold text-foreground">{label || 'Catalog Reference'}</p>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-foreground rounded-sm" />
                        <div className="w-4 h-4 bg-secondary rounded-sm" />
                    </div>
                </div>
                <div className="p-8 md:p-12">
                    <h2 className={`${textBase} text-2xl md:text-4xl text-foreground`}>
                        <div className="mb-2">{lineOne || 'Primary Heading'}</div>
                        <div className="mb-2 text-background">{highlight || 'Featured Selection'}</div>
                        <div>{lineTwo || 'Secondary Heading'}</div>
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-foreground rounded-lg overflow-hidden">
                <div className="flex border-b-2 border-foreground">
                    <div className="flex-1 p-8 bg-secondary">
                        <h2 className={`${textBase} text-2xl md:text-4xl text-secondary-foreground`}>
                            {lineOne || 'Heading Alpha'}
                        </h2>
                    </div>
                    <div className="w-1/4 bg-foreground flex items-center justify-center transition-colors duration-300 hover:bg-primary group" tabIndex={0}>
                        <div className="w-6 h-6 bg-background group-hover:bg-foreground rounded-sm transition-colors" />
                    </div>
                </div>
                <div className="p-8 bg-background">
                    <h2 className={`${textBase} text-2xl md:text-4xl text-foreground`}>
                        <span className="text-primary">{highlight || 'Accent'}</span> {lineTwo || 'Heading Beta'}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border-2 border-foreground bg-background rounded-lg overflow-hidden">
            <div className="flex items-stretch border-b-2 border-foreground h-16 md:h-20">
                <div className="w-16 md:w-20 bg-primary border-r-2 border-foreground" />
                <div className="w-16 md:w-20 bg-secondary border-r-2 border-foreground" />
                <div className="flex-1 flex items-center px-6">
                    <p className="text-base md:text-lg font-mono font-semibold text-foreground">{label || 'Section Label'}</p>
                </div>
            </div>
            <div className="p-8 md:p-12 bg-background">
                <h2 className={`${textBase} text-2xl md:text-4xl text-foreground`}>
                    <div className="text-primary">{highlight || 'Highlight'}</div>
                    <div>{lineOne || 'First Line'}</div>
                    <div>{lineTwo || 'Second Line'}</div>
                </h2>
            </div>
        </div>
    )
}

export default SectionMainTitle