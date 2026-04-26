// SectionHeader.tsx
"use client"
import React from 'react'

interface SectionHeaderProps {
    title: string
    subtitle: string
    variant?: 1 | 2 | 3 | 4 | 5
    metadata?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    variant = 1,
    metadata
}) => {
    const baseStyles = {
        heading: "font-black leading-none",
        subheading: "font-bold",
        metadata: "font-bold text-center"
    }

    if (variant === 2) {
        return (
            <header className="w-full border border-black-pure flex flex-col md:flex-row items-stretch overflow-hidden transition-all duration-300 group">
                <div className="p-8 border-b md:border-b-0 md:border-r border-black-pure bg-primary-500 flex-1 relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-20 h-20 bg-black-pure rotate-45 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
                            <span className="text-base font-bold text-black-pure/60">ACTIVE</span>
                        </div>
                        <h1 className={`${baseStyles.heading} text-2xl text-black-pure`}>
                            {title}
                        </h1>
                    </div>
                </div>
                <div className="p-8 flex-1 bg-white-pure relative overflow-hidden">
                    <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-secondary-500 rotate-45 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-0.5 bg-black-pure" />
                            <span className="text-base font-bold text-black-pure/40">DESIGNATION</span>
                        </div>
                        <h2 className={`${baseStyles.heading} text-2xl text-black-pure/60`}>
                            {subtitle}
                        </h2>
                    </div>
                </div>
                {metadata && (
                    <div className="w-24 bg-secondary-500 flex flex-col items-center justify-center border-l border-black-pure relative overflow-hidden group/counter">
                        <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-y-full group-hover/counter:translate-y-0" />
                        <div className="relative z-10 text-center">
                            <span className="text-base font-bold text-black-pure/60">COUNT</span>
                            <span className={`${baseStyles.metadata} text-2xl text-black-pure block font-bold`}>
                                {metadata}
                            </span>
                        </div>
                    </div>
                )}
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full border border-black-pure bg-white-pure grid grid-cols-1 md:grid-cols-4 overflow-hidden group">
                <div className="col-span-1 md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-black-pure relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-primary-500 border border-black-pure flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:rotate-45">
                            <div className="w-1.5 h-1.5 bg-black-pure" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-base font-bold text-primary-500">// HEADER</span>
                                <div className="w-1.5 h-1.5 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                            </div>
                            <h1 className={`${baseStyles.heading} text-2xl text-black-pure`}>
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="p-8 bg-primary-500 flex flex-col justify-center relative overflow-hidden group/right">
                    <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-x-full group-hover/right:translate-x-0" />
                    <div className="relative z-10">
                        <span className={`${baseStyles.subheading} text-base text-black-pure/60 block mb-1`}>TOTAL UNITS</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`${baseStyles.metadata} text-2xl text-black-pure font-bold`}>
                                {metadata || '0'}
                            </span>
                            <span className="text-base font-bold text-black-pure/40">RECORDS</span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className="w-full border border-black-pure bg-white-pure flex items-stretch overflow-hidden group">
                <div className="w-6 bg-primary-500 transition-all duration-300 group-hover:w-8" />
                <div className="flex-1 p-8 relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-2 h-2 bg-black-pure/30 transition-all duration-300 group-hover:bg-primary-500" />
                            ))}
                        </div>
                        <p className="text-base font-bold text-black-pure/40">{subtitle}</p>
                    </div>
                    <h1 className={`${baseStyles.heading} text-2xl text-black-pure`}>
                        {title}
                    </h1>
                    {metadata && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
                            <span className="text-base font-bold text-primary-500">{metadata}</span>
                        </div>
                    )}
                </div>
                <div className="w-12 bg-secondary-500 transition-all duration-300 group-hover:w-16" />
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className="w-full border border-black-pure bg-white-pure p-8 transition-all duration-300 hover:bg-black-pure group">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-500 border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:bg-white-pure">
                            <span className="text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-primary-500">#</span>
                        </div>
                        <p className="text-base font-bold text-black-pure/60 transition-colors duration-300 group-hover:text-white-pure/60">{subtitle}</p>
                    </div>
                    {metadata && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                            <span className="text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">{metadata}</span>
                        </div>
                    )}
                </div>
                <h1 className={`${baseStyles.heading} text-2xl text-black-pure transition-colors duration-300 group-hover:text-white-pure`}>
                    {title}
                </h1>
                <div className="w-12 h-0.5 bg-primary-500 mt-4 transition-all duration-300 group-hover:w-24" />
            </header>
        )
    }

    return (
        <header className="w-full border border-black-pure bg-white-pure flex items-stretch overflow-hidden group">
            <div className="w-20 bg-primary-500 border-r border-black-pure flex flex-col items-center justify-center relative overflow-hidden group/counter">
                <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-y-full group-hover/counter:translate-y-0" />
                <div className="relative z-10 text-center">
                    <span className="text-base font-bold text-black-pure/60">NO.</span>
                    <span className="font-bold text-2xl text-black-pure block">
                        {metadata || '00'}
                    </span>
                </div>
            </div>
            <div className="p-8 flex-1 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-secondary-500 rotate-45 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary-500" />
                            <div className="w-2 h-2 bg-secondary-500" />
                            <div className="w-2 h-2 bg-black-pure" />
                        </div>
                        <p className={`${baseStyles.subheading} text-base text-black-pure/40`}>
                            {subtitle}
                        </p>
                    </div>
                    <h1 className={`${baseStyles.heading} text-2xl text-black-pure`}>
                        {title}
                    </h1>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
        </header>
    )
}

export default SectionHeader