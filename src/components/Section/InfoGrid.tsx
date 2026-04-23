"use client"
import React, { useEffect, useRef, useState } from 'react'
import SectionCTA from './CTA'
import SectionFooter from './Footer'
import SectionHeader from './Header'

export interface InfoBlock {
    id: string
    label: string
    title: string
    description?: string
    metadata?: { key: string; value: string }[]
    variant?: 'default' | 'highlight' | 'status'
}

interface InfoGridProps {
    id: string
    title: string
    blocks: InfoBlock[]
    columns?: 2 | 3 | 4
}

const InfoGrid: React.FC<InfoGridProps> = ({
    id,
    title,
    blocks,
    columns = 3
}) => {
    const gridCols = {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4'
    }

    const [visibleBlocks, setVisibleBlocks] = useState<Set<number>>(new Set())
    const blockRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'))
                        setVisibleBlocks(prev => new Set(prev).add(index))
                    }
                })
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        blockRefs.current.forEach((ref, idx) => {
            if (ref) {
                ref.setAttribute('data-index', String(idx))
                observer.observe(ref)
            }
        })

        return () => observer.disconnect()
    }, [blocks])

    if (!blocks || blocks.length === 0) return null

    return (
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={2} />

                <div className="mt-8 mb-12 flex items-center">
                    <span className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {blocks.length} Records Found
                    </span>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols[columns]} gap-8`}>
                    {blocks.map((block, index) => (
                        <div
                            key={block.id}
                            ref={el => { blockRefs.current[index] = el }}
                            className={`p-8 md:p-12 lg:p-16 flex flex-col min-h-[400px] md:min-h-[450px] transition-all duration-700 ease-out transform rounded-lg border border-border shadow-sm hover:shadow-md ${visibleBlocks.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                                } ${block.variant === 'highlight'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card hover:bg-accent/50'
                                }`}
                        >
                            <div className="mb-12 flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className={`text-sm font-semibold uppercase tracking-wider ${block.variant === 'highlight' ? 'text-primary-foreground' : 'text-primary'
                                        }`}>
                                        {block.label}
                                    </span>
                                    <span className="font-mono text-sm font-semibold text-muted-foreground/50">
                                        Item {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>

                                {block.variant === 'status' && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-foreground border border-foreground shadow-sm rounded-full">
                                        <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                                        <span className="font-mono text-xs font-semibold text-background uppercase">Active</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className={`font-bold text-3xl md:text-4xl lg:text-5xl uppercase leading-[0.9] tracking-tighter mb-6 italic ${block.variant === 'highlight' ? 'text-primary-foreground' : 'text-foreground'
                                    }`}>
                                    {block.title}
                                </h3>

                                {block.description && (
                                    <p className={`font-mono text-base font-medium uppercase leading-relaxed max-w-sm ${block.variant === 'highlight' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                        }`}>
                                        {block.description}
                                    </p>
                                )}
                            </div>

                            {block.metadata && block.metadata.length > 0 && (
                                <div className="mt-12 grid gap-2">
                                    {block.metadata.map((meta, mIdx) => (
                                        <div key={mIdx} className="flex justify-between items-center border-b border-border/50 pb-2">
                                            <span className={`font-mono text-sm font-semibold uppercase ${block.variant === 'highlight' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                                                }`}>
                                                {meta.key}
                                            </span>
                                            <span className={`text-base font-semibold uppercase italic ${block.variant === 'highlight' ? 'text-primary-foreground' : 'text-foreground'
                                                }`}>
                                                {meta.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="Full Archive"
                        path={`/registry/${id}`}
                        variant={1}
                        infoLabel="Access Database"
                        directoryLabel="Info Grid"
                    />
                </div>

                <div className="mt-16">
                    <SectionFooter variant={3} />
                </div>
            </div>
        </section>
    )
}

export default InfoGrid