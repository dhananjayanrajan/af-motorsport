"use client"

import Hyperspeed from '@/components/Hyperspeed'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface HyperspeedSectionProps {
    navigation: {
        series: string
        seasons: string
        events: string
        sessions: string
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
        { id: '01', label: 'SERIES', slug: navigation.series, path: '/competition/series' },
        { id: '02', label: 'SEASONS', slug: navigation.seasons, path: '/competition/seasons' },
        { id: '03', label: 'EVENTS', slug: navigation.events, path: '/competition/events' },
        { id: '04', label: 'SESSIONS', slug: navigation.sessions, path: '/competition/sessions' }
    ]

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen md:h-screen bg-black-pure border-b-2 border-black-pure flex flex-col md:flex-row overflow-hidden rounded-none"
        >
            <div className="w-full md:w-5/12 h-full border-r-0 md:border-r-2 border-black-pure bg-white-pure z-20 flex flex-col rounded-none">
                {routes.map((route, index) => (
                    <Link
                        key={route.id}
                        href={`${route.path}/${route.slug}`}
                        className={`group flex-1 flex items-center border-b-2 border-black-pure last:border-b-0 rounded-none bg-white-pure hover:bg-primary-500 focus:bg-primary-500 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer`}
                    >
                        <div className="w-full flex items-center gap-6 px-6 md:px-8 lg:px-12 rounded-none">
                            <span className="font-sans text-base md:text-lg font-black text-black-pure group-hover:text-black-pure group-focus:text-black-pure transition-all duration-200 ease-in-out rounded-none">
                                {route.id}
                            </span>
                            <div className="flex-1 flex items-center justify-between py-6 md:py-8 rounded-none">
                                <h2 className="font-race text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide text-black-pure group-hover:text-black-pure group-focus:text-black-pure transition-all duration-200 ease-in-out rounded-none">
                                    {route.label}
                                </h2>
                                <div className="w-6 h-6 border-2 border-black-pure bg-white-pure group-hover:bg-black-pure group-hover:border-black-pure group-focus:bg-black-pure group-focus:border-black-pure transition-all duration-200 ease-in-out rounded-none" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="w-full md:w-7/12 min-h-[600px] md:h-full flex-1 relative bg-black-pure overflow-hidden rounded-none">
                <div className="absolute inset-0 z-0 rounded-none">
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

                <div className="absolute inset-0 flex pointer-events-none rounded-none">
                    <div className="w-1/2 h-full border-r border-primary-500 rounded-none" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-primary-500 rounded-none" />
                </div>

                <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 rounded-none">
                    <div className="w-full max-w-xl border-l-[6px] border-primary-500 bg-black-pure p-6 md:p-8 lg:p-10 rounded-none transition-all duration-200 ease-in-out hover:border-l-[12px] focus-within:border-l-[12px]">
                        <div className="flex justify-between items-center mb-6 rounded-none">
                            <span className="font-sans text-xs md:text-sm font-black text-primary-500 uppercase tracking-[0.4em] rounded-none">
                                Competition Hub
                            </span>
                            <span className="text-primary-500 font-sans text-[10px] md:text-xs rounded-none">Season Active</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-none">
                            {routes.map((route) => (
                                <div key={`info-${route.id}`} className="flex flex-col border-b-2 border-neutral-800 pb-4 rounded-none transition-all duration-200 ease-in-out hover:border-primary-500 focus-within:border-primary-500">
                                    <div className="flex items-center gap-3 mb-3 rounded-none">
                                        <div className="w-2 h-6 bg-primary-500 rounded-none" />
                                        <span className="font-sans text-xs font-black text-primary-500 uppercase tracking-widest rounded-none">
                                            {route.label}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 rounded-none">
                                        <div className="flex flex-col rounded-none">
                                            <span className="text-[9px] font-sans text-neutral-500 uppercase font-black tracking-[0.2em] rounded-none">Category</span>
                                            <span className="text-xs font-sans text-white-pure font-black tracking-wide rounded-none">Championship</span>
                                        </div>
                                        <div className="flex flex-col rounded-none">
                                            <span className="text-[9px] font-sans text-neutral-500 uppercase font-black tracking-[0.2em] rounded-none">Access</span>
                                            <span className="text-xs font-sans text-secondary-500 font-black tracking-wide rounded-none">Unlocked</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 border-[16px] md:border-[40px] border-black-pure pointer-events-none z-30 rounded-none" />
        </section>
    )
}

export default HyperspeedSection