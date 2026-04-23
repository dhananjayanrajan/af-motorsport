// components/Section/Blocks/HyperspeedSection.tsx
'use client'

import Hyperspeed from '@/components/Hyperspeed'
import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

export interface HyperspeedRoute {
    id: string
    label: string
    slug: string
    name: string
    path: string
}

interface HyperspeedSectionProps {
    id?: string
    title?: string
    subtitle?: string
    routes: HyperspeedRoute[]
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
}

const HyperspeedSection: React.FC<HyperspeedSectionProps> = ({
    id = 'hyperspeed',
    title = 'Navigation',
    subtitle = 'Explore',
    routes = [],
    headerVariant = 1,
    footerVariant = 1
}) => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1, rootMargin: '200px' }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id={id}
            className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden"
        >
            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(routes.length).padStart(2, '0')}
            />

            <div className="relative w-full h-[600px] md:h-[700px] flex flex-col md:flex-row border-b border-black-pure">
                <div className="w-full md:w-1/2 h-full flex flex-col bg-white-pure border-r border-black-pure">
                    {routes.map((route, idx) => (
                        <Link
                            key={route.id}
                            href={`${route.path}/${route.slug}`}
                            className="flex-1 group relative flex items-center border-b border-black-pure last:border-b-0 hover:bg-black-pure focus:bg-black-pure focus:outline-none focus:ring-1 focus:ring-primary-500 active:bg-primary-500 transition-colors duration-200"
                        >
                            <div className="absolute top-0 left-0 w-0.5 h-0 bg-primary-500 transition-all duration-300 group-hover:h-full group-focus:h-full" />

                            <div className="w-full flex items-center px-8 md:px-12 h-full">
                                <div className="flex items-center justify-center h-full border-r border-black-pure pr-8 md:pr-12 mr-8 md:mr-12">
                                    <span className="text-xl md:text-2xl font-mono font-black text-black-pure group-hover:text-primary-500 group-focus:text-primary-500 group-active:text-black-pure transition-colors">
                                        {route.id}
                                    </span>
                                </div>
                                <div className="flex-1 flex items-center justify-between min-w-0">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono font-black text-black-pure/40 uppercase tracking-wider group-hover:text-white-pure/40 group-focus:text-white-pure/40">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="text-xl md:text-2xl font-mono font-black uppercase tracking-tighter text-black-pure group-hover:text-white-pure group-focus:text-white-pure group-active:text-black-pure transition-colors truncate">
                                            {route.label}
                                        </h2>
                                    </div>
                                    <div className="w-10 h-10 bg-white-pure border border-black-pure group-hover:bg-primary-500 group-hover:border-primary-500 group-focus:bg-primary-500 group-focus:border-primary-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 flex-shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-black-pure group-hover:text-black-pure group-focus:text-black-pure transition-transform duration-300 group-hover:translate-x-1">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="w-full md:w-1/2 h-full relative bg-black-pure overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {isVisible && (
                            <Hyperspeed
                                effectOptions={{
                                    distortion: "turbulentDistortion",
                                    length: 400,
                                    roadWidth: 10,
                                    islandWidth: 2,
                                    lanesPerRoad: 2,
                                    fov: 90,
                                    speedUp: 2.5,
                                    colors: {
                                        roadColor: 0x000000,
                                        islandColor: 0x000000,
                                        background: 0x000000,
                                        shoulderLines: 0x00FF41,
                                        brokenLines: 0x00FF41,
                                        leftCars: [0x00FF41],
                                        rightCars: [0x00FF41],
                                        sticks: 0x00FF41
                                    }
                                }}
                            />
                        )}
                    </div>

                    <div className="relative z-10 h-full w-full flex flex-col justify-end">
                        <div className="grid grid-cols-2 bg-white-pure border-t border-black-pure">
                            {routes.map((route) => (
                                <Link
                                    key={`stat-${route.id}`}
                                    href={`${route.path}/${route.slug}`}
                                    className="group p-5 border-r border-b border-black-pure last:border-r-0 flex flex-col gap-3 bg-white-pure hover:bg-black-pure focus:bg-black-pure focus:outline-none focus:ring-1 focus:ring-primary-500 active:bg-primary-500 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary-500 border border-black-pure group-hover:bg-white-pure group-focus:bg-white-pure group-active:bg-black-pure transition-colors" />
                                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black-pure group-hover:text-white-pure group-focus:text-white-pure group-active:text-black-pure">
                                            {route.label}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-end gap-3">
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[8px] font-mono font-black uppercase tracking-wider text-black-pure/50 leading-none mb-1 group-hover:text-white-pure/50 group-focus:text-white-pure/50">
                                                ENTRY
                                            </span>
                                            <span className="text-sm font-mono font-black uppercase tracking-tighter leading-tight truncate text-black-pure group-hover:text-white-pure group-focus:text-white-pure group-active:text-black-pure">
                                                {route.name}
                                            </span>
                                        </div>
                                        <div className="bg-black-pure text-white-pure px-2 py-0.5 border border-black-pure group-hover:bg-white-pure group-hover:text-black-pure group-focus:bg-white-pure group-focus:text-black-pure transition-colors flex-shrink-0">
                                            <span className="text-[10px] font-mono font-black">{route.id}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SectionFooter variant={footerVariant} />
        </section>
    )
}

export default HyperspeedSection