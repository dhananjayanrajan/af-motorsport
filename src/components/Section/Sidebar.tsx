"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'

interface DetailStat {
    label: string
    val: string | number
    color: string
}

interface SectionSidebarProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    imageUrl: string
    idCode: string
    stats: DetailStat[]
    buttonLabel: string
    onAction?: () => void
}

const SectionSidebar: React.FC<SectionSidebarProps> = ({
    isOpen,
    onClose,
    title,
    description,
    imageUrl,
    idCode,
    stats,
    buttonLabel,
    onAction
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <>
            <div
                className={`fixed inset-0 z-[110] bg-white-950/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`fixed top-0 right-0 z-[120] w-full md:w-[500px] h-full bg-white-50 border-l-2 border-black-pure shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                    <div className="relative h-80 shrink-0 bg-white-200 border-b-2 border-black-pure overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-12 h-12 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary hover:text-black-pure transition-colors duration-300"
                        >
                            <span className="text-2xl font-light">✕</span>
                        </button>
                        <div className="absolute bottom-6 left-6 bg-black-pure text-primary px-4 py-2 text-xs font-mono font-black tracking-widest">
                            {idCode}
                        </div>
                    </div>

                    <div className="p-8 md:p-12 flex-1">
                        <span className="text-[10px] font-mono font-black tracking-[0.4em] text-tertiary-500 uppercase mb-4 block">INFORMATION</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-black-pure leading-none mb-8">
                            {title}
                        </h3>

                        <div className="p-6 bg-white-200 border-l-8 border-secondary mb-12">
                            <p className="text-sm font-mono leading-relaxed uppercase tracking-tight font-bold text-black-pure">
                                {description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between border-b-2 border-black-pure pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 ${stat.color}`} />
                                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure/50">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-lg font-black uppercase tracking-tight text-black-pure">
                                        {stat.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white-100 border-t-2 border-black-pure sticky bottom-0">
                        <button
                            onClick={onAction}
                            className="w-full h-20 bg-black-pure text-white-pure font-mono text-sm font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-black-pure focus:bg-secondary transition-all duration-300 active:scale-[0.98] outline-none"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SectionSidebar