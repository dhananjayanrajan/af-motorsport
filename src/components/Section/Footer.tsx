"use client"

import { Championship } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SectionFooterProps {
    variant?: 1 | 2 | 3 | 4 | 5
    championships?: Championship[]
    exploreLabel?: string
    sanctionedLabel?: string
    directoryTitle?: string
    filterStatusLabel?: string
    filterValueLabel?: string
    dataStreamLabel?: string
    navigateLabel?: string
    entryPointsLabel?: string
    totalSeriesLabel?: string
    quickLinkLabel?: string
    activeYearLabel?: string
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    championships = [],
    exploreLabel = "",
    sanctionedLabel = "",
    directoryTitle = "",
    filterStatusLabel = "",
    filterValueLabel = "",
    dataStreamLabel = "",
    navigateLabel = "",
    entryPointsLabel = "",
    totalSeriesLabel = "",
    quickLinkLabel = "",
    activeYearLabel = ""
}) => {
    const router = useRouter()
    const quickLinks = championships.slice(0, 3)
    const totalCount = championships.length

    if (variant === 2) {
        return (
            <footer className="h-auto min-h-24 flex flex-wrap items-stretch bg-white-50 border-t-4 border-black-pure overflow-x-auto">
                <div className="w-24 bg-primary flex items-center justify-center border-r-4 border-black-pure">
                    <span className="font-black text-2xl text-black-pure leading-none">
                        {totalCount.toString().padStart(2, '0')}
                    </span>
                </div>
                <div className="flex-1 flex flex-wrap items-center px-4 sm:px-8 justify-between py-2 gap-y-2">
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-black-pure leading-none tracking-tighter uppercase">{exploreLabel}</span>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {quickLinks.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => router.push(`/competition/series/${c.slug}`)}
                                    className="font-mono text-[9px] font-black text-black-pure/60 hover:text-primary transition-colors uppercase tracking-widest"
                                >
                                    [{c.basics?.identifiers?.abbreviation || ''}]
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex gap-1 h-full py-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-1 bg-black-pure/10" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="h-auto min-h-24 grid grid-cols-12 bg-black-pure overflow-x-auto">
                <div className="col-span-4 lg:col-span-3 bg-secondary p-4 flex flex-col justify-between border-r-2 border-white/10">
                    <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-widest">{totalSeriesLabel}</span>
                    <span className="font-black text-black-pure italic tracking-widest text-2xl leading-none">Count: {totalCount}</span>
                </div>
                <div className="col-span-8 lg:col-span-6 flex items-center px-4 sm:px-8 overflow-x-auto">
                    <div className="flex items-center gap-6 whitespace-nowrap">
                        <span className="text-white-pure/40 font-mono text-[10px] font-black uppercase tracking-[0.3em]">{quickLinkLabel}</span>
                        {quickLinks.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => router.push(`/competition/series/${c.slug}`)}
                                className="text-white-pure font-black text-sm uppercase hover:text-secondary transition-colors"
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:col-span-3 lg:flex bg-tertiary-500 p-6 items-center justify-center">
                    <div className="text-right">
                        <p className="font-black text-black-pure text-xs uppercase leading-tight">{directoryTitle}</p>
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="h-auto min-h-24 flex flex-wrap items-center bg-white-200 px-4 sm:px-10 relative border-t-2 border-black-pure py-2 overflow-x-auto">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
                <div className="flex flex-wrap items-center gap-4 sm:gap-8 w-full">
                    <div className="flex flex-col shrink-0">
                        <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">{filterStatusLabel}</span>
                        <span className="font-black text-black-pure text-lg leading-none uppercase tracking-tighter">{filterValueLabel}</span>
                    </div>
                    <div className="h-10 w-px bg-black-pure/20 hidden sm:block" />
                    <div className="flex-1 flex gap-2">
                        {championships.slice(0, 5).map((c) => (
                            <div key={c.id} className="w-2 h-8 bg-black-pure/10 hover:bg-primary cursor-pointer transition-colors" title={c.name} />
                        ))}
                    </div>
                    <div className="ml-auto text-right">
                        <span className="font-mono text-[9px] font-black uppercase block mb-1">{dataStreamLabel}</span>
                        <div className="w-32 h-1 bg-black-pure/10">
                            <div className="h-full bg-primary" style={{ width: `${Math.min((totalCount / 20) * 100, 100)}%` }} />
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="h-auto min-h-24 bg-black-pure flex flex-wrap items-stretch border-t-2 border-secondary overflow-x-auto">
                <div className="flex-1 flex flex-wrap items-center px-4 sm:px-12 gap-4 sm:gap-8 py-2">
                    <div className="flex flex-col">
                        <h3 className="text-white-pure font-black text-2xl sm:text-3xl tracking-tighter uppercase italic leading-none">{navigateLabel}</h3>
                        <span className="text-secondary font-mono text-[9px] font-black uppercase tracking-widest mt-1">{entryPointsLabel}</span>
                    </div>
                    <div className="hidden md:flex gap-3">
                        {quickLinks.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => router.push(`/competition/series/${c.slug}`)}
                                className="px-4 py-2 border border-white/20 text-white-pure font-mono text-[10px] uppercase font-black hover:bg-white-pure hover:text-black-pure transition-all"
                            >
                                {c.basics?.identifiers?.abbreviation || ''}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-24 bg-white-pure flex flex-col p-1 gap-1">
                    <div className="flex-1 bg-primary" />
                    <div className="flex-1 bg-secondary" />
                    <div className="flex-1 bg-tertiary-500" />
                </div>
            </footer>
        )
    }

    return (
        <footer className="px-4 sm:px-8 h-auto min-h-24 flex flex-wrap gap-4 sm:gap-8 bg-black-pure items-center border-t border-white/10 py-2 overflow-x-auto">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-primary flex items-center justify-center">
                    <span className="text-primary font-black text-xl">{totalCount}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white-pure font-black uppercase leading-none text-lg tracking-tighter">{sanctionedLabel}</span>
                    <span className="text-white-pure/40 font-mono text-[9px] font-black uppercase tracking-widest mt-1">{totalSeriesLabel}</span>
                </div>
            </div>
            <div className="flex-1 h-px bg-white/10 hidden sm:block" />
            <div className="flex gap-4">
                <span className="text-white-pure/40 font-mono text-[9px] font-black uppercase tracking-widest">{activeYearLabel} // {new Date().getFullYear()}</span>
            </div>
        </footer>
    )
}

export default SectionFooter