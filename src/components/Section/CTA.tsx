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
    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t-4 border-black-pure">
                <button
                    onClick={onClick}
                    className="flex items-stretch group outline-none h-32"
                >
                    <div className={`flex-1 ${buttonBgColor} ${buttonTextColor} flex items-center px-8 md:px-12 transition-colors duration-100 group-hover:bg-primary-500 group-hover:text-black-pure`}>
                        <span className="font-black text-xl md:text-2xl uppercase tracking-normal truncate">{label}</span>
                    </div>
                    <div className="w-32 bg-secondary-500 flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure border-l-4 border-black-pure transition-colors duration-100 shrink-0">
                        <div className="w-8 h-8 border-t-4 border-r-4 border-black-pure group-hover:border-white-pure rotate-45 -ml-2" />
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto p-8 border-t-4 border-black-pure bg-black-pure">
                <p className="text-primary-500 font-mono text-xs mb-6 tracking-normal uppercase font-black">{proceedLabel || 'LOCATION'} // {path}</p>
                <button
                    onClick={onClick}
                    className="w-full border-4 border-white-pure py-6 px-8 text-white-pure font-black font-mono tracking-normal uppercase hover:bg-white-pure hover:text-black-pure focus:bg-primary-500 focus:text-black-pure focus:border-black-pure transition-colors duration-100 text-base outline-none"
                >
                    {label}
                </button>
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col bg-white-pure border-t-4 border-black-pure">
            {description && (
                <div className="p-8 border-b-4 border-black-pure">
                    <p className="text-xs font-mono font-black uppercase tracking-normal text-secondary-500 mb-4">{infoLabel || 'DATA_POINT'}</p>
                    <p className="text-sm font-mono font-black uppercase tracking-normal leading-tight text-black-pure border-l-8 border-primary-500 pl-6">
                        {description}
                    </p>
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-8 h-12 bg-black-pure overflow-hidden">
                    <span className="text-xs font-mono font-black uppercase text-white-pure/40 tracking-normal whitespace-nowrap">{directoryLabel || 'PATH'}</span>
                    <span className="text-xs font-mono font-black uppercase text-primary-500 tracking-normal whitespace-nowrap ml-4">{path}</span>
                </div>
                <button
                    onClick={onClick}
                    className={`w-full h-24 ${buttonBgColor} ${buttonTextColor} font-mono text-base font-black uppercase tracking-normal hover:bg-primary-500 hover:text-black-pure focus:bg-secondary-500 focus:text-black-pure transition-colors duration-100 outline-none`}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}

export default SectionCTA