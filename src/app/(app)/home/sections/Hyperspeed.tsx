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
    title = '',
    subtitle = '',
    routes = [],
    headerVariant = 1,
    footerVariant = 1,
}) => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1, rootMargin: '200px' },
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const resolvePath = (route: HyperspeedRoute) => {
        const cleanPath = route.path.startsWith('/') ? route.path : `/${route.path}`
        if (!route.slug) {
            return cleanPath
        }
        return `${cleanPath}/${route.slug}`
    }

    return (
        <section
            ref={sectionRef}
            id={id}
            className="relative w-full py-12 md:py-20 bg-white-pure"
        >
            <div className="container">
                <div className="flex flex-col border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <SectionHeader
                        title={title}
                        subtitle={subtitle}
                        variant={headerVariant}
                        metadata={String(routes.length).padStart(2, '0')}
                    />

                    <div className="relative w-full h-auto md:h-[700px] flex flex-col md:flex-row border-t-2 border-black-pure">
                        <div className="w-full md:w-1/2 flex flex-col bg-white-pure md:border-r-2 border-black-pure">
                            {routes.map((route, idx) => (
                                <Link
                                    key={route.id}
                                    href={resolvePath(route)}
                                    className="flex-1 group relative flex items-center border-b-2 border-black-pure last:border-b-0 hover:bg-black-pure focus:bg-black-pure focus:outline-none transition-colors duration-200 py-8 md:py-0"
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-0 bg-primary-500 transition-all duration-300 group-hover:h-full group-focus:h-full" />

                                    <div className="w-full flex items-center px-8 md:px-12">
                                        <div className="flex items-center justify-center border-r-2 border-black-pure pr-8 md:pr-12 mr-8 md:mr-12">
                                            <span className="text-xl md:text-2xl font-mono font-black text-black-pure group-hover:text-primary-500 transition-colors">
                                                {route.id}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex items-center justify-between min-w-0">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-mono font-black text-black-pure/40 uppercase tracking-wider group-hover:text-white-pure/40">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <h2 className="text-xl md:text-2xl font-mono font-black uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors truncate">
                                                    {route.label}
                                                </h2>
                                            </div>
                                            <div className="w-10 h-10 bg-white-pure border-2 border-black-pure group-hover:bg-primary-500 group-hover:border-primary-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="text-black-pure transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H7M17 7V17"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        strokeLinecap="square"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="w-full md:w-1/2 h-[400px] md:h-full relative bg-black-pure overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                {isVisible && (
                                    <Hyperspeed
                                        effectOptions={{
                                            distortion: 'turbulentDistortion',
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
                                                shoulderLines: 0x00ff41,
                                                brokenLines: 0x00ff41,
                                                leftCars: [0x00ff41],
                                                rightCars: [0x00ff41],
                                                sticks: 0x00ff41,
                                            },
                                        }}
                                    />
                                )}
                            </div>

                            <div className="relative z-10 h-full w-full flex flex-col justify-end">
                                <div className="grid grid-cols-2 bg-black-pure border-t-2 border-black-pure">
                                    {routes.map((route) => (
                                        <Link
                                            key={`stat-${route.id}`}
                                            href={resolvePath(route)}
                                            className="group p-5 border-r-2 border-b-2 border-black-pure last:border-r-0 flex flex-col gap-3 bg-white-pure hover:bg-black-pure transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary-500 border border-black-pure group-hover:bg-white-pure" />
                                                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black-pure group-hover:text-white-pure">
                                                    {route.label}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-end gap-3">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[8px] font-mono font-black uppercase tracking-wider text-black-pure/50 group-hover:text-white-pure/50">
                                                        {route.path}
                                                    </span>
                                                    <span className="text-sm font-mono font-black uppercase tracking-tighter truncate text-black-pure group-hover:text-white-pure">
                                                        {route.name}
                                                    </span>
                                                </div>
                                                <div className="bg-black-pure text-white-pure px-2 py-0.5 border-2 border-black-pure group-hover:bg-white-pure group-hover:text-black-pure transition-colors">
                                                    <span className="text-[10px] font-mono font-black">
                                                        {route.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <SectionFooter variant={footerVariant} />
                </div>
            </div>
        </section>
    )
}

export default HyperspeedSection