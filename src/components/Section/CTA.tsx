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
}

const SectionCTA: React.FC<SectionCTAProps> = ({
    label,
    path,
    description,
    onClick,
    buttonBgColor = "bg-black-pure",
    buttonTextColor = "text-white-pure",
    variant = 1
}) => {
    if (variant === 2) {
        return (
            <div className="mt-auto flex flex-col w-full border-t-2 border-black-pure">
                <button
                    onClick={onClick}
                    className="flex items-center group outline-none"
                >
                    <div className={`flex-1 h-32 ${buttonBgColor} ${buttonTextColor} flex items-center px-12 transition-colors duration-300 group-hover:bg-primary group-hover:text-black-pure`}>
                        <span className="font-mono text-2xl font-black uppercase tracking-[0.2em]">{label}</span>
                    </div>
                    <div className="w-32 h-32 bg-secondary flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                        <span className="text-4xl">→</span>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-auto p-8 border-t-2 border-black-pure bg-black-pure">
                <p className="text-white-pure/40 font-mono text-[10px] mb-4 tracking-widest uppercase">PROCEED TO: {path}</p>
                <button
                    onClick={onClick}
                    className="w-full border-2 border-white-pure py-6 px-4 text-white-pure font-black font-mono tracking-[0.5em] uppercase hover:bg-white-pure hover:text-black-pure transition-all"
                >
                    {label}
                </button>
            </div>
        )
    }

    return (
        <div className="mt-auto flex flex-col bg-white-50 border-t-2 border-black-pure">
            {description && (
                <div className="p-8 border-b-2 border-black-pure">
                    <p className="text-xs font-mono font-black uppercase tracking-widest text-tertiary-500 mb-4">INFORMATION</p>
                    <p className="text-sm font-mono font-bold uppercase tracking-tight leading-relaxed text-black-pure border-l-4 border-primary pl-4">
                        {description}
                    </p>
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-8 h-12 bg-white-200 border-b-2 border-black-pure">
                    <span className="text-[10px] font-mono font-black uppercase text-black-pure/40 tracking-widest">DIRECTORY</span>
                    <span className="text-[10px] font-mono font-black uppercase text-tertiary-500 tracking-widest">{path}</span>
                </div>
                <button
                    onClick={onClick}
                    className={`w-full h-24 ${buttonBgColor} ${buttonTextColor} font-mono text-sm font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-black-pure transition-all duration-300 active:scale-[0.98] outline-none group relative`}
                >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
            </div>
        </div>
    )
}

export default SectionCTA