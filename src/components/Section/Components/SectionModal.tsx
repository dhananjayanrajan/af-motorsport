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

    if (!isOpen) return null

    const getImageSrc = () => {
        if (imageUrl && imageUrl.trim() !== '') return imageUrl
        return `https://picsum.photos/id/${Math.abs(idCode?.charCodeAt(0) || 1) % 100}/1200/800`
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 md:p-8 animate-in fade-in duration-500">
            <div
                className="absolute inset-0 bg-black-pure transition-opacity duration-500 cursor-pointer"
                onClick={onClose}
            />

            <div className="relative w-full max-w-6xl h-full max-h-full sm:max-h-[85vh] bg-white-pure flex flex-col md:flex-row overflow-hidden border-4 border-black-pure animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">

                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-black-pure overflow-hidden shrink-0 group border-b-4 md:border-b-0 md:border-r-4 border-black-pure">
                    <Image
                        src={getImageSrc()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-black-pure mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-500" />

                    <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-4 py-2 font-bold text-xs tracking-widest transform -rotate-90 translate-y-12 -translate-x-6 border-r-4 border-b-4 border-black-pure">
                        {idCode || 'REF_001'}
                    </div>

                    <div className="absolute bottom-6 right-6 flex gap-2">
                        <div className="w-12 h-12 bg-primary-500 border-4 border-black-pure transition-transform duration-300 group-hover:-translate-y-2" />
                        <div className="w-12 h-12 bg-secondary-500 border-4 border-black-pure transition-transform duration-300 delay-75 group-hover:-translate-y-4" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-w-0 bg-white-pure">
                    <div className="flex items-stretch border-b-4 border-black-pure h-20 shrink-0">
                        <div className="flex-1 flex items-center px-6 sm:px-10 bg-white-pure">
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 bg-black-pure" />
                                <span className="text-sm font-black text-black-pure tracking-tighter uppercase">
                                    {infoLabel}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-20 h-full flex items-center justify-center bg-black-pure text-white-pure hover:bg-secondary-500 hover:text-black-pure transition-colors duration-200 outline-none border-l-4 border-black-pure group"
                        >
                            <span className="font-black text-2xl transition-transform duration-300 group-hover:rotate-180 group-active:scale-75">✕</span>
                        </button>
                    </div>

                    <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col overflow-y-auto">
                        <header className="mb-10">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-xs font-black bg-primary-500 text-black-pure px-2 py-1 border-2 border-black-pure">Details</span>
                                <div className="h-1 flex-1 bg-black-pure" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-black-pure leading-none uppercase mb-6 tracking-tighter">
                                {title}
                            </h3>
                            <div className="border-l-8 border-black-pure pl-6">
                                <p className="text-sm sm:text-base font-bold text-black-pure leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-4 border-black-pure mb-10">
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-6 flex flex-col gap-4 transition-all duration-200 hover:bg-primary-500 border-black-pure group even:sm:border-l-4 odd:sm:border-r-0 border-b-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 bg-white-pure"
                                >
                                    <span className="text-xs font-black text-black-pure uppercase tracking-widest group-hover:text-black-pure">
                                        {stat.label}
                                    </span>
                                    <div className="flex items-baseline gap-2">
                                        <div className={`w-3 h-3 ${stat.color} border-2 border-black-pure`} />
                                        <p className="text-xl sm:text-2xl font-black text-black-pure tracking-tighter">
                                            {stat.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {onAction && buttonLabel && (
                                    <button
                                        onClick={onAction}
                                        className="relative flex-1 h-20 bg-black-pure text-white-pure font-black text-lg sm:text-xl uppercase tracking-tighter border-4 border-black-pure transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none group overflow-hidden"
                                    >
                                        <span className="relative z-10">{buttonLabel}</span>
                                        <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                )}
                                <div className="w-full sm:w-20 h-20 bg-white-pure border-4 border-black-pure flex items-center justify-center group hover:bg-black-pure transition-colors duration-200">
                                    <div className="w-8 h-8 border-4 border-black-pure group-hover:border-white-pure transition-all duration-300 group-hover:rotate-45" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-6 w-full flex shrink-0 border-t-4 border-black-pure">
                        <div className="flex-1 bg-primary-500 border-r-4 border-black-pure hover:bg-white-pure transition-colors duration-100" />
                        <div className="flex-1 bg-secondary-500 border-r-4 border-black-pure hover:bg-white-pure transition-colors duration-100" />
                        <div className="flex-1 bg-black-pure hover:bg-white-pure transition-colors duration-100" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal