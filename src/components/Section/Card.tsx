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

    const headingBase = "font-black uppercase tracking-normal leading-none text-left transition-colors duration-100"
    const monoBase = "font-mono font-black uppercase tracking-normal text-[10px]"

    if (variant === 2) {
        return (
            <button
                onClick={onClick}
                className={`group relative w-full h-full border-b-4 border-r-4 border-black-pure overflow-hidden bg-white-pure transition-colors duration-100 outline-none ${active ? 'bg-primary-500' : 'hover:bg-black-pure'}`}
            >
                <div className="relative h-48 w-full overflow-hidden border-b-4 border-black-pure">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
                </div>
                <div className="p-6 flex flex-col items-start">
                    <span className={`${monoBase} mb-2 ${active ? 'text-black-pure' : 'text-secondary-500'}`}>
                        {label || 'DATA_POINT'}
                    </span>
                    <h4 className={`text-xl md:text-2xl ${headingBase} ${active ? 'text-black-pure' : 'group-hover:text-white-pure text-black-pure'}`}>
                        {title}
                    </h4>
                    {subtitle && <span className="mt-3 font-mono text-[10px] font-black text-black-pure/40 uppercase">{subtitle}</span>}
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-4 border-r-4 border-black-pure bg-black-pure overflow-hidden outline-none"
            >
                {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-black-pure/40 group-hover:bg-primary-500/80 transition-colors duration-100">
                    <div className="relative z-10">
                        <h4 className={`text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:text-black-pure`}>{title}</h4>
                        <div className="w-12 h-2 bg-secondary-500 mt-4 group-hover:bg-black-pure transition-colors" />
                    </div>
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-4 border-r-4 border-black-pure bg-white-pure flex flex-col outline-none"
            >
                <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
                    <span className="text-4xl font-black text-black-pure/10 absolute top-4 right-4">{label?.slice(0, 3)}</span>
                    <h4 className={`text-2xl md:text-3xl ${headingBase} text-black-pure group-hover:text-primary-500`}>
                        {title}
                    </h4>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-2 bg-black-pure group-hover:bg-secondary-500 transition-colors" />
                        <span className={monoBase}>{subtitle || 'INDEX_REFERENCE'}</span>
                    </div>
                </div>
                <div className="h-32 w-full relative border-t-4 border-black-pure overflow-hidden">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-4 border-r-4 border-black-pure flex items-stretch bg-white-pure hover:bg-secondary-500 transition-colors duration-100 outline-none"
            >
                <div className="w-4 bg-primary-500 border-r-4 border-black-pure group-hover:bg-black-pure transition-colors" />
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <h4 className={`text-xl ${headingBase} text-black-pure`}>{title}</h4>
                    <p className={`${monoBase} text-black-pure/40 mt-2`}>{subtitle || 'SUB_HEADING'}</p>
                </div>
                <div className="w-32 relative border-l-4 border-black-pure overflow-hidden bg-primary-500">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
                </div>
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className="relative w-full h-full border-b-4 border-r-4 border-black-pure group overflow-hidden bg-primary-500 outline-none lg:[&:nth-child(3n)]:border-r-0"
        >
            {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
            <div className="absolute inset-0 bg-black-pure/40 group-hover:bg-secondary-500/60 transition-colors duration-100" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-3 bg-primary-500 border-2 border-black-pure" />
                    <span className={`${monoBase} text-white-pure`}>
                        {label || "SECTION_ID"}
                    </span>
                </div>
                <h4 className={`text-2xl md:text-3xl ${headingBase} text-white-pure group-hover:translate-x-4 transition-transform duration-100`}>
                    {title}
                </h4>
            </div>
        </button>
    )
}

export default SectionCard