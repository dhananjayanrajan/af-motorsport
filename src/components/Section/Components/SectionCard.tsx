"use client"
import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

interface SectionCardProps {
    title: string
    subtitle?: string
    image?: Media | string | null
    label?: string
    variant?: 1 | 2 | 3 | 4 | 5
    onClick?: () => void
    active?: boolean
}

const SectionCard: React.FC<SectionCardProps> = ({
    title,
    subtitle,
    image,
    label,
    variant = 1,
    onClick,
    active = false
}) => {
    const imageUrl = typeof image === 'string'
        ? image
        : (image && typeof image === 'object' && 'url' in image)
            ? (image as Media).url
            : ''

    const headingBase = "font-black uppercase tracking-tighter leading-none text-left transition-all duration-300"
    const monoBase = "font-mono font-black uppercase tracking-widest text-[10px] sm:text-xs"

    if (variant === 2) {
        return (
            <button
                onClick={onClick}
                className={`group relative w-full h-full border-b-2 border-r-2 border-black-pure overflow-hidden bg-white-pure transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98] ${active ? 'bg-primary-500' : 'hover:bg-black-pure'}`}
            >
                <div className="relative h-40 sm:h-48 w-full overflow-hidden border-b-2 border-black-pure">
                    {imageUrl && (
                        <>
                            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black-pure/20 group-hover:bg-black-pure/0 transition-colors duration-300" />
                        </>
                    )}
                    {!imageUrl && (
                        <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                            <div className="size-8 bg-black-pure rotate-45" />
                        </div>
                    )}
                    <div className="absolute top-3 right-3 size-6 bg-black-pure flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white-pure font-mono font-black text-[8px]">SEQ</span>
                    </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col items-start relative">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="size-1.5 bg-primary-500 group-hover:bg-white-pure transition-colors duration-300" />
                        <span className={`${monoBase} transition-colors duration-300 ${active ? 'text-black-pure' : 'text-secondary-500 group-hover:text-white-pure'}`}>
                            {label || 'CARD'}
                        </span>
                    </div>
                    <h4 className={`text-lg sm:text-xl md:text-2xl ${headingBase} ${active ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <span className="mt-2 sm:mt-3 font-mono text-[8px] sm:text-[10px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40 transition-colors">
                            {subtitle}
                        </span>
                    )}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-black-pure overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"
            >
                {imageUrl && (
                    <>
                        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/50 to-transparent" />
                    </>
                )}
                {!imageUrl && (
                    <div className="absolute inset-0 bg-primary-500 flex items-center justify-center">
                        <div className="size-12 bg-black-pure rotate-45" />
                    </div>
                )}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                    <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="size-2 bg-secondary-500 group-hover:bg-primary-500 transition-colors duration-300 animate-pulse" />
                            <span className={`${monoBase} text-white-pure/60 group-hover:text-white-pure`}>{label || 'FEATURED'}</span>
                        </div>
                        <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:text-primary-500 transition-colors duration-300`}>
                            {title}
                        </h4>
                        <div className="w-12 h-1 bg-secondary-500 mt-3 sm:mt-4 group-hover:w-24 transition-all duration-500" />
                    </div>
                </div>
                <div className="absolute top-3 right-3 size-8 bg-white-pure flex items-center justify-center transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                    <div className="size-2 bg-black-pure rotate-45" />
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-white-pure flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98] overflow-hidden"
            >
                <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <span className="text-4xl sm:text-5xl font-black text-black-pure/5 absolute top-2 right-2">{label?.slice(0, 3) || 'CRD'}</span>
                        <div className="flex items-center gap-2">
                            <div className="size-2 bg-primary-500 group-hover:bg-secondary-500 transition-colors duration-300" />
                            <span className={`${monoBase} text-black-pure/40 group-hover:text-black-pure`}>{label || 'MODULE'}</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-black-pure group-hover:text-primary-500 transition-colors duration-300`}>
                            {title}
                        </h4>
                        {subtitle && (
                            <p className="mt-2 text-[10px] font-mono font-black uppercase text-black-pure/40 group-hover:text-black-pure/60 transition-colors">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 h-1 bg-black-pure group-hover:bg-secondary-500 transition-colors duration-300" />
                        <div className="size-2 bg-black-pure rotate-45 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
                <div className="h-24 sm:h-32 w-full relative border-t-2 border-black-pure overflow-hidden">
                    {imageUrl && (
                        <>
                            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black-pure/20 group-hover:bg-black-pure/0 transition-colors duration-300" />
                        </>
                    )}
                    {!imageUrl && (
                        <div className="w-full h-full bg-secondary-500 flex items-center justify-center">
                            <div className="size-4 bg-black-pure rotate-45" />
                        </div>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure flex items-stretch bg-white-pure hover:bg-secondary-500 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 active:scale-[0.98] overflow-hidden"
            >
                <div className="w-3 sm:w-4 bg-primary-500 border-r-2 border-black-pure group-hover:bg-black-pure transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </div>
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center text-left relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="size-1.5 bg-primary-500 group-hover:bg-black-pure transition-colors duration-300" />
                        <span className={`${monoBase} text-black-pure/40 group-hover:text-black-pure`}>{label || 'ITEM'}</span>
                    </div>
                    <h4 className={`text-base sm:text-lg md:text-xl ${headingBase} text-black-pure group-hover:text-black-pure`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <p className={`${monoBase} text-black-pure/40 group-hover:text-black-pure/60 mt-1`}>{subtitle}</p>
                    )}
                </div>
                <div className="w-24 sm:w-32 relative border-l-2 border-black-pure overflow-hidden">
                    {imageUrl && (
                        <>
                            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black-pure/20 group-hover:bg-black-pure/0 transition-colors duration-300" />
                        </>
                    )}
                    {!imageUrl && (
                        <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                            <div className="size-3 bg-black-pure rotate-45" />
                        </div>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className="relative w-full h-full border-b-2 border-r-2 border-black-pure group overflow-hidden bg-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-300 lg:[&:nth-child(3n)]:border-r-0"
        >
            {imageUrl && (
                <>
                    <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black-pure/40 group-hover:bg-secondary-500/60 transition-colors duration-300" />
                </>
            )}
            {!imageUrl && (
                <div className="absolute inset-0 bg-black-pure flex items-center justify-center">
                    <div className="size-12 bg-primary-500 rotate-45 group-hover:scale-125 transition-transform duration-500" />
                </div>
            )}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-2 bg-white-pure border border-black-pure" />
                        <span className={`${monoBase} text-white-pure/80 group-hover:text-white-pure`}>{label || 'CARD'}</span>
                    </div>
                    <div className="size-6 bg-white-pure flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-black-pure font-mono font-black text-[8px]">→</span>
                    </div>
                </div>
                <div className="text-left">
                    <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:translate-x-2 transition-transform duration-300`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <p className="mt-2 text-[10px] font-mono font-black uppercase text-white-pure/60 group-hover:text-white-pure/80 transition-colors">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
    )
}

export default SectionCard