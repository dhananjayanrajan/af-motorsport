"use client"

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
    const marqueeItems = circuits.map(c => c.name)

    const carouselItems = circuits.map(circuit => ({
        id: String(circuit.id),
        type: 'circuit' as const,
        data: circuit,
        media: circuit.assets?.cover as Media
    }))

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="flex flex-col md:flex-row border-b-2 border-black-pure">
                <div className="w-full md:w-[40%] p-8 md:p-12 bg-black-pure flex flex-col justify-between gap-12">
                    <SectionTitle
                        label="WORLD TOUR"
                        lineOne="RACING"
                        lineTwo="CIRCUITS"
                        highlight="GLOBAL"
                        variant={2}
                    />
                    <div className="space-y-6">
                        <div className="text-white-pure">
                            <SectionDescription
                                text="The definitive collection of championship tracks. Detailed geometry, technical specifications, and location data for every sanctioned venue."
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="px-4 py-2 bg-primary-500 font-mono text-xs font-black uppercase text-black-pure">TOTAL: {circuits.length}</div>
                            <div className="px-4 py-2 bg-secondary-500 font-mono text-xs font-black uppercase text-black-pure">FIA GRADE 1</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-secondary-500 relative overflow-hidden flex items-center justify-center p-8 md:p-12">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid.svg')] bg-center" />
                    <div className="relative w-full max-w-2xl aspect-video border-4 border-black-pure bg-white-pure shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-8 bg-black-pure flex items-center justify-between px-4 z-10">
                            <span className="font-mono text-[10px] text-white-pure uppercase font-black tracking-widest">Map / {currentCircuit?.name}</span>
                            <div className="flex gap-2">
                                <div className="size-2 rounded-full bg-primary-500 animate-pulse" />
                            </div>
                        </div>
                        <div className="absolute inset-0 p-12 flex items-center justify-center">
                            {currentCircuit?.assets?.circuit_map ? (
                                <Image
                                    src={(currentCircuit.assets.circuit_map as Media).url!}
                                    alt="Track Geometry"
                                    fill
                                    className="object-contain p-12 invert"
                                />
                            ) : (
                                <span className="font-mono text-[10px] font-black text-black-pure/20 uppercase">No Geometry Data</span>
                            )}
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

            <div className="flex-1 bg-black-pure min-h-[600px]">
                <SectionCarousel
                    items={carouselItems}
                    variant={2}
                    cardVariant="circuit"
                    autoplayDelay={4000}
                    basePath=""
                    slidesPerView={3}
                />
            </div>

            <SectionFooter />
        </section>
    )
}

export default CircuitCalendar