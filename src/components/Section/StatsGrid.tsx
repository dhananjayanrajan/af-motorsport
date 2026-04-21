'use client'

import React, { useEffect, useRef, useState } from 'react'
import SectionScroller from './Scroller'

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

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-primary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} divide-x divide-y divide-black-pure border-l border-black-pure`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={el => { refs.current[index] = el }}
                        className="p-6 md:p-8 lg:p-10 xl:p-14 flex flex-col justify-between bg-white-pure hover:bg-secondary-500/5 transition-all duration-500 group"
                    >
                        <div className="mb-6 md:mb-8 lg:mb-10">
                            <span className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-1 group-hover:text-primary-500 transition-colors duration-300">
                                {item.label}
                            </span>
                            <div className="h-0.5 w-6 md:w-8 bg-neutral-200 group-hover:w-12 md:group-hover:w-16 group-hover:bg-primary-500 transition-all duration-500" />
                        </div>

                        <div>
                            <div className="flex items-baseline gap-1 flex-wrap">
                                <span className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-pure uppercase leading-none">
                                    {countedValues[index] || 0}
                                </span>
                                {item.unit && (
                                    <span className="text-xs md:text-sm font-black text-secondary-500 uppercase ml-1">
                                        {item.unit}
                                    </span>
                                )}
                            </div>

                            {item.description && (
                                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-neutral-500 leading-relaxed max-w-xs">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <SectionScroller items={[title, id, "DATA", "METRICS", "PERFORMANCE"]} variant={1} velocity={28} />
        </section>
    )
}

export default StatsGrid