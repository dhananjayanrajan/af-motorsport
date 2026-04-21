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
    infoLabel?: string
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
    onAction,
    infoLabel = "SYSTEM_LOG"
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
                className={`fixed inset-0 z-[110] bg-black-pure/80 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`fixed top-0 right-0 z-[120] w-full md:w-[440px] h-full bg-white-pure transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    <div className="relative h-72 shrink-0 overflow-hidden bg-black-pure">
                        <Image
                            src={imageUrl || `https://picsum.photos/seed/sidebar/800/800`}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-0 right-0 w-14 h-14 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none"
                        >
                            <span className="text-xs font-black uppercase">X</span>
                        </button>
                        <div className="absolute bottom-0 left-0 bg-primary-500 text-black-pure px-5 py-2 text-[10px] font-mono font-black">
                            {idCode || 'REF_000'}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
                        <div className="mb-8">
                            <span className="text-[10px] font-mono font-black text-secondary-500 uppercase mb-2 block">
                                {infoLabel}
                            </span>
                            <h3 className="text-3xl font-black uppercase leading-none text-black-pure">
                                {title}
                            </h3>
                        </div>

                        <div className="mb-12">
                            <p className="text-sm font-mono leading-relaxed uppercase font-black text-black-pure/50">
                                {description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-black-pure/10 pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-6 ${stat.color}`} />
                                        <span className="text-[10px] font-mono font-black uppercase text-black-pure/40">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-xl font-black uppercase text-black-pure">
                                        {stat.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white-pure border-t border-black-pure shrink-0">
                        <button
                            onClick={onAction}
                            className="w-full h-16 bg-black-pure text-white-pure font-mono text-xs font-black uppercase hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none"
                        >
                            {buttonLabel}
                        </button>
                    </div>

                    <div className="h-1 w-full flex shrink-0">
                        <div className="flex-1 bg-primary-500" />
                        <div className="flex-1 bg-secondary-500" />
                        <div className="flex-1 bg-black-pure" />
                    </div>
                </div>
            </aside>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #000;
                }
            `}</style>
        </>
    )
}

export default SectionSidebar