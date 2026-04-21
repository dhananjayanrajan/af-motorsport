// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/sections/Slug/SlugOverview.tsx

'use client'

import Image from 'next/image'
import React from 'react'

interface SlugOverviewProps {
    title: string
    description?: string | null
    identifier?: string | null
    alias?: string | null
    status?: string | null
    scope?: string
    revision?: string
    recordDate?: string
    coverImage?: string
    regulationsLink?: string
    stats?: Array<{ label: string; value: string | number }>
    onRegulationsClick?: () => void
}

const SlugOverview: React.FC<SlugOverviewProps> = ({
    title,
    description,
    identifier,
    alias,
    status,
    scope = "Global",
    revision = "Current",
    recordDate,
    coverImage,
    regulationsLink,
    stats,
    onRegulationsClick
}) => {
    const defaultStats = [
        { label: 'STATUS', value: status || 'Active' },
        { label: 'IDENTITY', value: identifier || 'C1' },
        { label: 'SCOPE', value: scope },
        { label: 'REVISION', value: revision }
    ]

    const displayStats = stats || defaultStats

    return (
        <section id="slug-manifest-overview" className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex-1 flex flex-col lg:flex-row">

                <div className="lg:w-1/2 flex flex-col border-r border-black-pure divide-y divide-black-pure">
                    <div className="flex-1 p-6 md:p-10 lg:p-20 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-primary-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 opacity-10" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                                <div className="size-2 md:size-3 bg-tertiary-500" />
                                <span className="font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-black-pure">
                                    {title.toUpperCase()} Identity
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-race font-black text-black-pure uppercase italic leading-[0.85] tracking-tighter mb-6 md:mb-10">
                                The Core <br /> Protocol
                            </h2>
                            <p className="text-[11px] md:text-sm font-bold uppercase leading-snug text-black-pure max-w-lg p-4 md:p-6 border-l-4 md:border-l-8 border-secondary-500 bg-white-200">
                                {description || 'Providing the regulatory baseline for global competition and technical advancement.'}
                            </p>
                        </div>
                    </div>

                    <div className="h-48 md:h-64 grid grid-cols-2 divide-x divide-black-pure">
                        <div className="p-5 md:p-10 bg-tertiary-500 flex flex-col justify-between hover:bg-black-pure transition-colors group cursor-default">
                            <span className="font-mono text-[7px] md:text-[9px] font-black text-white-pure/60 uppercase">Scope</span>
                            <span className="font-race font-black text-2xl md:text-4xl italic text-white-pure">{scope}</span>
                        </div>
                        <div className="p-5 md:p-10 bg-secondary-500 flex flex-col justify-between hover:bg-primary-500 transition-colors group cursor-default">
                            <span className="font-mono text-[7px] md:text-[9px] font-black text-black-pure/60 uppercase">Revision</span>
                            <span className="font-race font-black text-2xl md:text-4xl italic text-black-pure">{revision}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex-1 relative min-h-[300px] md:min-h-0 border-b border-black-pure group overflow-hidden">
                        <Image
                            src={coverImage || `https://picsum.photos/seed/overview/1200/1000`}
                            alt=""
                            fill
                            className="object-cover group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-4 md:top-10 right-4 md:right-10 flex flex-col gap-1 md:gap-2">
                            <div className="bg-black-pure text-white-pure px-2 md:px-4 py-0.5 md:py-1 font-mono text-[8px] md:text-[10px] font-black uppercase italic">
                                File Ref {identifier || '00'}
                            </div>
                            <div className="h-0.5 md:h-1 w-full bg-primary-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-black-pure bg-black-pure">
                        <div className="p-6 md:p-10 bg-white-pure flex flex-col gap-3 md:gap-6 hover:bg-secondary-500 transition-colors group">
                            <span className="font-mono text-[7px] md:text-[9px] font-black text-black-pure/40 group-hover:text-black-pure uppercase tracking-widest transition-colors">Record Date</span>
                            <span className="font-race font-black text-2xl md:text-4xl italic text-black-pure uppercase">
                                {recordDate || '2026'}
                            </span>
                        </div>

                        {regulationsLink ? (
                            <a
                                href={regulationsLink}
                                className="p-6 md:p-10 bg-primary-500 flex flex-col gap-3 md:gap-6 hover:bg-black-pure transition-colors group outline-none focus:bg-tertiary-500"
                            >
                                <span className="font-mono text-[7px] md:text-[9px] font-black text-black-pure group-hover:text-primary-500 uppercase tracking-widest transition-colors">Technical Vault</span>
                                <div className="flex items-center justify-between">
                                    <span className="font-race font-black text-2xl md:text-4xl italic text-black-pure group-hover:text-white-pure uppercase transition-colors">Rules</span>
                                    <div className="size-8 md:size-12 bg-black-pure flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="md:w-6 md:h-6 text-white-pure group-hover:text-black-pure transition-all group-hover:translate-x-1 md:group-hover:translate-x-2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <button
                                onClick={onRegulationsClick}
                                className="p-6 md:p-10 bg-primary-500 flex flex-col gap-3 md:gap-6 hover:bg-black-pure transition-colors group outline-none focus:bg-tertiary-500 text-left"
                            >
                                <span className="font-mono text-[7px] md:text-[9px] font-black text-black-pure group-hover:text-primary-500 uppercase tracking-widest transition-colors">Technical Vault</span>
                                <div className="flex items-center justify-between">
                                    <span className="font-race font-black text-2xl md:text-4xl italic text-black-pure group-hover:text-white-pure uppercase transition-colors">Rules</span>
                                    <div className="size-8 md:size-12 bg-black-pure flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="md:w-6 md:h-6 text-white-pure group-hover:text-black-pure transition-all group-hover:translate-x-1 md:group-hover:translate-x-2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-16 md:h-24 bg-white-pure border-t border-black-pure flex items-center px-5 md:px-10 justify-between">
                <div className="flex gap-6 md:gap-12">
                    <div className="flex flex-col">
                        <span className="font-mono text-[6px] md:text-[8px] font-black text-black-pure/40 uppercase">Identifier</span>
                        <span className="font-race font-black text-[10px] md:text-base text-black-pure uppercase italic">{alias || 'Primary'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-[6px] md:text-[8px] font-black text-black-pure/40 uppercase">Status</span>
                        <span className="font-race font-black text-[10px] md:text-base text-black-pure uppercase italic">{status || 'Verified'}</span>
                    </div>
                </div>
                <div className="flex gap-0.5 md:gap-1">
                    <div className="size-2 md:size-4 bg-primary-500" />
                    <div className="size-2 md:size-4 bg-secondary-500" />
                    <div className="size-2 md:size-4 bg-tertiary-500" />
                </div>
            </div>

            {displayStats && displayStats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 bg-black-pure gap-px border-t border-black-pure">
                    {displayStats.map((stat, idx) => (
                        <div key={idx} className="bg-white-pure p-4 flex flex-col justify-between hover:bg-primary-500 transition-colors group">
                            <span className="text-[8px] font-mono font-black text-black-pure/40 uppercase tracking-widest group-hover:text-black-pure">
                                {stat.label}
                            </span>
                            <span className="text-lg md:text-xl font-race font-black text-black-pure uppercase italic group-hover:text-white-pure transition-colors">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default SlugOverview