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
        heading: "font-black tracking-tighter uppercase leading-none text-2xl",
        subheading: "font-bold text-[10px] uppercase tracking-[0.3em]",
        metadata: "font-black text-xl"
    }

    if (variant === 2) {
        return (
            <header className="group w-full grid grid-cols-[1fr_100px] border-4 border-black-pure bg-white-pure">
                <div className="p-8 border-r-4 border-black-pure">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-1 bg-primary-500" />
                        <span className={baseStyles.subheading}>{subtitle}</span>
                    </div>
                    <h1 className={baseStyles.heading}>{title}</h1>
                </div>
                <div className="bg-black-pure flex flex-col items-center justify-center text-white-pure group-hover:bg-secondary-500 group-hover:text-black-pure transition-colors">
                    <span className="text-[10px] mb-2 opacity-50">VAL</span>
                    <span className={baseStyles.metadata}>{metadata || '00'}</span>
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="group w-full flex flex-col border-2 border-black-pure overflow-hidden">
                <div className="bg-primary-500 p-2 border-b-2 border-black-pure flex justify-between px-6">
                    <span className={baseStyles.subheading}>{subtitle}</span>
                    <span className="font-black text-xs">#{metadata}</span>
                </div>
                <div className="p-8 bg-white-pure group-hover:bg-neutral-50 transition-colors">
                    <h1 className={baseStyles.heading}>
                        {title}
                        <div className="h-2 w-12 bg-secondary-500 mt-2 group-hover:w-full transition-all duration-700" />
                    </h1>
                </div>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className="group flex items-stretch gap-0 border-2 border-black-pure bg-white-pure">
                <div className="w-16 bg-black-pure flex items-center justify-center">
                    <span className="text-white-pure font-black -rotate-90 whitespace-nowrap text-xs">STATUS_OK</span>
                </div>
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-end mb-4">
                        <span className={baseStyles.subheading}>{subtitle}</span>
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-secondary-500 group-hover:bg-primary-500 transition-colors" />
                            ))}
                        </div>
                    </div>
                    <h1 className={baseStyles.heading}>{title}</h1>
                </div>
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className="group w-full border-t-8 border-black-pure pt-6 bg-white-pure">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="max-w-md">
                        <h1 className={baseStyles.heading}>
                            <span className="text-primary-500">{metadata}</span> / {title}
                        </h1>
                        <p className={`${baseStyles.subheading} mt-2 text-black-pure/40 group-hover:text-black-pure transition-colors`}>{subtitle}</p>
                    </div>
                    <div className="h-px flex-1 bg-black-pure/10 mb-2 hidden md:block" />
                </div>
            </header>
        )
    }

    return (
        <header className="group w-full relative p-8 border-2 border-black-pure bg-white-pure overflow-hidden">
            <div className="relative z-10">
                <span className={`${baseStyles.subheading} text-primary-500`}>{subtitle}</span>
                <h1 className={`${baseStyles.heading} mt-2 group-hover:tracking-[0.1em] transition-all duration-500`}>{title}</h1>
                <div className="mt-4 flex items-center gap-4">
                    <span className="text-[10px] font-black italic">ID: {metadata || 'NULL'}</span>
                    <div className="h-[2px] flex-1 bg-black-pure" />
                </div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-secondary-500 translate-x-8 -translate-y-8 rotate-45 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
        </header>
    )
}

export default SectionHeader