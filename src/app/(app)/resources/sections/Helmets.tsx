"use client"

import { Helmet } from '@/payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface HelmetSectionProps {
    helmets: Helmet[]
    title: string
    subtitle: string
    catalogLabel?: string
    designerLabel?: string
    yearLabel?: string
    styleLabel?: string
    materialLabel?: string
    viewDetailsLabel?: string
    noHelmetsLabel?: string
}

const HelmetSection: React.FC<HelmetSectionProps> = ({
    helmets,
    title,
    subtitle,
    catalogLabel = "",
    designerLabel = "",
    yearLabel = "",
    styleLabel = "",
    materialLabel = "",
    viewDetailsLabel = "",
    noHelmetsLabel = ""
}) => {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState<number>(0)

    if (!helmets || helmets.length === 0) {
        return (
            <section className="w-full py-24 px-8 bg-white-pure">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-primary" />
                    <div className="w-16 h-16 bg-secondary" />
                    <div className="w-16 h-16 bg-tertiary" />
                    <p className="text-2xl font-black text-black-pure uppercase tracking-normal">{noHelmetsLabel}</p>
                </div>
            </section>
        )
    }

    const activeHelmet = helmets[activeIndex]
    const activeHelmetImage = activeHelmet?.assets?.thumbnail
    const activeHelmetImageUrl = activeHelmetImage && typeof activeHelmetImage !== 'number' ? activeHelmetImage.url : null
    const activeHelmetAlt = activeHelmetImage && typeof activeHelmetImage !== 'number' ? activeHelmetImage.alt : activeHelmet.name

    return (
        <section className="w-full bg-white-pure">
            <div className="px-8 pt-12 pb-8">
                <div className="flex items-baseline gap-8">
                    <div className="flex gap-4">
                        <div className="w-4 h-16 bg-primary" />
                        <div className="w-4 h-16 bg-secondary" />
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-6xl font-black text-black-pure uppercase tracking-normal leading-tight">
                            {title}
                        </h2>
                        <p className="text-xl font-mono text-black-pure uppercase tracking-widest mt-2">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 px-8">
                <div className="col-span-12 lg:col-span-7 bg-white-100 flex items-center justify-center p-8 min-h-[500px] relative">
                    <div className="absolute top-8 left-8 flex gap-2">
                        <div className="w-12 h-12 bg-tertiary" />
                        <div className="w-12 h-12 bg-black-pure" />
                    </div>

                    <div className="relative w-full max-w-xl aspect-square">
                        {activeHelmetImageUrl ? (
                            <Image
                                src={activeHelmetImageUrl}
                                alt={activeHelmetAlt || ''}
                                fill
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-48 h-48 bg-white-pure" />
                                <div className="w-32 h-32 bg-primary ml-4" />
                                <div className="w-16 h-16 bg-secondary ml-4" />
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-8 right-8">
                        <span className="font-mono text-8xl font-black text-black-pure opacity-20">
                            {String(activeIndex + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="w-2 h-24 bg-black-pure" />
                            <div>
                                <span className="font-mono text-sm font-black text-black-pure uppercase tracking-widest">{catalogLabel}</span>
                                <h3 className="text-4xl font-black text-black-pure uppercase tracking-normal mt-2 leading-tight">
                                    {activeHelmet.name}
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pl-8">
                            <div>
                                <div className="w-8 h-1 bg-primary mb-4" />
                                <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest block">{designerLabel}</span>
                                <span className="text-2xl font-black text-black-pure uppercase tracking-normal block mt-2">
                                    {activeHelmet.details?.designer || '—'}
                                </span>
                            </div>
                            <div>
                                <div className="w-8 h-1 bg-secondary mb-4" />
                                <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest block">{yearLabel}</span>
                                <span className="text-2xl font-black text-black-pure uppercase tracking-normal block mt-2">
                                    {activeHelmet.details?.year || '—'}
                                </span>
                            </div>
                            <div>
                                <div className="w-8 h-1 bg-tertiary mb-4" />
                                <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest block">{styleLabel}</span>
                                <span className="text-xl font-black text-black-pure uppercase tracking-normal block mt-2">
                                    {activeHelmet.details?.style || '—'}
                                </span>
                            </div>
                            <div>
                                <div className="w-8 h-1 bg-black-pure mb-4" />
                                <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest block">{materialLabel}</span>
                                <span className="text-xl font-black text-black-pure uppercase tracking-normal block mt-2">
                                    {activeHelmet.details?.material || '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push(`/collection/helmets/${activeHelmet.slug}`)}
                        className="mt-12 py-6 px-8 bg-primary font-mono text-base font-black text-black-pure uppercase tracking-widest hover:bg-black-pure hover:text-white-pure transition-colors duration-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black-pure active:bg-secondary active:text-black-pure flex items-center justify-between group"
                    >
                        <span>{viewDetailsLabel}</span>
                        <div className="w-8 h-8 bg-black-pure group-hover:bg-white-pure transition-colors duration-200" />
                    </button>
                </div>
            </div>

            <div className="px-8 py-12 mt-8">
                <div className="flex items-center gap-8 mb-8">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-primary" />
                        <div className="w-3 h-3 bg-secondary" />
                        <div className="w-3 h-3 bg-tertiary" />
                        <div className="w-3 h-3 bg-black-pure" />
                    </div>
                    <span className="font-mono text-sm font-black text-black-pure uppercase tracking-widest">
                        {helmets.length} {catalogLabel}
                    </span>
                    <div className="flex-1 h-px bg-black-pure" />
                </div>

                <div className="flex flex-wrap gap-8 items-end">
                    {helmets.map((helmet, index) => {
                        const thumbImage = helmet.assets?.thumbnail
                        const thumbUrl = thumbImage && typeof thumbImage !== 'number' ? thumbImage.url : null
                        const thumbAlt = thumbImage && typeof thumbImage !== 'number' ? thumbImage.alt : helmet.name

                        return (
                            <button
                                key={helmet.id}
                                onClick={() => setActiveIndex(index)}
                                className={`group transition-all duration-200 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black-pure ${activeIndex === index ? 'scale-105' : 'hover:scale-105'
                                    }`}
                            >
                                <div
                                    className={`w-32 h-32 flex items-center justify-center transition-colors duration-200 ${activeIndex === index ? 'bg-primary' : 'bg-white-100 hover:bg-secondary'
                                        }`}
                                >
                                    {thumbUrl ? (
                                        <Image
                                            src={thumbUrl}
                                            alt={thumbAlt || ''}
                                            width={128}
                                            height={128}
                                            className="object-contain w-24 h-24"
                                        />
                                    ) : (
                                        <div className="flex gap-1">
                                            <div className="w-6 h-12 bg-black-pure" />
                                            <div className="w-6 h-8 bg-black-pure" />
                                            <div className="w-6 h-10 bg-black-pure" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className={`w-2 h-2 transition-colors duration-200 ${activeIndex === index ? 'bg-primary' : 'bg-black-pure'
                                        }`} />
                                    <span className={`font-mono text-xs font-black uppercase tracking-widest transition-colors duration-200 ${activeIndex === index ? 'text-primary' : 'text-black-pure'
                                        }`}>
                                        {helmet.basics?.tagline?.slice(0, 6) || helmet.name.slice(0, 6)}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="h-1 w-full bg-black-pure" />
        </section>
    )
}

export default HelmetSection