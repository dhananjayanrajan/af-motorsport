'use client'

import SectionCarousel from '@/components/Section/Carousel'
import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionScroller from '@/components/Section/Scroller'
import SectionTitle from '@/components/Section/Title'
import { Circuit, Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

interface CircuitCalendarProps {
    circuits: Circuit[]
}

const CircuitCalendar: React.FC<CircuitCalendarProps> = ({ circuits = [] }) => {
    const currentCircuit = circuits[0]
    const marqueeItems = circuits.map((c) => c.name)

    const carouselItems = circuits.map((circuit) => ({
        id: String(circuit.id),
        type: 'circuit' as const,
        data: circuit,
        media: circuit.assets?.cover as Media,
    }))

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <div className="flex flex-col md:flex-row border-b border-black-pure">
                <div className="w-full md:w-[45%] p-6 md:p-10 bg-black-pure flex flex-col justify-between gap-10 border-r border-black-pure relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-transparent to-transparent opacity-30" />

                    <SectionTitle
                        label="WORLD TOUR"
                        lineOne="RACING"
                        lineTwo="CIRCUITS"
                        highlight="GLOBAL"
                        variant={2}
                    />

                    <div className="space-y-8 relative z-10">
                        <div className="text-white-pure">
                            <SectionDescription text="The definitive collection of championship tracks. Detailed geometry, technical specifications, and location data for every sanctioned venue." />
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-white-pure/10 border border-white-pure/20">
                            <div className="p-4 bg-black-pure hover:bg-zinc-900 transition-colors group">
                                <span className="block font-mono text-[8px] text-white-pure/40 uppercase mb-1">Database</span>
                                <span className="font-mono text-xs font-black text-primary-500 uppercase">
                                    {circuits.length} Registered
                                </span>
                            </div>
                            <div className="p-4 bg-black-pure hover:bg-zinc-900 transition-colors">
                                <span className="block font-mono text-[8px] text-white-pure/40 uppercase mb-1">Standard</span>
                                <span className="font-mono text-xs font-black text-secondary-500 uppercase">
                                    FIA Grade 1
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-secondary-500 relative overflow-hidden flex items-center justify-center p-6 md:p-10 group/map">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid.svg')] bg-center bg-[length:40px_40px] animate-pulse" />

                    <div className="absolute top-10 left-10 hidden lg:block">
                        <span className="font-mono text-[8px] font-black text-black-pure/40 uppercase vertical-rl tracking-[0.5em]">
                            TRACK GEOMETRY V2.0
                        </span>
                    </div>

                    <div className="relative w-full max-w-xl aspect-video border-2 border-black-pure bg-white-pure shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover/map:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-8 bg-black-pure flex items-center justify-between px-4 z-20">
                            <div className="flex items-center gap-2">
                                <div className="size-2 bg-primary-500 animate-ping" />
                                <span className="font-mono text-[9px] text-white-pure uppercase font-black tracking-widest">
                                    Live View: {currentCircuit?.name}
                                </span>
                            </div>
                            <span className="font-mono text-[9px] text-white-pure/40">35.4897° N, 138.7271° E</span>
                        </div>

                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black-pure/5 to-transparent animate-scanline" />
                        </div>

                        <div className="absolute inset-0 p-12 flex items-center justify-center group-hover/map:scale-110 transition-transform duration-700">
                            {currentCircuit?.assets?.circuit_map ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={(currentCircuit.assets.circuit_map as Media).url!}
                                        alt="Track Geometry"
                                        fill
                                        className="object-contain invert brightness-0"
                                    />
                                </div>
                            ) : (
                                <div className="text-center space-y-2 opacity-20">
                                    <div className="size-12 border-2 border-black-pure border-dashed mx-auto animate-spin" />
                                    <span className="font-mono text-[9px] font-black text-black-pure uppercase block">
                                        Loading telemetry...
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-4 right-4 z-20">
                            <div className="flex gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className={`size-1 bg-black-pure ${i === 0 ? 'animate-pulse' : ''}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SectionScroller
                items={marqueeItems}
                variant={2}
                backgroundColor="bg-primary-500"
                textColor="text-black-pure"
            />

            <div className="flex-1 bg-black-pure min-h-[550px] border-t border-black-pure relative">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
                <SectionCarousel
                    items={carouselItems}
                    variant={2}
                    cardVariant="circuit"
                    autoplayDelay={5000}
                    basePath="/competition/circuits"
                    slidesPerView={3}
                />
            </div>

            <SectionFooter />
        </section>
    )
}

export default CircuitCalendar