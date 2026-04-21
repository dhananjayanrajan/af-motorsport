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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black-pure/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-6xl bg-white-pure flex flex-col md:flex-row overflow-hidden border-4 border-black-pure shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 left-0 right-0 h-4 flex z-30">
                    <div className="flex-1 bg-primary-500 border-r-4 border-black-pure" />
                    <div className="flex-1 bg-secondary-500 border-r-4 border-black-pure" />
                    <div className="flex-1 bg-black-pure" />
                </div>

                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-primary-500 border-b-4 md:border-b-0 md:border-r-4 border-black-pure overflow-hidden">
                    <Image
                        src={imageUrl || `https://picsum.photos/seed/modal/1200/1200`}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-12 left-12 bg-black-pure text-white-pure px-6 py-3 text-sm font-mono font-black tracking-normal">
                        {idCode}
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-8 md:p-12 max-h-[80vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-16 h-16 flex items-center justify-center bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none z-40"
                    >
                        <span className="font-black text-sm uppercase">Close</span>
                    </button>

                    <div className="mt-8 mb-10">
                        <span className="text-xs font-mono font-black tracking-normal text-secondary-500 uppercase mb-4 block">{infoLabel || 'DATA_POINT'}</span>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-normal text-black-pure leading-none mb-8">
                            {title}
                        </h3>
                        <div className="p-6 bg-white-pure border-4 border-black-pure">
                            <p className="text-sm font-mono leading-tight uppercase tracking-normal font-black text-black-pure">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col border-b-4 border-black-pure pb-4">
                                <span className="text-[10px] font-mono font-black uppercase tracking-normal text-black-pure/40 mb-2">
                                    {stat.label}
                                </span>
                                <div className="flex items-center gap-4">
                                    <div className={`w-4 h-4 ${stat.color} border-2 border-black-pure`} />
                                    <p className="text-xl font-black uppercase tracking-normal text-black-pure">
                                        {stat.val}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onAction}
                        className="mt-auto w-full h-20 bg-black-pure text-white-pure font-mono text-base font-black uppercase tracking-normal hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none"
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionModal