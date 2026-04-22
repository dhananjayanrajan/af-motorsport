'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={el => { refs.current[index] = el }}
                        className="p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white-pure hover:bg-neutral-50 transition-colors duration-300 group relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2 group-hover:text-primary-500 transition-colors">
                                {item.label}
                            </span>
                            <div className="h-1.5 w-8 bg-black-pure group-hover:w-24 group-hover:bg-primary-500 transition-all duration-500" />
                        </div>

                        <div className="mt-12 relative z-10">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="font-bold text-5xl md:text-6xl lg:text-7xl text-black-pure uppercase leading-none tracking-tighter">
                                    {countedValues[index] || 0}
                                </span>
                                {item.unit && (
                                    <span className="text-sm md:text-base font-black text-primary-500 uppercase italic">
                                        {item.unit}
                                    </span>
                                )}
                            </div>

                            {item.description && (
                                <p className="mt-6 text-[11px] font-mono font-black text-neutral-500 uppercase leading-tight max-w-[240px]">
                                    {item.description}
                                </p>
                            )}
                        </div>

                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 border-t-2 border-r-2 border-black-pure" />
                        </div>
                    </div>
                ))}
            </div>

            <SectionCTA
                label="Explore Comprehensive Data"
                path={`/analytics/${id}`}
                variant={3}
                proceedLabel="ANALYTICS_NODE"
            />
        </section>
    )
}

export default StatsGrid