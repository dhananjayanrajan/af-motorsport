'use client'

import React from 'react'
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

    return (
        <section className="relative w-full min-h-[50vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols[columns]} divide-x divide-y divide-black-pure border-l border-t border-black-pure`}>
                {items.map((item, index) => (
                    <div key={index} className="p-10 lg:p-14 flex flex-col justify-between bg-white-pure hover:bg-neutral-50 transition-colors group">
                        <div className="mb-10">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1 group-hover:text-primary-500 transition-colors">
                                {item.label}
                            </span>
                            <div className="h-[1px] w-8 bg-neutral-200 group-hover:w-12 group-hover:bg-black-pure transition-all" />
                        </div>

                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="font-race text-4xl lg:text-6xl text-black-pure uppercase leading-none">
                                    {item.value}
                                </span>
                                {item.unit && (
                                    <span className="text-xs font-bold text-neutral-400 uppercase">
                                        {item.unit}
                                    </span>
                                )}
                            </div>

                            {item.description && (
                                <p className="mt-4 text-[11px] text-neutral-500 leading-relaxed max-w-[240px]">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, `${items.length} DATAPOINTS`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default StatsGrid