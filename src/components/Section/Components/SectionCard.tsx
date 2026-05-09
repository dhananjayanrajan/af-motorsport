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
    const textBase = "font-black uppercase tracking-tighter leading-none"

    if (variant === 2) {
        return (
            <button onClick={onClick} className="w-full group bg-white-pure border-[3px] border-black-pure overflow-visible relative transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_var(--secondary-800)] z-1">
                <div className="h-64 relative overflow-hidden bg-zinc-200 border-b-[3px] border-black-pure">
                    <Image src={imageUrl} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute top-0 right-0 bg-black-pure text-white-pure text-[10px] px-4 py-2 font-black z-20">
                        {label}
                    </div>
                    <div className="absolute inset-0 bg-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="p-6 text-left relative bg-white-pure">
                    <h4 className={`${textBase} text-xl text-black-pure mb-3 break-words`}>{title}</h4>
                    <p className="text-xs font-bold text-neutral-500 line-clamp-2 uppercase tracking-tight">{subtitle}</p>
                </div>
            </button>
        )
    }

    if (variant === 3) {
        return (
            <button onClick={onClick} className="w-full aspect-[3/4] relative group border-[4px] border-black-pure bg-black-pure overflow-hidden active:scale-[0.98] transition-transform z-1">
                <Image src={imageUrl} alt={title} fill className="object-cover opacity-60 grayscale group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-left z-10">
                    <div className="flex justify-between items-start">
                        <div className="bg-primary-500 w-10 h-10 flex items-center justify-center font-black text-black-pure border-2 border-black-pure -rotate-12 group-hover:rotate-0 transition-transform">
                            /
                        </div>
                        <span className="text-[10px] font-black text-white-pure bg-black-pure/80 px-2 py-1 backdrop-blur-sm border border-white-pure/20">
                            {label}
                        </span>
                    </div>
                    <div>
                        <h4 className={`${textBase} text-xl text-white-pure group-hover:text-primary-500 transition-colors mb-4 break-words`}>{title}</h4>
                        <div className="h-2 w-full bg-white-pure/20 relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-primary-500 w-0 group-hover:w-full transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </button>
        )
    }

    if (variant === 4) {
        return (
            <button onClick={onClick} className="w-full flex flex-col group border-[3px] border-black-pure bg-white-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all z-1">
                <div className="flex items-center justify-between p-5 border-b-[3px] border-black-pure bg-zinc-50 group-hover:bg-tertiary-50 transition-colors">
                    <div className="text-left overflow-hidden">
                        <span className="text-[10px] font-black text-tertiary-600 block mb-1">{label}</span>
                        <h4 className={`${textBase} text-lg text-black-pure truncate`}>{title}</h4>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full border-2 border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                    </div>
                </div>
                <div className="h-48 relative bg-black-pure overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    {subtitle && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black-pure to-transparent">
                            <p className="text-[10px] font-black text-white-pure uppercase tracking-widest">{subtitle}</p>
                        </div>
                    )}
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button onClick={onClick} className="w-full group grid grid-cols-1 xs:grid-cols-[140px_1fr] bg-white-pure border-[3px] border-black-pure hover:bg-black-pure transition-colors duration-300 text-left z-1">
                <div className="h-40 xs:h-full relative bg-zinc-200 border-b-[3px] xs:border-b-0 xs:border-r-[3px] border-black-pure overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="p-6 flex flex-col justify-between gap-4">
                    <div>
                        <div className="flex gap-1 mb-3">
                            <div className="w-6 h-1.5 bg-primary-500" />
                            <div className="w-2 h-1.5 bg-black-pure group-hover:bg-white-pure" />
                        </div>
                        <h4 className={`${textBase} text-lg text-black-pure group-hover:text-white-pure transition-colors break-words`}>{title}</h4>
                    </div>
                    <div className="flex justify-between items-center border-t border-black-pure group-hover:border-white-pure/20 pt-4">
                        <span className="text-[10px] font-black text-neutral-400 group-hover:text-primary-500 uppercase">{label}</span>
                        <div className="w-2 h-2 bg-black-pure group-hover:bg-primary-500 animate-pulse" />
                    </div>
                </div>
            </button>
        )
    }

    return (
        <button onClick={onClick} className="w-full p-8 md:p-10 border-[4px] border-black-pure bg-white-pure relative group overflow-hidden transition-all hover:bg-zinc-50 z-1">
            <div className="absolute top-0 left-0 w-full h-2 bg-black-pure group-hover:h-4 group-hover:bg-primary-500 transition-all" />
            <div className="relative z-10 text-left">
                <div className="mb-8 flex justify-between items-start">
                    <span className="text-[10px] font-black px-2 py-1 bg-black-pure text-white-pure">{label}</span>
                    <div className="w-16 h-16 relative border-2 border-black-pure rotate-3 group-hover:rotate-12 transition-transform overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Image src={imageUrl} alt={title} fill className="object-cover" />
                    </div>
                </div>
                <h4 className={`${textBase} text-xl md:text-2xl mb-4 text-black-pure break-words`}>{title}</h4>
                <p className="text-sm font-bold text-neutral-500 max-w-xs break-words uppercase leading-tight">{subtitle}</p>
                <div className="mt-8 flex gap-2 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-8 h-1 bg-black-pure/10 group-hover:bg-primary-500 transition-colors duration-300"
                            style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                </div>
            </div>
        </button>
    )
}

export default SectionCard