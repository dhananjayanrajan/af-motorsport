"use client"

import SectionFooter from '@/components/Section/Footer'
import { Garage, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface GarageDirectoryProps {
    garages: Garage[]
}

const GarageDirectory: React.FC<GarageDirectoryProps> = ({ garages = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const activeGarage = garages[activeIndex]
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (garages.length > 6 && !isPaused) {
            autoplayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % garages.length)
            }, 5000)
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }
    }, [garages.length, isPaused])

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure relative">

                <div className="flex-1 flex flex-col">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure border-b-2 border-black-pure">

                        <div className="md:col-span-3 relative bg-white-pure overflow-hidden flex items-center justify-center p-0 min-h-[400px] md:min-h-[500px]">
                            <div className="absolute inset-0 grayscale contrast-125 brightness-75 transition-all duration-1000">
                                <Image
                                    src={(activeGarage?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeGarage?.id}/1600/1000`}
                                    alt={activeGarage?.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute inset-0 bg-primary-500/20 mix-blend-multiply" />

                            <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                                <h2 className="text-white-pure text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-race font-black uppercase tracking-tighter leading-[1.1]">
                                    {activeGarage?.name}
                                </h2>
                            </div>
                        </div>

                        <div className="md:col-span-1 bg-primary-500 p-5 md:p-6 lg:p-8 flex flex-col justify-between">
                            <div className="space-y-5 md:space-y-6">
                                <div className="size-12 md:size-14 lg:size-16 bg-white-pure border-2 border-black-pure flex items-center justify-center">
                                    <span className="text-black-pure font-race font-black text-xl md:text-2xl lg:text-3xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-mono text-[8px] md:text-[9px] font-black text-black-pure uppercase tracking-[0.3em]">Facility Code</span>
                                    <p className="text-base md:text-lg lg:text-xl font-race font-black text-black-pure uppercase tracking-tighter">
                                        {activeGarage?.basics?.identifiers?.code || "UNASSIGNED"}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 md:space-y-3 mt-4">
                                <div className="h-0.5 w-full bg-black-pure" />
                                <span className="font-mono text-[7px] md:text-[8px] font-black text-black-pure uppercase tracking-widest">Bauhaus System 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-auto md:h-64 lg:h-72 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure">
                        <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-between bg-white-pure">
                            <span className="font-mono text-[8px] md:text-[9px] font-black uppercase text-black-pure/40">Specifications</span>
                            <div className="space-y-2 md:space-y-3 mt-3 md:mt-4">
                                <div className="flex justify-between items-end border-b border-black-pure pb-1">
                                    <span className="font-mono text-[8px] md:text-[9px] font-black uppercase">Area</span>
                                    <span className="text-base md:text-lg lg:text-xl font-race font-black uppercase">{activeGarage?.details?.size_sq_m || 0} SQM</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-black-pure pb-1">
                                    <span className="font-mono text-[8px] md:text-[9px] font-black uppercase">Type</span>
                                    <span className="text-base md:text-lg lg:text-xl font-race font-black uppercase">{activeGarage?.details?.type || 'STANDARD'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-between bg-white-pure">
                            <span className="font-mono text-[8px] md:text-[9px] font-black uppercase text-black-pure/40">Narrative</span>
                            <p className="text-[10px] md:text-[11px] lg:text-xs font-bold uppercase text-black-pure/70 leading-tight mt-3 md:mt-4 line-clamp-3 md:line-clamp-none">
                                {activeGarage?.basics?.tagline || activeGarage?.basics?.description || "High-capacity professional technical support center."}
                            </p>
                        </div>

                        <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-between bg-black-pure">
                            <span className="font-mono text-[8px] md:text-[9px] font-black uppercase text-white-pure/40">Inventory Access</span>
                            <Link
                                href={`/resources/garages/${activeGarage?.slug}`}
                                className="w-full bg-white-pure text-black-pure py-3 md:py-4 lg:py-5 font-race font-black uppercase text-center text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-secondary-500 transition-colors mt-3 md:mt-4"
                            >
                                Open Registry →
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full md:w-24 lg:w-32 bg-white-pure flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar divide-x-2 md:divide-x-0 md:divide-y-2 divide-black-pure"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {garages.map((garage, idx) => (
                        <button
                            key={garage.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`flex-1 md:flex-none h-16 md:h-24 lg:h-28 flex flex-col items-center justify-center gap-1.5 md:gap-2 transition-all duration-300
                                ${activeIndex === idx ? 'bg-secondary-500' : 'bg-white-pure hover:bg-black-pure group'}
                            `}
                        >
                            <span className={`font-mono text-[9px] md:text-[10px] lg:text-xs font-black ${activeIndex === idx ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <div className={`size-2 md:size-2.5 rounded-full border border-black-pure ${activeIndex === idx ? 'bg-black-pure' : 'bg-transparent group-hover:border-white-pure'}`} />
                        </button>
                    ))}
                </div>
            </div>
            <SectionFooter />
        </section>
    )
}

export default GarageDirectory