'use client'

import React, { useEffect, useRef, useState } from 'react'
import SectionScroller from './Scroller'

interface PullQuoteProps {
    id: string
    title: string
    quote: string
    attribution?: string
    role?: string
    variant?: 'center' | 'left'
}

const PullQuote: React.FC<PullQuoteProps> = ({
    id,
    title,
    quote,
    attribution,
    role,
    variant = 'center'
}) => {
    const alignmentClasses = variant === 'center' ? 'text-center items-center' : 'text-left items-start'
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-tertiary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
            </div>

            <div ref={ref} className={`flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-20 lg:py-28 bg-gradient-to-br from-white-pure via-neutral-50 to-white-pure ${alignmentClasses}`}>
                <div className={`relative max-w-5xl transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    <span className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 font-race text-7xl md:text-8xl lg:text-9xl text-primary-500/20 leading-none select-none">
                        "
                    </span>

                    <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-pure uppercase leading-[1.1] md:leading-[1.15] mb-8 md:mb-10 lg:mb-12 tracking-tighter hover:tracking-tight transition-all duration-500">
                        {quote}
                    </h2>

                    {(attribution || role) && (
                        <div className={`flex flex-col gap-1 ${variant === 'center' ? 'items-center' : 'items-start'} mt-6 md:mt-8`}>
                            <div className="h-0.5 w-10 md:w-12 bg-primary-500 mb-3 md:mb-4" />
                            {attribution && (
                                <p className="text-sm md:text-base font-black text-black-pure uppercase tracking-wider">
                                    {attribution}
                                </p>
                            )}
                            {role && (
                                <p className="text-[9px] md:text-[10px] font-black text-secondary-500 uppercase tracking-tight">
                                    {role}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <SectionScroller items={[title, id, "VOICE", "PERSPECTIVE", "VISION"]} variant={5} velocity={30} />
        </section>
    )
}

export default PullQuote