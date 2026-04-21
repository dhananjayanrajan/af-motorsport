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
    } | null | undefined
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
        {
            id: '01',
            label: 'Series',
            slug: navigation?.series || 'active',
            name: navigation?.seriesName || 'Competition Series',
            path: '/competition/series'
        },
        {
            id: '02',
            label: 'Seasons',
            slug: navigation?.seasons || 'active',
            name: navigation?.seasonsName || 'Championship Seasons',
            path: '/competition/seasons'
        },
        {
            id: '03',
            label: 'Events',
            slug: navigation?.events || 'active',
            name: navigation?.eventsName || 'Global Events',
            path: '/competition/events'
        },
        {
            id: '04',
            label: 'Sessions',
            slug: navigation?.sessions || 'active',
            name: navigation?.sessionsName || 'Live Sessions',
            path: '/competition/sessions'
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-black-pure flex flex-col md:flex-row overflow-hidden border-b border-black-pure outline-none"
        >
            <nav className="w-full md:w-1/2 h-full flex flex-col bg-white-pure z-20 border-r border-black-pure">
                {routes.map((route) => (
                    <Link
                        key={route.id}
                        href={`${route.path}/${route.slug}`}
                        className="flex-1 group flex items-center border-b border-black-pure last:border-b-0 hover:bg-primary-500 focus:bg-secondary-500 active:bg-black-pure transition-colors duration-100 outline-none"
                    >
                        <div className="w-full flex items-center px-6 md:px-10 h-full">
                            <div className="flex items-center justify-center h-full border-r border-black-pure pr-6 md:pr-10 mr-6 md:mr-10">
                                <span className="text-base md:text-lg font-black text-black-pure group-active:text-white-pure">
                                    {route.id}
                                </span>
                            </div>
                            <div className="flex-1 flex items-center justify-between min-w-0">
                                <h2 className="text-lg md:text-xl font-black uppercase tracking-normal text-black-pure group-active:text-white-pure truncate">
                                    {route.label}
                                </h2>
                                <div className="w-6 h-6 bg-white-pure border border-black-pure group-hover:bg-black-pure group-active:bg-primary-500 flex items-center justify-center transition-colors flex-shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-current group-hover:text-white-pure">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </nav>

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
                                className="p-5 border-r border-b border-black-pure last:border-r-0 flex flex-col gap-3 bg-white-pure hover:bg-black-pure group transition-colors duration-100 outline-none focus:bg-secondary-500 active:bg-primary-500"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary-500 border border-black-pure group-active:bg-white-pure" />
                                    <span className="text-[10px] font-black uppercase tracking-normal text-black-pure group-hover:text-white-pure">
                                        View {route.label}
                                    </span>
                                </div>

                                <div className="flex justify-between items-end gap-3">
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[9px] font-black uppercase opacity-40 leading-none mb-1 text-black-pure group-hover:text-white-pure group-hover:opacity-60">Entry Name</span>
                                        <span className="text-sm font-black uppercase leading-tight truncate text-black-pure group-hover:text-white-pure">
                                            {route.name}
                                        </span>
                                    </div>
                                    <div className="bg-black-pure text-white-pure px-2 py-0.5 flex-shrink-0 border border-black-pure group-hover:bg-white-pure group-hover:text-black-pure">
                                        <span className="text-[10px] font-black">{route.id}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HyperspeedSection