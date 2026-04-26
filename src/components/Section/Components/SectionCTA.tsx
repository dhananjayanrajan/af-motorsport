// SectionCTA.tsx
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
    const buttonBase = "font-bold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"

    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t border-black-pure">
                <button
                    onClick={onClick}
                    className="flex items-stretch group outline-none h-20 border border-black-pure transition-all duration-300 hover:border-primary-500 relative overflow-hidden"
                >
                    <div className={`flex-1 ${buttonBgColor} ${buttonTextColor} flex items-center px-8 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-black-pure relative z-10`}>
                        <span className="font-bold text-2xl truncate">{label}</span>
                    </div>
                    <div className="w-24 bg-secondary-500 flex items-center justify-center transition-all duration-300 group-hover:bg-black-pure group-hover:text-white-pure border-l border-black-pure shrink-0 relative z-10">
                        <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto border border-black-pure bg-white-pure group overflow-hidden">
                {proceedLabel && (
                    <div className="p-4 border-b border-black-pure bg-black-pure flex items-center justify-between">
                        <p className="text-primary-500 text-base font-bold">{proceedLabel}</p>
                        <p className="text-white-pure text-base font-bold">{path}</p>
                    </div>
                )}
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full py-5 px-8 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure text-base relative overflow-hidden`}
                >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </button>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="mt-auto flex flex-col gap-4">
                {description && (
                    <div className="p-6 border border-black-pure bg-white-pure">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-primary-500 border border-black-pure flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-black-pure" />
                            </div>
                            <p className="text-base font-bold text-primary-500">{infoLabel || 'INFO'}</p>
                        </div>
                        <p className="text-base font-bold text-black-pure/60 border-l-4 border-primary-500 pl-4">
                            {description}
                        </p>
                    </div>
                )}
                <div className="flex items-stretch border border-black-pure bg-white-pure">
                    <div className="flex-1 flex items-center px-4 h-12 bg-neutral-50">
                        <span className="text-base font-bold text-black-pure/40">{directoryLabel || 'PATH'}</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 bg-white-pure">
                        <div className="w-2 h-2 bg-primary-500" />
                        <span className="text-base font-bold text-primary-500">{path}</span>
                    </div>
                    <button
                        onClick={onClick}
                        className={`${buttonBase} px-8 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure text-base`}
                    >
                        {label}
                    </button>
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="mt-auto flex items-stretch border border-black-pure bg-white-pure overflow-hidden group">
                <div className="w-2 bg-primary-500 transition-all duration-300 group-hover:w-4" />
                <div className="flex-1 p-6">
                    <p className="text-base font-bold text-black-pure/60 mb-2">{description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-primary-500">{path}</span>
                        <button
                            onClick={onClick}
                            className={`${buttonBase} px-6 py-2 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure text-base`}
                        >
                            {label}
                        </button>
                    </div>
                </div>
                <div className="w-8 bg-secondary-500 transition-all duration-300 group-hover:w-12" />
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col border border-black-pure bg-white-pure group overflow-hidden">
            {description && (
                <div className="p-6 border-b border-black-pure transition-all duration-300 group-hover:bg-black-pure relative">
                    {infoLabel && (
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-primary-500 border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:bg-white-pure">
                                <div className="w-1.5 h-1.5 bg-black-pure transition-all duration-300 group-hover:bg-primary-500" />
                            </div>
                            <p className="text-base font-bold text-primary-500 transition-colors duration-300 group-hover:text-secondary-500">{infoLabel}</p>
                        </div>
                    )}
                    <p className="text-base font-bold text-black-pure/70 transition-colors duration-300 group-hover:text-white-pure/70 border-l-4 border-primary-500 pl-4">
                        {description}
                    </p>
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 h-12 bg-neutral-50 border-b border-black-pure">
                    <span className="text-base font-bold text-black-pure/40">{directoryLabel || 'PATH'}</span>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                        <span className="text-base font-bold text-primary-500">{path}</span>
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className={`${buttonBase} w-full h-20 ${buttonBgColor} ${buttonTextColor} hover:bg-primary-500 hover:text-black-pure relative overflow-hidden`}
                >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </button>
            </div>
        </div>
    )
}

export default SectionCTA