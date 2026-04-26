// SectionModal.tsx
"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

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
    infoLabel = "CORE DATA"
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    if (!isOpen) return null

    const buttonBase = "font-bold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"

    const getImageSrc = () => {
        if (imageUrl && imageUrl.trim() !== '') return imageUrl
        return `https://picsum.photos/id/${Math.abs(idCode?.charCodeAt(0) || 1) % 100}/1200/800`
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-black-pure/90 transition-opacity duration-300"
                onClick={onClose}
            />
            <div className="relative w-full max-w-5xl h-full max-h-[700px] bg-white-pure flex flex-col md:flex-row overflow-hidden border border-black-pure animate-in zoom-in-95 duration-300">
                <div className="relative w-full md:w-5/12 h-48 md:h-full bg-black-pure border-b md:border-b-0 md:border-r border-black-pure overflow-hidden shrink-0 group">
                    <Image
                        src={getImageSrc()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-white-pure border border-black-pure px-6 py-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-secondary-500" />
                            <span className="text-base font-bold text-black-pure">
                                {idCode || 'REF_001'}
                            </span>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-primary-500 border border-black-pure flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="w-2 h-2 bg-black-pure" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-stretch border-b border-black-pure h-16 shrink-0">
                        <div className="flex-1 flex items-center px-8 bg-secondary-500">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-black-pure" />
                                <span className="text-base font-bold text-black-pure">
                                    {infoLabel}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-16 h-full flex items-center justify-center bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-300 outline-none border-l border-black-pure group"
                        >
                            <span className="font-bold text-base transition-transform duration-300 group-hover:rotate-90">X</span>
                        </button>
                    </div>
                    <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-0.5 bg-primary-500" />
                                <span className="text-base font-bold text-primary-500">DETAILS</span>
                            </div>
                            <h3 className="text-2xl font-bold text-black-pure mb-4">
                                {title}
                            </h3>
                            <div className="p-4 bg-neutral-50 border border-black-pure">
                                <p className="text-base font-bold text-black-pure/70">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-black-pure border border-black-pure mb-6 overflow-hidden">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white-pure p-4 flex flex-col gap-2 transition-all duration-300 hover:bg-black-pure group">
                                    <span className="text-base font-bold text-black-pure/40 transition-colors duration-300 group-hover:text-white-pure/40">
                                        {stat.label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 ${stat.color} border border-black-pure transition-colors duration-300 group-hover:border-white-pure`} />
                                        <p className="text-2xl font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">
                                            {stat.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto flex gap-px bg-black-pure border border-black-pure overflow-hidden shrink-0">
                            <button
                                onClick={onAction}
                                className={`${buttonBase} flex-1 h-16 bg-primary-500 text-black-pure hover:bg-black-pure hover:text-white-pure relative overflow-hidden group`}
                            >
                                <span className="relative z-10">{buttonLabel}</span>
                                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                            </button>
                            <div className="w-16 h-16 bg-black-pure flex items-center justify-center transition-all duration-300 group hover:bg-primary-500">
                                <div className="w-6 h-6 border-2 border-white-pure flex items-center justify-center transition-colors duration-300 group-hover:border-black-pure">
                                    <div className="w-1.5 h-1.5 bg-white-pure transition-all duration-300 group-hover:bg-black-pure" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 w-full flex shrink-0">
                        <div className="flex-1 bg-primary-500 transition-all duration-300 hover:flex-[2]" />
                        <div className="flex-1 bg-secondary-500 transition-all duration-300 hover:flex-[2]" />
                        <div className="flex-1 bg-black-pure transition-all duration-300 hover:flex-[2]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal