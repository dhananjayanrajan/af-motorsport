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
    const textBase = "font-black uppercase tracking-normal leading-none"

    if (variant === 2) {
        return (
            <div className="flex flex-col w-full bg-primary-500 border-4 border-black-pure">
                <div className="flex items-center justify-between p-6 border-b-4 border-black-pure bg-white-pure">
                    <p className="text-sm md:text-base font-mono font-black text-black-pure">{label || 'CATALOG REFERENCE'}</p>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-black-pure" />
                        <div className="w-4 h-4 bg-secondary-500" />
                    </div>
                </div>
                <div className="p-8 md:p-12">
                    <h2 className={`${textBase} text-2xl md:text-4xl text-black-pure`}>
                        <div className="mb-2">{lineOne || 'PRIMARY HEADING'}</div>
                        <div className="mb-2 text-white-pure">{highlight || 'FEATURED SELECTION'}</div>
                        <div>{lineTwo || 'SECONDARY HEADING'}</div>
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-4 border-black-pure">
                <div className="flex border-b-4 border-black-pure">
                    <div className="flex-1 p-8 bg-secondary-500">
                        <h2 className={`${textBase} text-2xl md:text-4xl text-black-pure`}>
                            {lineOne || 'HEADING ALPHA'}
                        </h2>
                    </div>
                    <div className="w-1/4 bg-black-pure flex items-center justify-center transition-colors duration-100 hover:bg-primary-500 group" tabIndex={0}>
                        <div className="w-6 h-6 bg-white-pure group-hover:bg-black-pure" />
                    </div>
                </div>
                <div className="p-8 bg-white-pure">
                    <h2 className={`${textBase} text-2xl md:text-4xl text-black-pure`}>
                        <span className="text-primary-500">{highlight || 'ACCENT'}</span> {lineTwo || 'HEADING BETA'}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border-4 border-black-pure bg-white-pure">
            <div className="flex items-stretch border-b-4 border-black-pure h-16 md:h-20">
                <div className="w-16 md:w-20 bg-primary-500 border-r-4 border-black-pure" />
                <div className="w-16 md:w-20 bg-secondary-500 border-r-4 border-black-pure" />
                <div className="flex-1 flex items-center px-6">
                    <p className="text-sm md:text-base font-mono font-black text-black-pure">{label || 'SECTION LABEL'}</p>
                </div>
            </div>
            <div className="p-8 md:p-12 bg-white-pure">
                <h2 className={`${textBase} text-2xl md:text-4xl text-black-pure`}>
                    <div className="text-primary-500">{highlight || 'HIGHLIGHT'}</div>
                    <div>{lineOne || 'FIRST LINE'}</div>
                    <div>{lineTwo || 'SECOND LINE'}</div>
                </h2>
            </div>
        </div>
    )
}

export default SectionMainTitle