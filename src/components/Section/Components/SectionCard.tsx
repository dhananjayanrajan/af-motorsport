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
    const textBase = "font-black uppercase tracking-tighter"

    if (variant === 2) {
        return (
            <button onClick={onClick} className="w-full group bg-white-pure border-2 border-black-pure overflow-hidden hover:shadow-[12px_12px_0px_#FFD600] transition-all duration-300">
                <div className="h-64 relative overflow-hidden bg-neutral-200">
                    <Image src={imageUrl} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-black-pure text-white-pure text-[10px] px-3 py-1 font-black">
                        {label || 'OBJECT_02'}
                    </div>
                </div>
                <div className="p-8 text-left border-t-2 border-black-pure">
                    <h4 className={`${textBase} text-2xl mb-2`}>{title}</h4>
                    <p className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">{subtitle}</p>
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button onClick={onClick} className="w-full aspect-[4/5] relative group border-4 border-black-pure bg-black-pure overflow-hidden">
                <Image src={imageUrl} alt={title} fill className="object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left z-10">
                    <span className="text-primary-500 font-black text-xs tracking-widest mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        // {label || 'ARCHIVE'}
                    </span>
                    <h4 className={`${textBase} text-2xl text-white-pure group-hover:text-primary-500 transition-colors`}>{title}</h4>
                    <div className="h-1 w-0 bg-white-pure mt-6 group-hover:w-full transition-all duration-700" />
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 border-r-4 border-t-4 border-primary-500" />
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button onClick={onClick} className="w-full flex flex-col group border-b-8 border-black-pure bg-white-pure hover:bg-neutral-50 transition-colors">
                <div className="flex items-stretch border-b-2 border-black-pure">
                    <div className="flex-1 p-6 text-left">
                        <span className="text-[10px] font-black italic opacity-30 mb-2 block">{label}</span>
                        <h4 className={`${textBase} text-xl`}>{title}</h4>
                    </div>
                    <div className="w-24 bg-secondary-500 flex items-center justify-center font-black text-2xl group-hover:bg-primary-500 transition-colors">
                        +
                    </div>
                </div>
                <div className="h-40 relative">
                    <Image src={imageUrl} alt={title} fill className="object-cover grayscale" />
                    <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply" />
                    {subtitle && <div className="absolute bottom-4 left-4 bg-black-pure text-white-pure px-4 py-1 text-xs font-bold">{subtitle}</div>}
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button onClick={onClick} className="w-full group grid grid-cols-[120px_1fr] bg-black-pure p-1 border-2 border-black-pure hover:bg-primary-500 transition-colors duration-500">
                <div className="h-32 relative bg-neutral-800 border border-white-pure/10">
                    <Image src={imageUrl} alt={title} fill className="object-cover" />
                </div>
                <div className="p-6 text-left flex flex-col justify-between">
                    <h4 className={`${textBase} text-xl text-white-pure group-hover:text-black-pure transition-colors`}>{title}</h4>
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-primary-500 group-hover:text-black-pure">{label}</span>
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-white-pure group-hover:bg-black-pure" />)}
                        </div>
                    </div>
                </div>
            </button>
        )
    }

    return (
        <button onClick={onClick} className="w-full p-10 border-4 border-black-pure bg-white-pure relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="relative z-10 text-left">
                <div className="w-12 h-1 bg-black-pure mb-6 group-hover:w-full group-hover:bg-primary-500 transition-all duration-500" />
                <h4 className={`${textBase} text-2xl mb-4`}>{title}</h4>
                <p className="text-base font-bold opacity-40 mb-8 max-w-[80%]">{subtitle}</p>
                <span className="text-xs font-black tracking-widest bg-neutral-100 px-3 py-1">{label || 'MODULE_01'}</span>
            </div>
            <div className="absolute top-10 right-10 w-20 h-20 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image src={imageUrl} alt={title} fill className="object-cover rounded-full" />
            </div>
        </button>
    )
}

export default SectionCard