'use client'

import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center justify-between">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                    CONTENT_ARRAY // {items.length.toString().padStart(2, '0')}_NODES_REGISTERED
                </span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 animate-pulse" />
                    <span className="font-mono text-[9px] font-black text-primary-500 uppercase italic">SYSTEM_READY</span>
                </div>
            </div>

            <div className={`grid ${gridCols} divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure`}>
                {items.map((item, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div
                            key={item.id}
                            className={`flex flex-col transition-all duration-300 ${isOpen ? 'bg-primary-500' : 'bg-white-pure hover:bg-neutral-50'}`}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full p-8 md:p-12 lg:p-16 flex items-start justify-between group text-left"
                            >
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono text-xs font-black transition-colors ${isOpen ? 'text-black-pure' : 'text-primary-500'}`}>
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        {item.label && (
                                            <span className={`font-mono text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black-pure shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${isOpen ? 'bg-black-pure text-white-pure' : 'bg-white-pure text-black-pure'}`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-3xl md:text-4xl uppercase leading-[0.9] tracking-tighter italic text-black-pure mt-4">
                                        {item.title}
                                    </h3>

                                    {item.subtitle && (
                                        <p className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${isOpen ? 'text-black-pure/70' : 'text-neutral-400'}`}>
                                            // {item.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className={`w-14 h-14 border-2 border-black-pure flex items-center justify-center transition-all duration-500 ml-6 shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isOpen ? 'bg-black-pure text-white-pure rotate-180 shadow-none translate-x-1 translate-y-1' : 'bg-white-pure text-black-pure group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                                    {isOpen ? (
                                        <Minus className="w-6 h-6" />
                                    ) : (
                                        <Plus className="w-6 h-6" />
                                    )}
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-8 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                                    <div className="border-t-2 border-black-pure/20 pt-8">
                                        <div className="font-mono text-xs md:text-sm font-black uppercase leading-relaxed tracking-tight text-black-pure max-w-2xl">
                                            {item.content}
                                        </div>
                                        <div className="mt-8 flex gap-1.5">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="w-6 h-1 bg-black-pure/10" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionFooter variant={2} />
        </section>
    )
}

export default CollapsibleGrid