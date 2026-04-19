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
            ? image.url
            : ''

    if (variant === 2) {
        return (
            <button
                onClick={onClick}
                className={`group relative w-full h-full border-b-2 border-r-2 border-black-pure overflow-hidden bg-white-pure transition-colors duration-300 ${active ? 'bg-primary' : 'hover:bg-black-pure'}`}
            >
                <div className="absolute top-0 left-0 w-full h-1/2 relative overflow-hidden">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />}
                </div>
                <div className="p-6 flex flex-col items-start">
                    <span className={`font-mono text-[9px] font-black uppercase tracking-widest mb-2 ${active ? 'text-black-pure' : 'text-primary'}`}>
                        {label || ''}
                    </span>
                    <h4 className={`text-xl font-black uppercase tracking-tighter text-left leading-none ${active ? 'text-black-pure' : 'group-hover:text-white-pure text-black-pure'}`}>
                        {title}
                    </h4>
                    {subtitle && <span className="mt-2 text-xs font-mono opacity-50 text-left">{subtitle}</span>}
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-black-pure overflow-hidden"
            >
                {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black-pure via-transparent to-transparent">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-2xl font-black text-white-pure uppercase italic">{title}</h4>
                        <div className="w-0 group-hover:w-full h-1 bg-primary transition-all duration-500 mt-2" />
                    </div>
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure bg-white-200 flex flex-col"
            >
                <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
                    <span className="text-6xl font-black text-black-pure/5 absolute top-4 right-4">{label?.slice(0, 2)}</span>
                    <h4 className="text-3xl font-black uppercase tracking-tighter text-black-pure text-left leading-none group-hover:text-primary transition-colors">
                        {title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                    </h4>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-black-pure group-hover:w-12 transition-all" />
                        <span className="font-mono text-[10px] font-black uppercase">{subtitle}</span>
                    </div>
                </div>
                <div className="h-24 w-full relative grayscale group-hover:grayscale-0 transition-all border-t-2 border-black-pure">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={onClick}
                className="group relative w-full h-full border-b-2 border-r-2 border-black-pure flex items-stretch bg-white-50 hover:bg-white-pure transition-colors"
            >
                <div className="w-2 bg-secondary group-hover:bg-primary transition-colors" />
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <h4 className="text-xl font-black uppercase tracking-widest text-black-pure text-left">{title}</h4>
                    <p className="text-[10px] font-mono uppercase opacity-40 text-left mt-1">{subtitle}</p>
                </div>
                <div className="w-32 relative border-l border-black-pure/10">
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover grayscale group-hover:grayscale-0" />}
                </div>
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className="relative w-full h-full border-b-2 border-r-2 border-black-pure group overflow-hidden bg-white-100 outline-none lg:[&:nth-child(3n)]:border-r-0"
        >
            {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black-pure/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-2 bg-primary" />
                    <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-[0.2em]">
                        {label || ""}
                    </span>
                </div>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-white-pure text-left group-hover:translate-x-2 transition-all duration-300">
                    {title}
                </h4>
            </div>
        </button>
    )
}

export default SectionCard