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
        { id: '01', label: 'SERIES', slug: navigation.series, path: '/competition/series', color: 'bg-primary', meta: { uid: 'CH-491', protocol: 'SSL/TLS', sync: '100%', latency: '24ms' } },
        { id: '02', label: 'SEASONS', slug: navigation.seasons, path: '/competition/seasons', color: 'bg-secondary', meta: { uid: 'SN-2026', protocol: 'WEBSOCKET', sync: 'ACTIVE', latency: '12ms' } },
        { id: '03', label: 'EVENTS', slug: navigation.events, path: '/competition/events', color: 'bg-tertiary-500', meta: { uid: 'EV-882', protocol: 'JSON-RPC', sync: 'LOCKED', latency: '42ms' } },
        { id: '04', label: 'SESSIONS', slug: navigation.sessions, path: '/competition/sessions', color: 'bg-white-400', meta: { uid: 'SS-009', protocol: 'GRAPHQL', sync: 'LIVE', latency: '08ms' } }
    ]

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen md:h-screen bg-black-pure border-b-2 border-black-pure flex flex-col md:flex-row overflow-hidden"
        >
            <div className="w-full md:w-1/3 h-auto md:h-full border-r-0 md:border-r-2 border-black-pure bg-white-50 z-20 flex flex-col shrink-0">
                <div className="flex flex-col flex-1">
                    {routes.map((route) => (
                        <Link
                            key={route.id}
                            href={`${route.path}/${route.slug}`}
                            className="group flex flex-col justify-between h-fit p-10 md:p-16 md:pb-10 border-b-2 border-black-pure last:border-b-0 md:flex-1 transition-all duration-500 hover:bg-black-pure"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs font-black text-black-pure/30 group-hover:text-primary transition-colors">
                                    {route.id}
                                </span>
                                <div className={`w-3 h-3 ${route.color} border border-black-pure group-hover:scale-150 transition-transform`} />
                            </div>
                            <div className="space-y-1">
                                <span className="font-mono text-[10px] font-black text-black-pure group-hover:text-white-pure/40 uppercase tracking-widest block">
                                    {route.label}
                                </span>
                                <h2 className="text-black-pure group-hover:text-white-pure font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                                    {route.slug.split('-')[0]}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full min-h-[600px] md:h-full flex-1 relative bg-black-pure overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-80">
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

                <div className="absolute inset-0 flex pointer-events-none opacity-20">
                    <div className="w-1/2 h-full border-r border-white-pure" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white-pure" />
                </div>

                <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-16 lg:p-24">
                    <div className="w-full max-w-2xl border-l-[6px] border-primary bg-black-pure/85 backdrop-blur-xl p-8 md:p-16">
                        <div className="flex justify-between items-center mb-10">
                            <span className="font-mono text-xs md:text-sm font-black text-primary uppercase tracking-[0.6em]">
                                Telemetric_Status_Matrix
                            </span>
                            <span className="text-white-pure/30 font-mono text-[10px]">V.04.2_LOCKED</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                            {routes.map((route) => (
                                <div key={`telemetry-${route.id}`} className="flex flex-col border-b-2 border-white-pure/10 pb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-3 h-6 ${route.color}`} />
                                        <span className="font-mono text-xs text-white-pure font-black uppercase tracking-widest">
                                            {route.label}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-white-pure/50 uppercase font-black">ID</span>
                                            <span className="text-xs font-mono text-white-pure font-black">{route.meta.uid}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-white-pure/50 uppercase font-black">Sync</span>
                                            <span className="text-xs font-mono text-primary font-black">{route.meta.sync}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-white-pure/50 uppercase font-black">Net</span>
                                            <span className="text-xs font-mono text-white-pure font-black">{route.meta.protocol}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-white-pure/50 uppercase font-black">Ping</span>
                                            <span className="text-xs font-mono text-secondary font-black">{route.meta.latency}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 border-[16px] md:border-[40px] border-black-pure pointer-events-none z-30" />
        </section>
    )
}

export default HyperspeedSection