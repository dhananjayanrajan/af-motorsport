"use client"

import Image from 'next/image'
import React from 'react'

interface DetailStat {
    label: string
    val: string | number
    color: string
}

interface SectionModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    imageUrl: string
    idCode: string
    stats: DetailStat[]
    buttonLabel: string
    onAction?: () => void
    infoLabel?: string
}

const SectionModal: React.FC<SectionModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    imageUrl,
    idCode,
    stats,
    buttonLabel,
    onAction,
    infoLabel = ""
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-white-950/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-7xl h-full md:h-[85vh] bg-white-50 flex flex-col md:flex-row overflow-hidden border-2 border-black-pure shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 left-0 right-0 h-2 flex z-30 border-b-2 border-black-pure">
                    <div className="flex-1 bg-primary" />
                    <div className="flex-1 bg-secondary" />
                    <div className="flex-1 bg-tertiary-500" />
                </div>

                <div className="relative w-full md:w-1/2 h-64 md:h-full bg-white-200 border-b-2 md:border-b-0 md:border-r-2 border-black-pure shrink-0 overflow-hidden">
                    <Image
                        src={imageUrl || `https://picsum.photos/seed/racing/1200/1200`}
                        alt={title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                    <div className="absolute top-8 left-8 bg-black-pure text-primary px-4 py-2 text-xs font-mono font-black tracking-widest">
                        {idCode}
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-black-pure hover:bg-primary transition-colors duration-300 group z-40"
                    >
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 w-full h-1 bg-white group-hover:bg-black-pure rotate-45 top-2.5" />
                            <div className="absolute inset-0 w-full h-1 bg-white group-hover:bg-black-pure -rotate-45 top-2.5" />
                        </div>
                    </button>

                    <div className="mb-12">
                        <span className="text-xs font-mono font-black tracking-[0.4em] text-tertiary-500 uppercase mb-4 block">{infoLabel}</span>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black-pure leading-[0.85] mb-8">
                            {title}
                        </h3>
                        <p className="text-sm md:text-base font-mono leading-relaxed uppercase tracking-tight font-bold text-black-pure p-6 bg-white-200 border-l-8 border-secondary">
                            {description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col border-b-2 border-black-pure pb-4">
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure/50 mb-2">
                                    {stat.label}
                                </span>
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 ${stat.color} shrink-0`} />
                                    <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-black-pure">
                                        {stat.val}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onAction}
                        className="mt-auto w-full h-24 min-h-[6rem] bg-black-pure text-white-pure font-mono text-sm font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-black-pure focus:bg-secondary transition-all duration-300 active:scale-[0.98] outline-none"
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionModal