'use client'

import Hyperspeed from '@/components/Hyperspeed'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface HyperspeedSectionProps {
    navigation: {
        series: string
        seasons: string
        events: string
        sessions: string
        seriesName?: string
        seasonsName?: string
        eventsName?: string
        sessionsName?: string
    }
}

const HyperspeedSection: React.FC<HyperspeedSectionProps> = ({ navigation }) => {
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

    const routes = [
        { id: '01', label: 'SERIES', slug: navigation.series, name: navigation.seriesName, path: '/competition/series' },
        { id: '02', label: 'SEASONS', slug: navigation.seasons, name: navigation.seasonsName, path: '/competition/seasons' },
        { id: '03', label: 'EVENTS', slug: navigation.events, name: navigation.eventsName, path: '/competition/events' },
        { id: '04', label: 'SESSIONS', slug: navigation.sessions, name: navigation.sessionsName, path: '/competition/sessions' }
    ]

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-black-pure flex flex-col md:flex-row overflow-hidden border-b border-black-pure"
        >
            <div className="w-full md:w-1/2 h-full flex flex-col bg-white-pure z-20 border-r border-black-pure">
                {routes.map((route) => (
                    <Link
                        key={route.id}
                        href={`${route.path}/${route.slug}`}
                        className="flex-1 group flex items-center border-b border-black-pure last:border-b-0 hover:bg-primary-500 focus:bg-secondary-500 transition-colors outline-none"
                    >
                        <div className="w-full flex items-center px-6 md:px-10 h-full">
                            <div className="flex items-center justify-center h-full aspect-square border-r border-black-pure mr-6 md:mr-10">
                                <span className="font-mono text-xs font-black text-black-pure">
                                    {route.id}
                                </span>
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <h2 className="font-race text-xl md:text-2xl font-black uppercase tracking-tighter text-black-pure">
                                    {route.label}
                                </h2>
                                <div className="w-4 h-4 bg-white-pure border border-black-pure group-hover:bg-black-pure transition-colors" />
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

                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="grid grid-cols-4 h-full w-full">
                        <div className="border-r border-primary-500 h-full" />
                        <div className="border-r border-primary-500 h-full" />
                        <div className="border-r border-primary-500 h-full" />
                    </div>
                    <div className="grid grid-rows-4 h-full w-full absolute inset-0">
                        <div className="border-b border-primary-500 w-full" />
                        <div className="border-b border-primary-500 w-full" />
                        <div className="border-b border-primary-500 w-full" />
                    </div>
                </div>

                <div className="relative z-10 h-full w-full flex flex-col justify-end">
                    <div className="grid grid-cols-2 bg-white-pure border-t border-black-pure">
                        {routes.map((route) => (
                            <div
                                key={`stat-${route.id}`}
                                className="p-5 border-r border-b border-black-pure last:border-r-0 flex flex-col gap-2 bg-white-pure hover:bg-tertiary-500 hover:text-white-pure transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary-500 border border-black-pure" />
                                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black-pure group-hover:text-white-pure">
                                        ACTIVE {route.label}
                                    </span>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono opacity-60 uppercase font-black">{route.label}</span>
                                        <span className="text-[11px] font-mono font-black uppercase">{route.name || route.slug?.toUpperCase() || 'LOADING'}</span>
                                    </div>
                                    <div className="bg-black-pure text-white-pure px-2 py-0.5 group-hover:bg-white-pure group-hover:text-black-pure transition-colors">
                                        <span className="font-mono text-[9px] font-black">{route.id}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HyperspeedSection