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
    infoLabel = "CORE_DATA"
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-black-pure/80" onClick={onClose} />

            <div className="relative w-full max-w-6xl h-full max-h-[700px] bg-white-pure flex flex-col md:flex-row overflow-hidden border border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                <div className="relative w-full md:w-5/12 h-48 md:h-full bg-primary-500 border-b md:border-b-0 md:border-r border-black-pure overflow-hidden shrink-0">
                    <Image
                        src={imageUrl || `https://picsum.photos/seed/modal/1200/1200`}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute bottom-0 left-0 bg-black-pure text-white-pure px-6 py-3 font-mono text-xs font-black uppercase">
                        {idCode} // ORIGIN_STAMP
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-stretch border-b border-black-pure h-16 shrink-0">
                        <div className="flex-1 flex items-center px-8 bg-secondary-500">
                            <span className="font-mono text-[10px] font-black uppercase text-black-pure">
                                {infoLabel}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-16 h-full flex items-center justify-center bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none border-l border-black-pure"
                        >
                            <span className="font-black text-xs uppercase">X</span>
                        </button>
                    </div>

                    <div className="flex-1 p-8 md:p-12 flex flex-col overflow-hidden">
                        <div className="mb-6">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-normal text-black-pure leading-none mb-4">
                                {title}
                            </h3>
                            <div className="p-4 bg-white-pure border border-black-pure">
                                <p className="text-xs font-mono leading-tight uppercase font-black text-black-pure/60 line-clamp-3">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-black-pure border border-black-pure mb-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white-pure p-4 flex flex-col gap-1">
                                    <span className="text-[9px] font-mono font-black uppercase text-black-pure/40">
                                        {stat.label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 ${stat.color} border border-black-pure`} />
                                        <p className="text-base font-black uppercase text-black-pure">
                                            {stat.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto flex gap-px bg-black-pure border border-black-pure shrink-0">
                            <button
                                onClick={onAction}
                                className="flex-1 h-16 bg-primary-500 text-black-pure font-mono text-xs font-black uppercase hover:bg-black-pure hover:text-white-pure transition-colors duration-100 outline-none"
                            >
                                {buttonLabel}
                            </button>
                            <div className="w-16 h-16 bg-white-pure flex items-center justify-center">
                                <div className="w-6 h-6 border border-black-pure flex items-center justify-center">
                                    <div className="w-2 h-2 bg-black-pure animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-2 w-full flex shrink-0">
                        <div className="flex-1 bg-primary-500" />
                        <div className="flex-1 bg-secondary-500" />
                        <div className="flex-1 bg-black-pure" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal