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

    const headingBase = "font-black uppercase tracking-tight leading-none text-left transition-all duration-300"
    const monoBase = "font-mono font-black uppercase tracking-wide text-[10px] sm:text-xs"

    if (variant === 2) {
        return (
            <button
                onClick={onClick}
                className={`group relative w-full h-full border-b-2 border-r-2 border-black-pure overflow-hidden bg-white-pure transition-all duration-300 outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] ${active ? 'bg-primary-500' : 'hover:bg-black-pure'}`}
            >
                <div className="relative h-40 sm:h-48 w-full overflow-hidden border-b-2 border-black-pure">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                </div>
                <div className="p-4 sm:p-6 flex flex-col items-start">
                    <span className={`${monoBase} mb-2 transition-colors duration-300 ${active ? 'text-black-pure' : 'text-secondary-500 group-hover:text-white-pure'}`}>
                        {label}
                    </span>
                    <h4 className={`text-lg sm:text-xl md:text-2xl ${headingBase} ${active ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                        {title}
                    </h4>
                    {subtitle && <span className="mt-2 sm:mt-3 font-mono text-[8px] sm:text-[10px] font-black text-black-pure/40 uppercase">{subtitle}</span>}
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-black-pure overflow-hidden outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98]"
            >
                {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end bg-black-pure/40 group-hover:bg-primary-500/80 transition-colors duration-300">
                    <div className="relative z-10">
                        <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:text-black-pure`}>{title}</h4>
                        <div className="w-10 h-1.5 sm:w-12 sm:h-2 bg-secondary-500 mt-3 sm:mt-4 group-hover:bg-black-pure transition-colors duration-300" />
                    </div>
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-white-pure flex flex-col outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98]"
            >
                <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between relative z-10">
                    <span className="text-3xl sm:text-4xl font-black text-black-pure/10 absolute top-3 right-3 sm:top-4 sm:right-4">{label?.slice(0, 3)}</span>
                    <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-black-pure group-hover:text-primary-500`}>
                        {title}
                    </h4>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-8 h-1.5 sm:w-10 sm:h-2 bg-black-pure group-hover:bg-secondary-500 transition-colors duration-300" />
                        <span className={monoBase}>{subtitle}</span>
                    </div>
                </div>
                <div className="h-24 sm:h-32 w-full relative border-t-2 border-black-pure overflow-hidden">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure flex items-stretch bg-white-pure hover:bg-secondary-500 transition-all duration-300 outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:scale-[0.98]"
            >
                <div className="w-3 sm:w-4 bg-primary-500 border-r-2 border-black-pure group-hover:bg-black-pure transition-colors duration-300" />
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                    <h4 className={`text-base sm:text-lg md:text-xl ${headingBase} text-black-pure`}>{title}</h4>
                    <p className={`${monoBase} text-black-pure/40 mt-1 sm:mt-2`}>{subtitle}</p>
                </div>
                <div className="w-24 sm:w-32 relative border-l-2 border-black-pure overflow-hidden bg-primary-500">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                </div>
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className="relative w-full h-full border-b-2 border-r-2 border-black-pure group overflow-hidden bg-primary-500 outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] transition-all duration-300 lg:[&:nth-child(3n)]:border-r-0"
        >
            {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
            <div className="absolute inset-0 bg-black-pure/40 group-hover:bg-secondary-500/60 transition-colors duration-300" />
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-2 sm:w-12 sm:h-3 bg-primary-500 border-2 border-black-pure" />
                    <span className={`${monoBase} text-white-pure`}>{label}</span>
                </div>
                <h4 className={`text-xl sm:text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:translate-x-3 sm:group-hover:translate-x-4 transition-transform duration-300`}>
                    {title}
                </h4>
            </div>
        </button>
    )
}

export default SectionCard
