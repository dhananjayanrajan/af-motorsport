// SectionTitle.tsx
"use client"
import React from 'react'

interface SectionTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    label,
    lineOne,
    lineTwo,
    highlight,
    variant = 1
}) => {
    const textBase = "font-black leading-none"

    if (variant === 2) {
        return (
            <div className="flex flex-col w-full border border-black-pure bg-white-pure transition-all duration-300 hover:bg-black-pure group">
                <div className="flex items-center justify-between p-6 border-b border-black-pure bg-white-pure group-hover:bg-black-pure">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary-500 border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:bg-white-pure">
                            <div className="w-1.5 h-1.5 bg-black-pure transition-all duration-300 group-hover:bg-primary-500" />
                        </div>
                        <p className="text-base font-bold text-black-pure group-hover:text-white-pure">{label}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
                        <div className="w-3 h-3 bg-secondary-500 transition-all duration-300 group-hover:bg-primary-500" />
                        <div className="w-3 h-3 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                    </div>
                </div>
                <div className="p-8 relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-500 rotate-45 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                    <h2 className={`${textBase} text-2xl text-black-pure group-hover:text-white-pure relative z-10`}>
                        <div className="mb-2">{lineOne}</div>
                        <div className="mb-2 text-primary-500 transition-all duration-300 group-hover:text-secondary-500">{highlight}</div>
                        <div>{lineTwo}</div>
                    </h2>
                </div>
                <div className="h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex flex-col w-full border border-black-pure overflow-hidden">
                <div className="flex border-b border-black-pure">
                    <div className="flex-1 p-8 bg-secondary-500 transition-all duration-300 hover:bg-black-pure group relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 -translate-x-full group-hover:translate-x-0" />
                        <h2 className={`${textBase} text-2xl text-black-pure transition-all duration-300 group-hover:text-white-pure relative z-10`}>
                            {lineOne}
                        </h2>
                    </div>
                    <div className="w-1/4 bg-black-pure flex items-center justify-center transition-all duration-300 hover:bg-primary-500 group cursor-pointer">
                        <div className="w-6 h-6 bg-white-pure transition-colors duration-300 group-hover:bg-black-pure rotate-45" />
                    </div>
                </div>
                <div className="p-8 bg-white-pure transition-all duration-300 hover:bg-black-pure group relative">
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                    <h2 className={`${textBase} text-2xl text-black-pure transition-all duration-300 group-hover:text-white-pure`}>
                        <span className="text-primary-500 transition-colors duration-300 group-hover:text-secondary-500">{highlight}</span> {lineTwo}
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="flex w-full border border-black-pure bg-white-pure transition-all duration-300 hover:shadow-lg group">
                <div className="w-20 bg-primary-500 border-r border-black-pure flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black-pure">
                    <span className="text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure rotate-90">0{variant}</span>
                </div>
                <div className="flex-1 p-8 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary-500 rotate-45 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                        <p className="text-base font-bold text-black-pure/60">{label}</p>
                    </div>
                    <h2 className={`${textBase} text-2xl text-black-pure relative z-10`}>
                        <div className="text-primary-500 mb-2">{highlight}</div>
                        <div>{lineOne}</div>
                        <div>{lineTwo}</div>
                    </h2>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="flex flex-col w-full border border-black-pure bg-white-pure transition-all duration-300 hover:bg-neutral-50 group">
                <div className="flex items-center p-4 border-b border-black-pure gap-4">
                    <div className="w-8 h-8 bg-primary-500 border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:bg-black-pure group-hover:border-white-pure">
                        <span className="text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">#</span>
                    </div>
                    <p className="text-base font-bold text-black-pure/60">{label}</p>
                    <div className="flex-1" />
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-black-pure/30 transition-all duration-300 group-hover:bg-primary-500" />
                        ))}
                    </div>
                </div>
                <div className="p-8">
                    <h2 className={`${textBase} text-2xl text-black-pure`}>
                        <div>{lineOne}</div>
                        <div className="text-primary-500 my-2">{highlight}</div>
                        <div>{lineTwo}</div>
                    </h2>
                </div>
                <div className="h-1 w-full flex">
                    <div className="flex-1 bg-primary-500 transition-all duration-300 group-hover:flex-[2]" />
                    <div className="flex-1 bg-secondary-500 transition-all duration-300 group-hover:flex-[2]" />
                    <div className="flex-1 bg-black-pure transition-all duration-300 group-hover:flex-[2]" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border border-black-pure bg-white-pure transition-all duration-300 hover:shadow-lg group">
            <div className="flex items-stretch border-b border-black-pure h-16">
                <div className="w-16 bg-primary-500 border-r border-black-pure relative overflow-hidden group/bar">
                    <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-x-full group-hover/bar:translate-x-0" />
                </div>
                <div className="w-16 bg-secondary-500 border-r border-black-pure relative overflow-hidden group/bar">
                    <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-y-full group-hover/bar:translate-y-0" />
                </div>
                <div className="flex-1 flex items-center px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                        <p className="text-base font-bold text-black-pure/60">{label}</p>
                    </div>
                </div>
            </div>
            <div className="p-8 bg-white-pure transition-colors duration-300 group-hover:bg-black-pure relative">
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary-500 rotate-45 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                <h2 className={`${textBase} text-2xl text-black-pure transition-colors duration-300 group-hover:text-white-pure relative z-10`}>
                    <div className="text-primary-500 transition-colors duration-300 group-hover:text-secondary-500 mb-2">{highlight}</div>
                    <div>{lineOne}</div>
                    <div>{lineTwo}</div>
                </h2>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
        </div>
    )
}

export default SectionTitle