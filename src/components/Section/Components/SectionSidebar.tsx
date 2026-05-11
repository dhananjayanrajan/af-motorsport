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
    infoLabel = "Details"
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const buttonBase = "font-bold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"

    const getImageSrc = () => {
        if (imageUrl && imageUrl.trim() !== '') return imageUrl
        return `https://picsum.photos/id/${Math.abs(idCode?.charCodeAt(0) || 1) % 100}/800/800`
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={onClose}
            />
            <aside
                className={`fixed top-0 right-0 z-[120] w-full md:w-[480px] h-full bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-black flex flex-col`}
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                }}
            >
                <div className="relative h-72 shrink-0 overflow-hidden bg-black group">
                    <Image
                        src={getImageSrc()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white border border-black flex items-center justify-center transition-all duration-300 hover:bg-primary-500 hover:-rotate-90 group/btn"
                    >
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="absolute bottom-6 left-6">
                        <div className="inline-flex items-center gap-2 bg-primary-500 border border-black px-3 py-1 mb-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-1.5 h-1.5 bg-black" />
                            <span className="text-xs font-black uppercase tracking-wider text-black">
                                {idCode || 'REF_00'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                            {title}
                        </h3>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-0.5 bg-primary-500" />
                            <span className="text-xs font-black tracking-widest uppercase text-secondary-500">
                                {infoLabel}
                            </span>
                        </div>
                        <div className="p-5 bg-gray-50 border-l-4 border-black italic font-medium text-gray-700 leading-relaxed">
                            "{description}"
                        </div>
                    </div>

                    <div className="space-y-1">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 transition-all duration-300 hover:bg-black group border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-1 h-6 ${stat.color} border border-black transition-transform duration-300 group-hover:scale-y-125 group-hover:border-white`} />
                                    <span className="text-sm font-bold uppercase tracking-wide text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
                                        {stat.label}
                                    </span>
                                </div>
                                <p className="text-xl font-black text-black transition-all duration-300 group-hover:text-white group-hover:translate-x-[-4px]">
                                    {stat.val}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-white border-t-2 border-black shrink-0">
                    <button
                        onClick={onAction}
                        className={`${buttonBase} w-full h-16 bg-black text-white hover:bg-primary-500 hover:text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`}
                    >
                        <span className="text-sm font-black uppercase tracking-[0.2em]">{buttonLabel}</span>
                    </button>
                </div>

                <div className="h-2 w-full flex shrink-0 border-t border-black">
                    <div className="flex-1 bg-primary-500" />
                    <div className="flex-1 bg-secondary-500" />
                    <div className="flex-1 bg-black" />
                </div>
            </aside>
        </>
    )
}

export default SectionSidebar