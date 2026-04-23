"use client"
import React from 'react'

interface SectionCTAProps {
    label: string
    path: string
    description?: string
    onClick?: () => void
    buttonBgColor?: string
    buttonTextColor?: string
    variant?: 1 | 2 | 3
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
    const buttonBase = "font-mono font-black uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"

    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t-2 border-black-pure">
                <button
                    onClick={onClick}
                    className="flex items-stretch group outline-none h-16 md:h-20 lg:h-24 border-2 border-black-pure hover:border-primary-500 transition-all duration-300 relative overflow-hidden"
                >
                    <div className={`flex-1 ${buttonBgColor} ${buttonTextColor} flex items-center px-6 md:px-8 lg:px-12 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-black-pure relative z-10`}>
                        <span className="font-black text-lg md:text-xl lg:text-2xl uppercase tracking-tighter truncate">{label}</span>
                    </div>
                    <div className="w-20 md:w-24 lg:w-32 bg-secondary-500 flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure border-l-2 border-black-pure transition-all duration-300 shrink-0 relative z-10">
                        <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto border-2 border-black-pure bg-white-pure group overflow-hidden">
                {proceedLabel && (
                    <div className="p-4 border-b-2 border-black-pure bg-black-pure flex items-center justify-between">
                        <p className="text-primary-500 font-mono text-[10px] tracking-widest uppercase font-black">{proceedLabel}</p>
                        <p className="text-white-pure font-mono text-[10px] tracking-widest uppercase font-black">{path}</p>
                    </div>
                )}
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full py-4 md:py-5 px-6 md:px-8 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure text-xs md:text-sm relative overflow-hidden`}
                >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col border-2 border-black-pure bg-white-pure group overflow-hidden">
            {description && (
                <div className="p-6 md:p-8 border-b-2 border-black-pure group-hover:bg-black-pure transition-colors duration-300 relative">
                    {infoLabel && (
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <div className="w-6 h-6 bg-primary-500 border border-black-pure flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-black-pure rotate-45" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary-500">{infoLabel}</p>
                        </div>
                    )}
                    <p className="text-xs font-mono font-black uppercase leading-relaxed text-black-pure group-hover:text-white-pure border-l-4 border-primary-500 pl-4 md:pl-6">
                        {description}
                    </p>
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-10 md:h-12 bg-white-100 border-b-2 border-black-pure">
                    <span className="text-[10px] font-black uppercase text-black-pure/40 tracking-widest">{directoryLabel || 'PATH'}</span>
                    <div className="flex items-center gap-3">
                        <div className="size-2 bg-primary-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-primary-500 tracking-widest">{path}</span>
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full h-16 md:h-20 lg:h-24 ${buttonBgColor} ${buttonTextColor} hover:bg-primary-500 hover:text-black-pure relative overflow-hidden`}
                >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
            </div>
        </div>
    )
}

export default SectionCTA