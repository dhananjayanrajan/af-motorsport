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
                className={`fixed inset-0 z-[110] bg-black-pure transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={onClose}
            />
            <aside
                className={`fixed top-0 right-0 z-[120] w-full md:w-[480px] h-full bg-white-pure transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-black-pure flex flex-col`}
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                }}
            >
                <div className="relative h-72 shrink-0 overflow-hidden bg-black-pure group">
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
                        className="absolute top-4 right-4 w-12 h-12 bg-white-pure border border-black-pure flex items-center justify-center transition-all duration-300 hover:bg-primary-500 hover:border-black-pure outline-none group/btn"
                    >
                        <svg className="w-5 h-5 text-black-pure transition-transform duration-300 group-hover/btn:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="absolute bottom-4 left-4 bg-primary-500 border border-black-pure px-5 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
                            <span className="text-base font-bold text-black-pure">
                                {idCode || 'REF_00'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 bg-white-pure">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-0.5 bg-primary-500" />
                            <span className="text-base font-bold text-secondary-500">
                                {infoLabel}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-black-pure">
                            {title}
                        </h3>
                    </div>
                    <div className="mb-8 p-4 bg-white-pure border border-black-pure">
                        <p className="text-base font-bold text-black-pure">
                            {description}
                        </p>
                    </div>
                    <div className="space-y-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-black-pure pb-4 transition-all duration-300 hover:bg-black-pure hover:pl-3 px-2 group bg-white-pure">
                                <div className="flex items-center gap-4">
                                    <div className={`w-1.5 h-6 ${stat.color} border border-black-pure transition-colors duration-300 group-hover:border-white-pure`} />
                                    <span className="text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">
                                        {stat.label}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">
                                    {stat.val}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-8 bg-white-pure border-t border-black-pure shrink-0">
                    <button
                        onClick={onAction}
                        className={`${buttonBase} w-full h-16 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure relative overflow-hidden group`}
                    >
                        <span className="relative z-10">{buttonLabel}</span>
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                    </button>
                </div>
                <div className="h-1 w-full flex shrink-0">
                    <div className="flex-1 bg-primary-500 transition-all duration-300 hover:flex-[2]" />
                    <div className="flex-1 bg-secondary-500 transition-all duration-300 hover:flex-[2]" />
                    <div className="flex-1 bg-black-pure transition-all duration-300 hover:flex-[2]" />
                </div>
            </aside>
        </>
    )
}

export default SectionSidebar