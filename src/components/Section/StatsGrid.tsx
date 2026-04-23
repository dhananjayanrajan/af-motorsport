"use client"
import React, { useEffect, useRef, useState } from 'react'
import SectionCTA from './CTA'
import SectionHeader from './Header'

export interface StatItem {
    label: string
    value: string | number
    unit?: string
    description?: string
}

interface StatsGridProps {
    id: string
    title: string
    items: StatItem[]
    columns?: 2 | 3 | 4
}

const StatsGrid: React.FC<StatsGridProps> = ({ id, title, items, columns = 4 }) => {
    const gridCols = {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4'
    }

    const [countedValues, setCountedValues] = useState<(number | string)[]>(items.map(() => 0))
    const refs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'))
                        const targetValue = items[index].value
                        const numericValue = typeof targetValue === 'number' ? targetValue : parseInt(String(targetValue)) || 0

                        if (numericValue > 0) {
                            let start = 0
                            const duration = 1500
                            const stepTime = 16
                            const steps = duration / stepTime
                            const increment = numericValue / steps

                            const timer = setInterval(() => {
                                start += increment
                                if (start >= numericValue) {
                                    setCountedValues(prev => {
                                        const newVals = [...prev]
                                        newVals[index] = targetValue
                                        return newVals
                                    })
                                    clearInterval(timer)
                                } else {
                                    setCountedValues(prev => {
                                        const newVals = [...prev]
                                        newVals[index] = Math.floor(start)
                                        return newVals
                                    })
                                }
                            }, stepTime)
                        } else {
                            setCountedValues(prev => {
                                const newVals = [...prev]
                                newVals[index] = targetValue
                                return newVals
                            })
                        }
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.3 }
        )

        refs.current.forEach((ref, idx) => {
            if (ref) {
                ref.setAttribute('data-index', String(idx))
                observer.observe(ref)
            }
        })

        return () => observer.disconnect()
    }, [items])

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={3} />

                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} gap-8 mt-12`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            ref={el => { refs.current[index] = el }}
                            className="p-8 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2 group-hover:text-primary transition-colors">
                                    {item.label}
                                </span>
                                <div className="h-1 w-12 bg-border group-hover:w-24 group-hover:bg-primary transition-all duration-500 rounded-full" />
                            </div>

                            <div className="mt-8 relative z-10">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-none tracking-tight">
                                        {countedValues[index] || 0}
                                    </span>
                                    {item.unit && (
                                        <span className="text-base font-semibold text-primary uppercase">
                                            {item.unit}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="mt-4 text-base font-medium text-muted-foreground leading-relaxed max-w-xs">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="Explore Comprehensive Data"
                        path={`/analytics/${id}`}
                        variant={3}
                        proceedLabel="View Analytics"
                    />
                </div>
            </div>
        </section>
    )
}

export default StatsGrid