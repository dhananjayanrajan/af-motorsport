"use client"

import { Championship } from '@/payload-types'
import React from 'react'

interface SectionHeaderProps {
    title: string
    subtitle: string
    variant?: 1 | 2 | 3 | 4 | 5
    championships?: Championship[]
    categoryLabel?: string
    directoryLabel?: string
    totalEntriesLabel?: string
    officialLabel?: string
    seasonLabel?: string
    entryNoLabel?: string
    featuredLabel?: string
    registryLabel?: string
    activeLabel?: string
    seriesDiscoveredLabel?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    variant = 1,
    championships = [],
    categoryLabel = "",
    directoryLabel = "",
    totalEntriesLabel = "",
    officialLabel = "",
    seasonLabel = "",
    entryNoLabel = "",
    featuredLabel = "",
    registryLabel = "",
    activeLabel = "",
    seriesDiscoveredLabel = ""
}) => {
    const year = new Date().getFullYear()
    const totalItems = championships.length
    const featuredAbbr = championships.length > 0 ? championships[0].basics?.identifiers?.abbreviation : ''

    if (variant === 2) {
        return (
            <header className="w-full h-auto min-h-24 shrink-0 bg-black-pure relative z-30 flex flex-wrap items-center px-4 sm:px-6 md:px-8 py-2 border-b-2 border-primary overflow-x-auto">
                <div className="flex flex-col mr-4">
                    <span className="text-primary font-mono text-[10px] font-black tracking-[0.5em] uppercase">{totalItems} {totalEntriesLabel}</span>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white-pure">{title}</h1>
                </div>
                <div className="mx-8 h-12 w-px bg-white-pure/20 rotate-12 hidden sm:block" />
                <div className="flex flex-col">
                    <span className="text-secondary font-mono text-[10px] font-black tracking-[0.5em] uppercase">{officialLabel}</span>
                    <h2 className="text-xl font-black uppercase text-white-pure/60">{subtitle}</h2>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-6">
                    <div className="flex flex-col text-right">
                        <span className="text-white-pure font-mono text-[10px] font-black opacity-40 uppercase">{seasonLabel}</span>
                        <span className="text-primary font-black text-sm uppercase">{categoryLabel}</span>
                    </div>
                    <div className="w-16 h-16 border-2 border-tertiary-500 flex items-center justify-center font-mono text-sm font-black text-white-pure">
                        {year.toString().slice(-2)}
                    </div>
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full h-auto min-h-24 shrink-0 bg-white-50 relative z-30 flex flex-col justify-between border-b-2 border-black-pure">
                <div className="flex-1 flex flex-wrap items-center px-4 sm:px-8 justify-between py-2 gap-y-2">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-primary mr-4" />
                        <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-black-pure">
                            {title} <span className="text-black-pure/20">/</span> {subtitle}
                        </h1>
                    </div>
                    <div className="font-mono text-[10px] font-black space-x-6 hidden sm:block">
                        <span className="text-black-pure/40">{entryNoLabel} {totalItems}</span>
                        <span className="text-black-pure">{featuredLabel} {featuredAbbr}</span>
                    </div>
                </div>
                <div className="h-4 w-full flex">
                    <div className="flex-1 bg-secondary border-r border-black-pure" />
                    <div className="flex-[2_2_0%] bg-tertiary-500 border-r border-black-pure" />
                    <div className="flex-1 bg-black-pure" />
                </div>
            </header>
        )
    }

    if (variant === 4) {
        return (
            <header className="w-full h-auto min-h-24 shrink-0 bg-tertiary-500 relative z-30 flex items-stretch border-b-2 border-black-pure overflow-x-auto">
                <div className="w-24 bg-black-pure flex flex-col items-center justify-center">
                    <span className="text-white-pure font-black text-2xl rotate-90">{year}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center px-6 sm:px-12">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-black-pure" />
                        <span className="font-mono text-[9px] font-black uppercase text-black-pure/60">{directoryLabel}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black-pure italic leading-none">{title}</h1>
                </div>
                <div className="hidden lg:flex items-center px-12 border-l-2 border-black-pure bg-white-100">
                    <span className="text-6xl font-black text-black-pure/10 absolute right-4 bottom-0 pointer-events-none">{totalItems}</span>
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-black-pure relative z-10">{subtitle}</span>
                </div>
            </header>
        )
    }

    if (variant === 5) {
        return (
            <header className="w-full h-auto min-h-24 shrink-0 bg-white-100 relative z-30 grid grid-cols-12 border-b-2 border-black-pure">
                <div className="col-span-12 lg:col-span-8 flex items-center px-4 sm:px-10 border-r-0 lg:border-r-2 border-black-pure py-2">
                    <div className="w-2 h-12 bg-secondary mr-6" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-black-pure leading-none">{title}</h1>
                        <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase mt-2 tracking-widest">{totalItems} {seriesDiscoveredLabel}</span>
                    </div>
                </div>
                <div className="hidden lg:col-span-4 bg-primary lg:flex items-center justify-between px-10">
                    <span className="font-mono text-sm font-black text-black-pure uppercase tracking-tighter italic">{subtitle}</span>
                    <div className="w-10 h-10 border-2 border-black-pure flex items-center justify-center font-black">
                        {featuredAbbr?.slice(0, 1)}
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="w-full h-auto min-h-24 shrink-0 bg-secondary-50 relative z-30 flex flex-wrap items-center overflow-x-auto">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 flex">
                <div className="flex-1 bg-primary" />
                <div className="flex-1 bg-secondary" />
                <div className="flex-1 bg-tertiary-500" />
                <div className="flex-1 bg-black-pure" />
            </div>
            <div className="w-24 flex items-center justify-center shrink-0 border-r border-black-pure/10">
                <span className="text-xl font-black text-primary italic">#{totalItems}</span>
            </div>
            <div className="flex-1 flex items-center px-4 sm:px-8">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-foreground">
                    {title}<span className="text-primary mx-3">●</span>{subtitle}
                </h1>
            </div>
            <div className="hidden md:flex items-center px-6 font-mono text-xs tracking-widest text-foreground shrink-0 font-black gap-4">
                <div className="text-right">
                    <span className="block text-secondary opacity-50">{registryLabel}</span>
                    <span>{featuredAbbr}</span>
                </div>
                <div className="w-px h-8 bg-black-pure/10" />
                <div className="text-right">
                    <span className="block text-primary opacity-50">{activeLabel}</span>
                    <span>{year}</span>
                </div>
            </div>
        </header>
    )
}

export default SectionHeader