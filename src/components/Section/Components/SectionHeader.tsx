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
    const textBase = "font-bold uppercase tracking-tight"

    if (variant === 2) {
        return (
            <header className="w-full grid grid-cols-1 md:grid-cols-[auto_1fr] items-stretch border-2 border-black-pure bg-white-pure z-1 relative">
                <div className="bg-primary-500 p-4 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black-pure z-1 relative">
                    <span className="[writing-mode:vertical-lr] rotate-180 text-black-pure font-black text-[9px] tracking-widest z-1 relative">
                        {metadata || "SECTION"}
                    </span>
                </div>
                <div className="p-6 md:p-8 bg-white-pure z-1 relative">
                    <span className="block text-secondary-500 text-[10px] font-black mb-1 z-1 relative">{subtitle}</span>
                    <h2 className={`${textBase} text-xl md:text-2xl text-black-pure leading-tight z-1 relative`}>{title}</h2>
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full flex flex-col bg-black-pure border-2 border-black-pure z-1 relative">
                <div className="bg-white-pure px-4 py-2 border-b-2 border-black-pure flex justify-between items-center z-1 relative">
                    <span className="text-black-pure font-black text-[9px] z-1 relative">{subtitle}</span>
                    {metadata && <span className="bg-primary-500 text-black-pure text-[9px] px-2 py-0.5 font-black z-1 relative">{metadata}</span>}
                </div>
                <div className="p-6 bg-black-pure z-1 relative">
                    <h2 className={`${textBase} text-2xl text-white-pure leading-none z-1 relative`}>{title}</h2>
                    <div className="mt-3 flex gap-1 z-1 relative">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-2 w-2 bg-primary-500 z-1 relative" />
                        ))}
                    </div>
                </div>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className="w-full p-1 bg-black-pure z-1 relative">
                <div className="bg-white-pure p-6 border-2 border-black-pure flex flex-col items-center text-center z-1 relative">
                    <div className="bg-secondary-500 text-black-pure px-4 py-1 mb-4 border-2 border-black-pure z-1 relative">
                        <span className="text-[10px] font-black z-1 relative">{metadata || "ID: 00"}</span>
                    </div>
                    <h2 className={`${textBase} text-xl text-black-pure mb-2 z-1 relative`}>{title}</h2>
                    <p className="text-black-pure font-bold text-[11px] tracking-widest z-1 relative">{subtitle}</p>
                </div>
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className="w-full bg-neutral-100 border-l-[8px] border-black-pure p-6 md:p-10 z-1 relative">
                <div className="max-w-4xl z-1 relative">
                    <div className="flex items-center gap-3 mb-2 z-1 relative">
                        <span className="text-primary-500 font-black text-[11px] z-1 relative">{subtitle}</span>
                        <div className="h-[1px] flex-1 bg-black-pure z-1 relative" />
                    </div>
                    <h2 className={`${textBase} text-3xl text-black-pure leading-tight mb-4 z-1 relative`}>{title}</h2>
                    {metadata && (
                        <div className="inline-block bg-black-pure px-3 py-1 z-1 relative">
                            <span className="text-white-pure font-bold text-[9px] z-1 relative">{metadata}</span>
                        </div>
                    )}
                </div>
            </header>
        )
    }

    return (
        <header className="w-full bg-white-pure border-2 border-black-pure z-1 relative overflow-hidden">
            <div className="flex flex-col md:flex-row z-1 relative">
                <div className="bg-black-pure p-6 md:p-8 flex-1 z-1 relative">
                    <h2 className={`${textBase} text-2xl text-white-pure mb-1 z-1 relative`}>{title}</h2>
                    <p className="text-primary-500 font-black text-[10px] z-1 relative">{subtitle}</p>
                </div>
                {metadata && (
                    <div className="bg-white-pure p-6 md:w-48 flex items-center justify-center border-t-2 md:border-t-0 md:border-l-2 border-black-pure z-1 relative">
                        <span className="text-black-pure font-black text-[11px] text-center z-1 relative">{metadata}</span>
                    </div>
                )}
            </div>
        </header>
    )
}

export default SectionHeader