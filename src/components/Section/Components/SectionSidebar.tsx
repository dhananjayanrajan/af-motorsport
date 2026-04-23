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
    infoLabel = "SYSTEM LOG"
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const buttonBase = "font-mono font-black uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"

    const getImageSrc = () => {
        if (imageUrl && imageUrl.trim() !== '') return imageUrl
        return `https://picsum.photos/id/${Math.abs(idCode?.charCodeAt(0) || 1) % 100}/800/800`
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-[110] bg-black-pure/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <aside className={`fixed top-0 right-0 z-[120] w-full md:w-[440px] h-full bg-white-pure transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl border-l-2 border-black-pure`}>
                <div className="flex flex-col h-full">
                    <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden bg-black-pure group">
                        <Image
                            src={getImageSrc()}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/40 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white-pure border-2 border-black-pure flex items-center justify-center hover:bg-primary-500 hover:border-black-pure transition-all duration-300 outline-none group/btn"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black-pure group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="absolute bottom-4 left-4 bg-primary-500 border-2 border-black-pure px-4 sm:px-5 py-1.5 sm:py-2">
                            <div className="flex items-center gap-2">
                                <div className="size-1.5 bg-black-pure animate-pulse" />
                                <span className="text-[10px] font-mono font-black uppercase text-black-pure tracking-widest">
                                    {idCode || 'REF_00'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                        <div className="mb-6 sm:mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-0.5 bg-primary-500" />
                                <span className="text-[10px] font-mono font-black text-secondary-500 uppercase tracking-widest">
                                    {infoLabel}
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black-pure leading-tight">
                                {title}
                            </h3>
                        </div>
                        <div className="mb-8 sm:mb-12 p-4 bg-white-100 border-2 border-black-pure">
                            <p className="text-xs font-mono font-black uppercase leading-relaxed text-black-pure/70">
                                {description}
                            </p>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between border-b-2 border-black-pure pb-3 sm:pb-4 group hover:bg-black-pure hover:pl-3 transition-all duration-300 px-2">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`w-1.5 h-4 sm:w-2 sm:h-6 ${stat.color} border border-black-pure group-hover:border-white-pure`} />
                                        <span className="text-[10px] font-mono font-black uppercase text-black-pure/40 group-hover:text-white-pure tracking-widest">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-base sm:text-lg font-black uppercase text-black-pure group-hover:text-white-pure tracking-tighter">
                                        {stat.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-white-pure border-t-2 border-black-pure shrink-0">
                        <button
                            onClick={onAction}
                            className={`${buttonBase} w-full h-14 sm:h-16 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure relative overflow-hidden group`}
                        >
                            <span className="relative z-10">{buttonLabel}</span>
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </button>
                    </div>
                    <div className="h-1 w-full flex shrink-0">
                        <div className="flex-1 bg-primary-500" />
                        <div className="flex-1 bg-secondary-500" />
                        <div className="flex-1 bg-black-pure" />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SectionSidebar