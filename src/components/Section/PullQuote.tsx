"use client"
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
        <section className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={1} />

                <div
                    ref={ref}
                    className={`flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-32 lg:py-40 bg-card rounded-lg border border-border shadow-sm mt-12 ${isCenter ? 'items-center text-center' : 'items-start text-left'
                        }`}
                >
                    <div className={`relative max-w-6xl transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>
                        <div className={`flex gap-2 mb-8 ${isCenter ? 'justify-center' : 'justify-start'}`}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-primary rounded-sm" />
                            ))}
                        </div>

                        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground uppercase leading-[0.95] tracking-tighter italic">
                            "{quote}"
                        </h2>

                        {(attribution || role) && (
                            <div className={`mt-12 md:mt-16 flex flex-col ${isCenter ? 'items-center' : 'items-start'}`}>
                                <div className="h-1 w-16 bg-foreground mb-6 rounded-full" />

                                {attribution && (
                                    <p className="text-lg md:text-xl font-bold text-foreground uppercase tracking-wider">
                                        {attribution}
                                    </p>
                                )}

                                {role && (
                                    <p className="font-mono text-sm md:text-base font-semibold text-primary uppercase tracking-wider mt-2">
                                        {role}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <SectionCTA
                        label="Read Full Interview"
                        path={`/archive/${id}`}
                        variant={2}
                        buttonBgColor="bg-foreground"
                        buttonTextColor="text-background"
                    />
                </div>
            </div>
        </section>
    )
}

export default PullQuote