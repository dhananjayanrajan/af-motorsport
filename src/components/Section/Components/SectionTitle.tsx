"use client"
import React from 'react'

interface SectionTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    label,
    lineOne,
    lineTwo,
    highlight,
    variant = 1
}) => {
    const textBase = "font-black uppercase tracking-tighter leading-none"

    if (variant === 2) {
        return (
            <div className="flex flex-col w-full border-2 border-black-pure bg-white-pure overflow-hidden transition-all duration-300 hover:bg-black-pure group">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-black-pure bg-white-pure group-hover:bg-black-pure">
                    <div className="flex items-center gap-3">
                        <div className="size-6 bg-primary-500 border border-black-pure flex items-center justify-center">
                            <div className="size-1.5 bg-black-pure rotate-45" />
                        </div>
                        <p className="text-[10px] font-mono font-black text-black-pure group-hover:text-white-pure tracking-widest">{label}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="size-3 bg-black-pure" />
                        <div className="size-3 bg-secondary-500" />
                        <div className="size-3 bg-primary-500" />
                    </div>
                </div>
                <div className="p-6 sm:p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 size-24 bg-primary-500 rotate-45 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                    <h2 className={`${textBase} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black-pure group-hover:text-white-pure relative z-10`}>
                        <div className="mb-2">{lineOne}</div>
                        <div className="mb-2 text-primary-500 group-hover:text-secondary-500 transition-colors">{highlight}</div>
                        <div>{lineTwo}</div>
                    </h2>
                </div>
                <div className="h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border-2 border-black-pure overflow-hidden">
                <div className="flex border-b-2 border-black-pure">
                    <div className="flex-1 p-6 sm:p-8 bg-secondary-500 group hover:bg-black-pure transition-colors duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <h2 className={`${textBase} text-xl sm:text-2xl md:text-3xl text-black-pure group-hover:text-white-pure relative z-10`}>
                            {lineOne}
                        </h2>
                    </div>
                    <div className="w-1/4 bg-black-pure flex items-center justify-center transition-all duration-300 group cursor-pointer" tabIndex={0}>
                        <div className="size-5 sm:size-6 bg-white-pure group-hover:bg-primary-500 transition-colors duration-300 rotate-45" />
                    </div>
                </div>
                <div className="p-6 sm:p-8 bg-white-pure group hover:bg-black-pure transition-colors duration-300 relative">
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <h2 className={`${textBase} text-xl sm:text-2xl md:text-3xl text-black-pure group-hover:text-white-pure`}>
                        <span className="text-primary-500 group-hover:text-secondary-500 transition-colors">{highlight}</span> {lineTwo}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border-2 border-black-pure bg-white-pure overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="flex items-stretch border-b-2 border-black-pure h-14 sm:h-16 md:h-20">
                <div className="w-14 sm:w-16 md:w-20 bg-primary-500 border-r-2 border-black-pure relative overflow-hidden group/bar">
                    <div className="absolute inset-0 bg-black-pure transform -translate-x-full group-hover/bar:translate-x-0 transition-transform duration-500" />
                </div>
                <div className="w-14 sm:w-16 md:w-20 bg-secondary-500 border-r-2 border-black-pure relative overflow-hidden group/bar">
                    <div className="absolute inset-0 bg-black-pure transform -translate-y-full group-hover/bar:translate-y-0 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex items-center px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="size-2 bg-primary-500 animate-pulse" />
                        <p className="text-[10px] sm:text-xs font-mono font-black text-black-pure tracking-widest">{label}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 sm:p-8 md:p-12 bg-white-pure group-hover:bg-black-pure transition-colors duration-300 relative">
                <div className="absolute -bottom-4 -right-4 size-20 bg-secondary-500 rotate-45 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                <h2 className={`${textBase} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black-pure group-hover:text-white-pure relative z-10`}>
                    <div className="text-primary-500 group-hover:text-secondary-500 transition-colors mb-2">{highlight}</div>
                    <div>{lineOne}</div>
                    <div>{lineTwo}</div>
                </h2>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </div>
    )
}

export default SectionTitle