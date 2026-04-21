'use client'

import { Minus, Plus } from 'lucide-react'
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
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-primary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {items.length} ITEMS
                </div>
            </div>

            <div className={`grid ${gridCols} divide-x divide-y divide-black-pure border-l border-black-pure`}>
                {items.map((item, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div
                            key={index}
                            className={`flex flex-col transition-all duration-500 ${isOpen ? 'bg-secondary-500/5' : 'bg-white-pure hover:bg-neutral-50'}`}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full p-4 md:p-6 lg:p-8 flex items-center justify-between group text-left"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    {item.label && (
                                        <span className="text-[8px] md:text-[9px] font-black text-tertiary-500 uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    )}
                                    <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[9px] md:text-[10px] text-neutral-400 font-black uppercase mt-1">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black-pure flex items-center justify-center transition-all duration-500 ml-4 shrink-0 ${isOpen ? 'bg-primary-500 border-primary-500' : 'group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                                    {isOpen ? (
                                        <Minus className="w-4 h-4 md:w-5 md:h-5" />
                                    ) : (
                                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                    )}
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-4 md:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-10">
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-black-pure to-transparent mb-6 md:mb-8" />
                                    <div className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium uppercase tracking-wide">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionScroller items={[title, id, "FEATURES", "CONTENT", "DETAILS"]} variant={5} velocity={28} />
        </section>
    )
}

export default CollapsibleGrid