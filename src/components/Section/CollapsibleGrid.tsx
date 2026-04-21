'use client'

import React, { useState } from 'react'
import SectionScroller from './Scroller'

export interface CollapsibleItem {
    id: string
    title: string
    subtitle?: string
    content: React.ReactNode | string
    label?: string
}

interface CollapsibleGridProps {
    id: string
    title: string
    items: CollapsibleItem[]
    columns?: 1 | 2
}

const CollapsibleGrid: React.FC<CollapsibleGridProps> = ({ id, title, items, columns = 2 }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const gridCols = columns === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'

    return (
        <section className="relative w-full min-h-[40vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className={`grid ${gridCols} divide-x divide-y divide-black-pure border-l border-t border-black-pure`}>
                {items.map((item, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div
                            key={index}
                            className={`flex flex-col transition-colors duration-300 ${isOpen ? 'bg-neutral-50' : 'bg-white-pure hover:bg-neutral-50'}`}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full p-8 lg:p-12 flex items-center justify-between group text-left"
                            >
                                <div className="flex flex-col gap-1">
                                    {item.label && (
                                        <span className="text-[9px] font-bold text-primary-500 uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    )}
                                    <h3 className="font-race text-2xl lg:text-3xl text-black-pure uppercase leading-none">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center border border-black-pure rounded-full transition-transform duration-500 overflow-hidden">
                                    <div className={`absolute w-4 h-[2px] bg-black-pure transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                                    <div className={`absolute h-4 w-[2px] bg-black-pure transition-transform duration-500 ${isOpen ? 'rotate-90 opacity-0' : ''}`} />
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-8 lg:px-12 pb-12">
                                    <div className="h-[1px] w-full bg-neutral-200 mb-8" />
                                    <div className="text-[13px] text-neutral-600 leading-relaxed font-medium uppercase tracking-tight">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-auto z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, `${items.length} ENTRIES`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default CollapsibleGrid