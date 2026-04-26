"use client"
import React from 'react'

interface SectionCTAProps {
    label: string
    path: string
    description?: string
    onClick?: () => void
    buttonBgColor?: string
    buttonTextColor?: string
    variant?: 1 | 2 | 3 | 4 | 5
    infoLabel?: string
    directoryLabel?: string
    proceedLabel?: string
}

const SectionCTA: React.FC<SectionCTAProps> = ({
    label,
    path,
    description,
    onClick,
    buttonBgColor = "bg-black-pure",
    buttonTextColor = "text-white-pure",
    variant = 1,
    infoLabel = "",
    directoryLabel = "",
    proceedLabel = ""
}) => {
    const textBase = "font-black uppercase tracking-tighter leading-none"

    if (variant === 2) {
        return (
            <div className="w-full mt-20 group">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-black-pure" />
                    <span className="text-xs font-bold opacity-30">{directoryLabel} // {path}</span>
                </div>
                <button onClick={onClick} className="w-full grid grid-cols-[1fr_auto] items-stretch border-4 border-black-pure overflow-hidden">
                    <div className="bg-white-pure p-8 group-hover:bg-primary-500 transition-colors duration-500 text-left">
                        <h2 className={`${textBase} text-2xl`}>{label}</h2>
                        {description && <p className="mt-4 text-base font-bold opacity-60 leading-tight max-w-xl">{description}</p>}
                    </div>
                    <div className="bg-black-pure w-24 flex items-center justify-center text-primary-500 group-hover:bg-secondary-500 group-hover:text-black-pure transition-all duration-500">
                        <svg className="w-10 h-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={4} d="M13 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-20 bg-black-pure p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white-pure/5 -translate-y-16 translate-x-16 rotate-45 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-6">
                        <span className="inline-block bg-primary-500 text-black-pure px-3 py-1 font-black text-xs">{proceedLabel}</span>
                        <p className="text-white-pure text-lg font-bold max-w-md leading-relaxed">{description}</p>
                    </div>
                    <button onClick={onClick} className={`${textBase} text-2xl text-primary-500 hover:text-white-pure flex items-center gap-4 group/btn transition-colors`}>
                        {label}
                        <div className="w-12 h-2 bg-secondary-500 group-hover/btn:w-20 transition-all" />
                    </button>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-0 border-4 border-black-pure group">
                <div className="p-10 bg-white-pure border-b-4 md:border-b-0 md:border-r-4 border-black-pure">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-secondary-500 rounded-full" />
                        <span className="text-xs font-black tracking-widest">{infoLabel}</span>
                    </div>
                    <p className="text-xl font-bold text-black-pure leading-tight">{description}</p>
                </div>
                <button onClick={onClick} className="bg-primary-500 p-10 flex flex-col justify-between hover:bg-black-pure transition-colors duration-500 text-left">
                    <span className="text-black-pure group-hover:text-white-pure text-xs font-black underline underline-offset-8">{path}</span>
                    <h2 className={`${textBase} text-2xl text-black-pure group-hover:text-primary-500 mt-12`}>{label}</h2>
                </button>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="mt-20 flex flex-col items-center group">
                <div className="w-1 h-20 bg-black-pure mb-4 group-hover:h-32 transition-all duration-700" />
                <div className="text-center mb-8">
                    <span className="text-xs font-black opacity-30 block mb-2">{path}</span>
                    <h2 className={`${textBase} text-2xl mb-4`}>{label}</h2>
                    <p className="text-sm font-bold max-w-sm mx-auto opacity-60">{description}</p>
                </div>
                <button onClick={onClick} className={`${textBase} text-base border-2 border-black-pure px-10 py-4 bg-white-pure hover:bg-black-pure hover:text-white-pure shadow-[8px_8px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all`}>
                    Confirm Action
                </button>
            </div>
        )
    }

    return (
        <div className="mt-20 border-8 border-black-pure p-2 group">
            <div className="border-2 border-black-pure p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <h2 className={`${textBase} text-2xl mb-4 underline decoration-primary-500 decoration-8 underline-offset-4`}>{label}</h2>
                    <p className="text-base font-bold opacity-60">{description}</p>
                </div>
                <button onClick={onClick} className="shrink-0 w-24 h-24 bg-black-pure rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                    <span className="text-white-pure text-2xl">→</span>
                </button>
            </div>
        </div>
    )
}

export default SectionCTA