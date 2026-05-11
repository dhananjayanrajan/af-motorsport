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
    const textBase = "font-black uppercase tracking-tight transition-all duration-300"
    const containerBase = "group w-full z-1 relative cursor-default overflow-hidden transition-all duration-300"

    if (variant === 2) {
        return (
            <header className={`${containerBase} py-6 bg-zinc-50 border-b-2 border-black-pure flex flex-col items-center`}>
                <div className="absolute top-0 left-0 h-full w-1 bg-primary-500 transition-all duration-500 group-hover:w-full group-hover:opacity-10 opacity-0" />
                <span className="text-[9px] font-black text-secondary-500 tracking-[0.2em] mb-1 group-hover:translate-y-[-2px]">{metadata || "INDEX"}</span>
                <h2 className={`${textBase} text-xl md:text-2xl text-black-pure mb-1 group-hover:tracking-widest`}>
                    {title}
                </h2>
                <div className="flex items-center gap-2 overflow-hidden">
                    <p className="text-black-pure/40 font-bold text-[10px] tracking-widest">{subtitle}</p>
                    <div className="h-[1px] w-4 bg-black-pure/20 group-hover:w-12 transition-all duration-500" />
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className={`${containerBase} py-5 bg-black-pure flex flex-col items-center border-y border-white-pure/20`}>
                <div className="mb-2 bg-primary-500 text-black-pure px-2 py-0.5 text-[8px] font-black rotate-[-2deg] group-hover:rotate-0 transition-transform">
                    {metadata || "LIVE_DATA"}
                </div>
                <h2 className={`${textBase} text-2xl md:text-3xl text-white-pure mb-2 group-hover:italic`}>
                    {title}
                </h2>
                <p className="text-primary-500 font-bold text-[10px] tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100">{subtitle}</p>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className={`${containerBase} py-6 bg-secondary-500 border-2 border-black-pure flex flex-col items-center shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5`}>
                <h2 className={`${textBase} text-xl md:text-2xl text-black-pure mb-1 px-4`}>
                    {title}
                </h2>
                <div className="w-8 h-0.5 bg-black-pure mb-2 group-hover:w-24 transition-all duration-500" />
                <p className="text-black-pure font-bold text-[9px] tracking-[0.1em] mb-3 opacity-60 group-hover:opacity-100">{subtitle}</p>
                <span className="text-[8px] font-black bg-white-pure border border-black-pure px-2 py-0.5 group-hover:invert transition-all">
                    {metadata || "REF_001"}
                </span>
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className={`${containerBase} py-6 bg-neutral-900 border-l-[8px] border-primary-500 flex flex-col items-center hover:bg-neutral-800`}>
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:animate-pulse" />
                    <span className="text-white-pure font-black text-[10px] tracking-tighter opacity-50">{subtitle}</span>
                </div>
                <h2 className={`${textBase} text-2xl md:text-3xl text-white-pure mb-3 group-hover:translate-x-1`}>
                    {title}
                </h2>
                {metadata && (
                    <span className="text-[9px] text-primary-500 font-bold border-t border-primary-500/30 pt-1 group-hover:px-4 transition-all">
                        {metadata}
                    </span>
                )}
            </header>
        )
    }

    return (
        <header className={`${containerBase} py-8 bg-primary-500 border-2 border-black-pure flex flex-col items-center`}>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,transparent_20%,#000_20%,#000_80%,transparent_80%,transparent)] bg-[length:4px_4px] opacity-5 group-hover:opacity-10 transition-opacity" />
            <h2 className={`${textBase} text-2xl md:text-4xl text-black-pure mb-1 z-10 group-hover:scale-95`}>
                {title}
            </h2>
            <p className="text-black-pure font-black text-[10px] tracking-[0.4em] mb-3 z-10 opacity-70">{subtitle}</p>
            <div className="flex gap-1 z-10">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-black-pure transition-all duration-300 group-hover:scale-150" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
            </div>
            {metadata && <span className="absolute bottom-1 right-2 text-[8px] font-black opacity-20 uppercase">{metadata}</span>}
        </header>
    )
}

export default SectionHeader