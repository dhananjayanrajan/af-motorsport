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
        heading: "font-black tracking-tight uppercase leading-[0.9] text-xl sm:text-2xl md:text-3xl break-words",
        subheading: "font-bold text-[10px] uppercase tracking-[0.2em] text-primary-600",
    }

    if (variant === 2) {
        return (
            <header className="w-full flex flex-col items-center bg-slate-100 p-8 border-l-[12px] border-primary-500">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-8 bg-primary-500" />
                    <span className={baseStyles.subheading}>{subtitle}</span>
                    <div className="h-[2px] w-8 bg-primary-500" />
                </div>
                <h2 className={`${baseStyles.heading} text-slate-900 text-center`}>{title}</h2>
                {metadata && (
                    <div className="mt-6 bg-slate-900 text-white px-4 py-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{metadata}</span>
                    </div>
                )}
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full flex flex-col bg-slate-950 border-b-4 border-secondary-500 overflow-hidden">
                <div className="bg-secondary-500 px-6 py-2 flex justify-between items-center gap-4">
                    <span className="font-bold text-[10px] uppercase text-slate-900">{subtitle}</span>
                    {metadata && (
                        <span className="bg-slate-900 text-secondary-500 text-[9px] px-2 py-0.5 font-black uppercase">
                            {metadata}
                        </span>
                    )}
                </div>
                <div className="p-8">
                    <h2 className={`${baseStyles.heading} text-white`}>{title}</h2>
                    <div className="mt-4 h-2 w-24 bg-secondary-500" />
                </div>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className="flex flex-col items-center bg-white p-10 border-2 border-slate-200 text-center">
                <div className="w-16 h-1 bg-primary-500 mb-6" />
                {metadata && (
                    <span className="mb-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                        {metadata}
                    </span>
                )}
                <h2 className={`${baseStyles.heading} text-slate-900 mb-4`}>{title}</h2>
                <div className="px-4 py-1 border border-slate-900">
                    <span className="text-[9px] font-bold uppercase text-slate-900">{subtitle}</span>
                </div>
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className="w-full py-10 px-6 flex flex-col items-center text-center bg-slate-50 border-y-2 border-slate-900">
                <p className={`${baseStyles.subheading} mb-3 text-primary-700`}>{subtitle}</p>
                <h2 className={`${baseStyles.heading} text-slate-900 mb-6`}>{title}</h2>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-primary-500" />
                    <div className="h-3 w-3 bg-slate-900" />
                    <div className="h-3 w-3 bg-primary-500" />
                </div>
            </header>
        )
    }

    return (
        <header className="w-full p-8 bg-white flex flex-col items-center text-center border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="bg-secondary-500 border-2 border-slate-900 px-3 py-1 mb-6">
                <span className="font-bold text-[11px] uppercase text-slate-900">
                    {subtitle}
                </span>
            </div>
            <h2 className={`${baseStyles.heading} text-slate-900`}>{title}</h2>
            {metadata && (
                <div className="mt-8 flex items-center gap-4 w-full max-w-xs">
                    <div className="h-1 flex-1 bg-slate-900" />
                    <span className="text-[10px] font-black uppercase text-slate-900 whitespace-nowrap">
                        {metadata}
                    </span>
                    <div className="h-1 flex-1 bg-slate-900" />
                </div>
            )}
        </header>
    )
}

export default SectionHeader