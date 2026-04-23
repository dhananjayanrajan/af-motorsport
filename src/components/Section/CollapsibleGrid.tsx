"use client"
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
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={3} />

                <div className="mt-8 mb-12 flex h-12 bg-foreground border-b border-border px-6 items-center justify-between rounded-t-lg">
                    <span className="font-mono text-sm font-semibold text-background uppercase tracking-wider">
                        Content Array // {items.length.toString().padStart(2, '0')} Nodes Registered
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                        <span className="font-mono text-sm font-semibold text-primary uppercase italic">System Ready</span>
                    </div>
                </div>

                <div className={`grid ${gridCols} gap-8`}>
                    {items.map((item, index) => {
                        const isOpen = openIndex === index

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col transition-all duration-300 rounded-lg overflow-hidden border border-border ${isOpen ? 'bg-primary' : 'bg-card hover:bg-accent/50'
                                    }`}
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full p-8 md:p-12 lg:p-16 flex items-start justify-between group text-left"
                                >
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className={`font-mono text-sm font-semibold transition-colors ${isOpen ? 'text-primary-foreground' : 'text-primary'
                                                }`}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                            {item.label && (
                                                <span className={`font-mono text-sm font-semibold uppercase tracking-wider px-3 py-1 border-2 border-foreground shadow-sm rounded-md ${isOpen ? 'bg-foreground text-background' : 'bg-card text-foreground'
                                                    }`}>
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-3xl md:text-4xl uppercase leading-[0.9] tracking-tighter italic text-foreground mt-4">
                                            {item.title}
                                        </h3>

                                        {item.subtitle && (
                                            <p className={`font-mono text-sm font-semibold uppercase tracking-[0.2em] mt-2 ${isOpen ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                                }`}>
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className={`w-14 h-14 border-2 border-foreground flex items-center justify-center transition-all duration-500 ml-6 shrink-0 shadow-sm rounded-full ${isOpen
                                            ? 'bg-foreground text-background rotate-180 shadow-none translate-x-1 translate-y-1'
                                            : 'bg-card text-foreground group-hover:bg-foreground group-hover:text-background'
                                        }`}>
                                        {isOpen ? (
                                            <Minus className="w-6 h-6" />
                                        ) : (
                                            <Plus className="w-6 h-6" />
                                        )}
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-8 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                                        <div className="border-t-2 border-foreground/20 pt-8">
                                            <div className="font-mono text-sm md:text-base font-semibold uppercase leading-relaxed tracking-tight text-foreground max-w-2xl">
                                                {item.content}
                                            </div>

                                            <div className="mt-8 flex gap-1.5">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="w-6 h-1 bg-foreground/10 rounded-sm" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16">
                    <SectionFooter variant={2} />
                </div>
            </div>
        </section>
    )
}

export default CollapsibleGrid