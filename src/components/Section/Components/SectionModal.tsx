"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

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
    infoLabel = "DETAILS"
}) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    if (!isOpen) return null

    const handleMainAction = async () => {
        if (isLoading || !onAction) return
        setIsLoading(true)
        try {
            await onAction()
        } finally {
            setIsLoading(false)
        }
    }

    const getImageSrc = () => {
        if (imageUrl && imageUrl.trim() !== '') return imageUrl
        return `https://picsum.photos/id/${Math.abs(idCode?.charCodeAt(0) || 1) % 100}/1200/800`
    }

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12">
            <div
                className="absolute inset-0 bg-black-pure cursor-pointer z-1"
                onClick={onClose}
            />

            <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white-pure flex flex-col md:flex-row overflow-hidden border-4 border-black-pure z-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-300">

                <div className="relative w-full md:w-1/2 h-48 md:h-auto bg-neutral-200 shrink-0 border-b-4 md:border-b-0 md:border-r-4 border-black-pure z-1 overflow-hidden group">
                    <Image
                        src={getImageSrc()}
                        alt={title}
                        fill
                        className="object-cover z-1"
                        priority
                    />
                    <div className="absolute top-6 left-6 bg-black-pure p-4 border-2 border-white-pure z-1">
                        <span className="text-white-pure font-black text-[10px] tracking-widest">{idCode || 'REF_001'}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-w-0 bg-white-pure z-1 relative">
                    <div className="flex items-stretch border-b-4 border-black-pure h-16 shrink-0 z-1">
                        <div className="flex-1 flex items-center px-8 bg-white-pure z-1">
                            <span className="text-[10px] font-black text-black-pure tracking-widest uppercase">
                                {infoLabel}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-16 h-full flex items-center justify-center bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-200 cursor-pointer z-1"
                        >
                            <span className="font-black text-xl">✕</span>
                        </button>
                    </div>

                    <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto bg-white-pure z-1">
                        <header className="mb-10 z-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-black-pure leading-none uppercase mb-6 tracking-tight">
                                {title}
                            </h3>
                            <div className="bg-neutral-100 p-6 border-l-8 border-black-pure z-1">
                                <p className="text-sm font-medium text-black-pure leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 z-1">
                            {stats.map((stat, i) => (
                                <div key={i} className="p-5 flex items-center border-2 border-black-pure bg-white-pure group z-1">
                                    <div className={`w-10 h-10 flex items-center justify-center border-2 border-black-pure ${stat.color} shrink-0 z-1`}>
                                        <div className="w-2 h-2 bg-black-pure" />
                                    </div>
                                    <div className="ml-4 flex flex-col z-1">
                                        <span className="text-[9px] font-black text-black-pure uppercase">{stat.label}</span>
                                        <span className="text-lg font-bold text-black-pure tracking-tighter">{stat.val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto z-1 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleMainAction}
                                disabled={isLoading}
                                className="relative flex-1 h-16 border-4 border-black-pure bg-white-pure group cursor-pointer disabled:cursor-wait overflow-hidden z-1"
                            >
                                <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-1" />
                                <div className="relative z-10 flex items-center justify-center">
                                    {isLoading ? (
                                        <div className="flex gap-1">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 bg-black-pure animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-sm font-black text-black-pure uppercase tracking-widest">
                                            {buttonLabel}
                                        </span>
                                    )}
                                </div>
                            </button>
                            <div className="hidden sm:flex w-16 h-16 bg-black-pure items-center justify-center z-1">
                                <div className="w-2 h-2 bg-white-pure animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="h-4 w-full flex shrink-0 border-t-4 border-black-pure z-1">
                        <div className="flex-1 bg-secondary-500 z-1" />
                        <div className="flex-1 bg-black-pure z-1" />
                        <div className="flex-1 bg-primary-500 z-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal;