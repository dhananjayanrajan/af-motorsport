// SectionCard.tsx
"use client"
import Image from 'next/image'
import React from 'react'

interface SectionCardProps {
    title: string
    subtitle?: string
    image?: string | null
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
    const imageUrl = image && image.trim() !== '' ? image : `https://picsum.photos/seed/${title.replace(/\s/g, '')}/800/600`

    const headingBase = "font-black leading-none text-left transition-all duration-300"
    const monoBase = "font-bold text-base"

    if (variant === 2) {
        return (
            <button
                onClick={onClick}
                className={`group relative w-full h-full border-b border-r border-black-pure overflow-hidden bg-white-pure transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98] ${active ? 'bg-primary-500' : 'hover:bg-black-pure'}`}
            >
                <div className="relative h-48 w-full overflow-hidden border-b border-black-pure">
                    <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black-pure/20 transition-colors duration-300 group-hover:bg-black-pure/0" />
                    <div className="absolute top-3 right-3 w-6 h-6 bg-black-pure flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-white-pure font-bold text-base">SEQ</span>
                    </div>
                </div>
                <div className="p-6 flex flex-col items-start relative">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 transition-colors duration-300 group-hover:bg-white-pure" />
                        <span className={`${monoBase} transition-colors duration-300 ${active ? 'text-black-pure' : 'text-secondary-500 group-hover:text-white-pure'}`}>
                            {label || 'CARD'}
                        </span>
                    </div>
                    <h4 className={`text-2xl ${headingBase} ${active ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <span className="mt-3 text-base font-bold text-black-pure/40 uppercase transition-colors duration-300 group-hover:text-white-pure/40">
                            {subtitle}
                        </span>
                    )}
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b border-r border-black-pure bg-black-pure overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98]"
            >
                <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/50 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="relative z-10 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-secondary-500 transition-colors duration-300 group-hover:bg-primary-500" />
                            <span className={`${monoBase} text-white-pure/60 group-hover:text-white-pure`}>{label || 'FEATURED'}</span>
                        </div>
                        <h4 className={`text-2xl ${headingBase} text-white-pure transition-colors duration-300 group-hover:text-primary-500`}>
                            {title}
                        </h4>
                        <div className="w-12 h-0.5 bg-secondary-500 mt-4 transition-all duration-500 group-hover:w-24" />
                    </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white-pure flex items-center justify-center transition-transform duration-500 translate-x-full group-hover:translate-x-0">
                    <div className="w-2 h-2 bg-black-pure" />
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b border-r border-black-pure bg-white-pure flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[0.98] overflow-hidden"
            >
                <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <span className="text-2xl font-bold text-black-pure/5 absolute top-2 right-2">{label?.slice(0, 3) || 'CRD'}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-500 transition-colors duration-300 group-hover:bg-secondary-500" />
                            <span className={`${monoBase} text-black-pure/40 group-hover:text-black-pure`}>{label || 'MODULE'}</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className={`text-2xl ${headingBase} text-black-pure transition-colors duration-300 group-hover:text-primary-500`}>
                            {title}
                        </h4>
                        {subtitle && (
                            <p className="mt-2 text-base font-bold text-black-pure/40 transition-colors duration-300 group-hover:text-black-pure/60">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 h-0.5 bg-black-pure transition-colors duration-300 group-hover:bg-secondary-500" />
                        <div className="w-2 h-2 bg-black-pure transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
                <div className="h-32 w-full relative border-t border-black-pure overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black-pure/20 transition-colors duration-300 group-hover:bg-black-pure/0" />
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b border-r border-black-pure flex items-stretch bg-white-pure transition-all duration-300 hover:bg-secondary-500 outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 active:scale-[0.98] overflow-hidden"
            >
                <div className="w-4 bg-primary-500 border-r border-black-pure transition-colors duration-300 group-hover:bg-black-pure relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary-500 transition-transform duration-500 -translate-y-full group-hover:translate-y-0" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center text-left relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-primary-500 transition-colors duration-300 group-hover:bg-black-pure" />
                        <span className={`${monoBase} text-black-pure/40 group-hover:text-black-pure`}>{label || 'ITEM'}</span>
                    </div>
                    <h4 className={`text-2xl ${headingBase} text-black-pure`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <p className={`${monoBase} text-black-pure/40 group-hover:text-black-pure/60 mt-1`}>{subtitle}</p>
                    )}
                </div>
                <div className="w-32 relative border-l border-black-pure overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black-pure/20 transition-colors duration-300 group-hover:bg-black-pure/0" />
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className="relative w-full h-full border-b border-r border-black-pure group overflow-hidden bg-primary-500 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-300"
        >
            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black-pure/40 transition-colors duration-300 group-hover:bg-secondary-500/60" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-0.5 bg-white-pure border border-black-pure" />
                        <span className={`${monoBase} text-white-pure/80 group-hover:text-white-pure`}>{label || 'CARD'}</span>
                    </div>
                    <div className="w-6 h-6 bg-white-pure flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-black-pure font-bold text-base">→</span>
                    </div>
                </div>
                <div className="text-left">
                    <h4 className={`text-2xl ${headingBase} text-white-pure transition-transform duration-300 group-hover:translate-x-2`}>
                        {title}
                    </h4>
                    {subtitle && (
                        <p className="mt-2 text-base font-bold text-white-pure/60 transition-colors duration-300 group-hover:text-white-pure/80">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary-500 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
        </button>
    )
}

export default SectionCard