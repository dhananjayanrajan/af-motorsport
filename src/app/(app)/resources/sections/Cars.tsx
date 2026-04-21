"use client"

import SectionFooter from '@/components/Section/Footer'
import { Car, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface CarsDirectoryProps {
    cars: Car[]
}

const CarsDirectory: React.FC<CarsDirectoryProps> = ({ cars = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const activeCar = cars[activeIndex]
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (cars.length > 6 && !isPaused) {
            autoplayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % cars.length)
            }, 4000)
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }
    }, [cars.length, isPaused])

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="h-20 md:h-24 border-b-2 border-black-pure flex divide-x-2 divide-black-pure bg-white-pure z-30">
                <div className="w-20 md:w-32 flex items-center justify-center bg-black-pure text-white-pure font-black text-2xl">
                    {activeCar?.basics?.identifiers?.version?.slice(0, 2) || "V1"}
                </div>
                <div className="flex-1 flex items-center px-6 md:px-12 bg-primary-500">
                    <h2 className="text-sm md:text-lg font-black text-black-pure uppercase tracking-tighter">
                        {activeCar?.name}
                    </h2>
                </div>
                <div className="hidden lg:flex w-64 items-center justify-center font-mono text-[10px] font-black uppercase text-black-pure tracking-widest">
                    RACE CAR CATALOGUE
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative">
                <div className="flex-1 relative flex flex-col border-r-0 lg:border-r-2 border-black-pure">
                    <div className="flex-1 relative bg-white-pure overflow-hidden flex items-center justify-center p-8 lg:p-20">
                        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.03] pointer-events-none">
                            {Array.from({ length: 144 }).map((_, i) => (
                                <div key={i} className="border-[0.5px] border-black-pure" />
                            ))}
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
                            <span className="text-base md:text-xl lg:text-3xl font-black text-black-pure/[0.03] uppercase leading-none italic">
                                {activeCar?.basics?.identifiers?.model || "UNIT"}
                            </span>
                        </div>

                        <div className="relative w-full h-full max-w-5xl transition-all duration-1000 ease-in-out transform">
                            <Image
                                src={(activeCar?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeCar?.id}/1200/800`}
                                alt={activeCar?.name}
                                fill
                                className="object-contain hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>

                    <div className="h-auto lg:h-48 border-t-2 border-black-pure flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure bg-white-pure">
                        <div className="flex-1 p-6 flex flex-col justify-between group bg-secondary-500">
                            <span className="font-mono text-base font-black text-black-pure uppercase">Technical Spec</span>
                            <div className="flex items-end justify-between">
                                <span className="text-base md:text-2xl font-black text-black-pure uppercase tracking-tighter leading-none">
                                    {activeCar?.details?.status || "Active"}
                                </span>
                                <Link href={`/resources/cars/${activeCar?.slug}`} className="size-12 bg-black-pure text-white-pure flex items-center justify-center text-2xl font-black hover:bg-white-pure hover:text-black-pure transition-colors">
                                    +
                                </Link>
                            </div>
                        </div>
                        <div className="w-full md:w-[40%] p-6 flex flex-col justify-between">
                            <span className="font-mono text-base font-black text-black-pure/40 uppercase">Chassis Reference</span>
                            <p className="text-base md:text-2xl font-bold text-black-pure uppercase leading-none truncate">
                                {activeCar?.basics?.identifiers?.chassis || "NOT_ASSIGNED"}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="w-full lg:w-[25%] xl:w-[20%] bg-black-pure flex flex-col overflow-y-auto no-scrollbar"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {cars.map((car, idx) => (
                        <button
                            key={car.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`
                                relative w-full h-32 md:h-40 border-b-2 border-white-pure/10 flex flex-col justify-between p-6 transition-all duration-500 group
                                ${activeIndex === idx ? 'bg-primary-500 border-b-black-pure' : 'bg-black-pure hover:bg-white-pure'}
                            `}
                        >
                            <div className="flex justify-between w-full items-start">
                                <span className={`font-mono text-xs font-black ${activeIndex === idx ? 'text-black-pure' : 'text-white-pure group-hover:text-black-pure'}`}>
                                    {(idx + 1).toString().padStart(2, '0')}
                                </span>
                                <div className={`size-3 rounded-full border-2 ${activeIndex === idx ? 'bg-black-pure border-black-pure' : 'bg-transparent border-white-pure group-hover:border-black-pure'}`} />
                            </div>
                            <div className="text-left">
                                <h3 className={`text-sm md:text-base font-black uppercase tracking-tighter leading-none transition-colors ${activeIndex === idx ? 'text-black-pure' : 'text-white-pure group-hover:text-black-pure'}`}>
                                    {car.name}
                                </h3>
                                <p className={`font-mono text-sm font-bold uppercase mt-2 ${activeIndex === idx ? 'text-black-pure/60' : 'text-white-pure/40 group-hover:text-black-pure/40'}`}>
                                    {car.basics?.identifiers?.model || "Base Unit"}
                                </p>
                            </div>
                            {activeIndex === idx && (
                                <div className="absolute bottom-0 left-0 h-1 bg-black-pure animate-[progress_4s_linear]" style={{ width: '100%' }} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <SectionFooter />
            <style jsx>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </section>
    )
}

export default CarsDirectory