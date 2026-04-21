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
    infoLabel = ""
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
                className={`fixed inset-0 z-[110] bg-black-pure/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`fixed top-0 right-0 z-[120] w-full md:w-[480px] h-full bg-white-pure border-l-4 border-black-pure transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="relative h-64 md:h-72 shrink-0 bg-primary-500 border-b-4 border-black-pure">
                        <Image
                            src={imageUrl || `https://picsum.photos/seed/sidebar/800/800`}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-0 right-0 w-16 h-16 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 outline-none"
                        >
                            <span className="text-xl font-black uppercase">Close</span>
                        </button>
                        <div className="absolute bottom-0 left-0 bg-black-pure text-primary-500 px-6 py-3 text-sm font-mono font-black tracking-normal">
                            {idCode || 'ENTRY_01'}
                        </div>
                    </div>

                    <div className="p-8 md:p-10 flex-1 overflow-y-auto">
                        <span className="text-xs font-mono font-black tracking-normal text-secondary-500 uppercase mb-4 block">{infoLabel || 'DATA CATEGORY'}</span>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-normal text-black-pure leading-none mb-8">
                            {title}
                        </h3>

                        <div className="p-6 bg-white-pure border-4 border-black-pure mb-10">
                            <p className="text-sm font-mono leading-tight uppercase tracking-normal font-black text-black-pure">
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mb-10">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between border-b-4 border-black-pure pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 ${stat.color} border-2 border-black-pure`} />
                                        <span className="text-xs font-mono font-black uppercase tracking-normal text-black-pure/40">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-xl font-black uppercase tracking-normal text-black-pure">
                                        {stat.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white-pure border-t-4 border-black-pure">
                        <button
                            onClick={onAction}
                            className="w-full h-20 bg-black-pure text-white-pure font-mono text-base font-black uppercase tracking-normal hover:bg-primary-500 hover:text-black-pure focus:bg-secondary-500 focus:text-black-pure transition-colors duration-100 outline-none"
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