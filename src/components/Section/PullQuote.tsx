'use client'

import React, { useEffect, useRef, useState } from 'react'
import SectionCTA from './CTA'
import SectionHeader from './Header'

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
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    const isCenter = variant === 'center'

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={1}
            />

            <div
                ref={ref}
                className={`flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-white-pure border-b-2 border-black-pure ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}
            >
                <div className={`relative max-w-6xl transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                    <div className={`flex gap-1 mb-8 ${isCenter ? 'justify-center' : 'justify-start'}`}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-primary-500 border border-black-pure" />
                        ))}
                    </div>

                    <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black-pure uppercase leading-[0.95] tracking-tighter italic">
                        "{quote}"
                    </h2>

                    {(attribution || role) && (
                        <div className={`mt-12 md:mt-16 flex flex-col ${isCenter ? 'items-center' : 'items-start'}`}>
                            <div className="h-2 w-16 bg-black-pure mb-6" />
                            {attribution && (
                                <p className="text-lg md:text-xl font-black text-black-pure uppercase tracking-widest">
                                    {attribution}
                                </p>
                            )}
                            {role && (
                                <p className="font-mono text-[10px] md:text-xs font-black text-primary-500 uppercase tracking-widest mt-1">
                                    // {role}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <SectionCTA
                label="Read Full Interview"
                path={`/archive/${id}`}
                variant={2}
                buttonBgColor="bg-black-pure"
                buttonTextColor="text-white-pure"
            />
        </section>
    )
}

export default PullQuote