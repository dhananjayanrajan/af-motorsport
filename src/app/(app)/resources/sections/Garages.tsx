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

                        <div className="md:col-span-3 relative bg-white-pure overflow-hidden flex items-center justify-center p-0">
                            <div className="absolute inset-0 grayscale contrast-125 brightness-75 transition-all duration-1000">
                                <Image
                                    src={(activeGarage?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeGarage?.id}/1600/1000`}
                                    alt={activeGarage?.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20" />

                            <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16">
                                <h2 className="text-white-pure text-7xl md:text-9xl lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.8]">
                                    {activeGarage?.name}
                                </h2>
                            </div>
                        </div>

                        <div className="md:col-span-1 bg-primary-500 p-8 flex flex-col justify-between">
                            <div className="space-y-8">
                                <div className="size-20 bg-white-pure border-4 border-black-pure flex items-center justify-center">
                                    <span className="text-black-pure font-black text-3xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                                </div>
                                <div className="space-y-2">
                                    <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-[0.3em]">Facility Code</span>
                                    <p className="text-2xl font-black text-black-pure uppercase tracking-tighter">
                                        {activeGarage?.basics?.identifiers?.code || "UNASSIGNED"}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-black-pure" />
                                <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-widest">Bauhaus System 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 lg:h-80 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure">
                        <div className="p-8 flex flex-col justify-between bg-white-pure">
                            <span className="font-mono text-[10px] font-black uppercase text-black-pure/40">Specifications</span>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end border-b-2 border-black-pure pb-1">
                                    <span className="font-mono text-[9px] font-black uppercase">Area</span>
                                    <span className="text-xl font-black uppercase">{activeGarage?.details?.size_sq_m || 0} SQM</span>
                                </div>
                                <div className="flex justify-between items-end border-b-2 border-black-pure pb-1">
                                    <span className="font-mono text-[9px] font-black uppercase">Type</span>
                                    <span className="text-xl font-black uppercase">{activeGarage?.details?.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col justify-between bg-white-pure">
                            <span className="font-mono text-[10px] font-black uppercase text-black-pure/40">Narrative</span>
                            <p className="text-sm font-bold uppercase text-black-pure leading-tight">
                                {activeGarage?.basics?.tagline || activeGarage?.basics?.description || "High-capacity professional technical support center."}
                            </p>
                        </div>

                        <div className="p-8 flex flex-col justify-between bg-black-pure">
                            <span className="font-mono text-[10px] font-black uppercase text-white-pure/40">Inventory Access</span>
                            <Link
                                href={`/resources/garages/${activeGarage?.slug}`}
                                className="w-full bg-white-pure text-black-pure p-6 font-black uppercase text-center text-xs tracking-[0.2em] hover:bg-secondary-500 transition-colors"
                            >
                                Open Registry →
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full md:w-32 lg:w-40 bg-white-pure flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar divide-x-2 md:divide-x-0 md:divide-y-2 divide-black-pure"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {garages.map((garage, idx) => (
                        <button
                            key={garage.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`flex-1 md:flex-none h-24 md:h-40 flex flex-col items-center justify-center p-4 transition-all duration-300
                                ${activeIndex === idx ? 'bg-secondary-500' : 'bg-white-pure hover:bg-black-pure group'}
                            `}
                        >
                            <span className={`font-mono text-xs font-black mb-2 ${activeIndex === idx ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <div className={`size-3 rounded-full border-2 ${activeIndex === idx ? 'bg-black-pure border-black-pure' : 'bg-transparent border-black-pure group-hover:border-white-pure'}`} />
                        </button>
                    ))}
                </div>
            </div>
            <SectionFooter />
        </section>
    )
}

export default GarageDirectory