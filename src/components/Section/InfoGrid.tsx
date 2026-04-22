'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={2}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                    SYSTEM_REGISTRY // {blocks.length.toString().padStart(3, '0')}_RECORDS_FOUND
                </span>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols[columns]} divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure`}>
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        ref={el => { blockRefs.current[index] = el }}
                        className={`p-8 md:p-12 lg:p-16 flex flex-col min-h-[400px] md:min-h-[450px] transition-all duration-700 ease-out transform ${visibleBlocks.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                            } ${block.variant === 'highlight' ? 'bg-primary-500' : 'bg-white-pure hover:bg-neutral-50'}`}
                    >
                        <div className="mb-12 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${block.variant === 'highlight' ? 'text-black-pure' : 'text-primary-500'
                                    }`}>
                                    {block.label}
                                </span>
                                <span className="font-mono text-[10px] font-black text-black-pure/30">
                                    DATA_NODE_{(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            {block.variant === 'status' && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-black-pure border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                    <div className="w-2 h-2 bg-green-500 animate-pulse" />
                                    <span className="font-mono text-[8px] font-black text-white-pure uppercase">LIVE_METRIC</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black-pure uppercase leading-[0.9] tracking-tighter mb-6 italic">
                                {block.title}
                            </h3>
                            {block.description && (
                                <p className="font-mono text-[11px] font-black text-neutral-500 uppercase leading-tight max-w-sm">
                                    {block.description}
                                </p>
                            )}
                        </div>

                        {block.metadata && block.metadata.length > 0 && (
                            <div className="mt-12 grid gap-2">
                                {block.metadata.map((meta, mIdx) => (
                                    <div key={mIdx} className="flex justify-between items-center border-b-2 border-black-pure/10 pb-2">
                                        <span className="font-mono text-[9px] font-black text-black-pure/40 uppercase">
                                            {meta.key}
                                        </span>
                                        <span className="text-xs font-black text-black-pure uppercase italic">
                                            {meta.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <SectionCTA
                label="Full Archive"
                path={`/registry/${id}`}
                variant={1}
                infoLabel="ACCESS_DATABASE"
                directoryLabel="INFO_GRID_V1"
            />

            <SectionFooter variant={3} />
        </section>
    )
}

export default InfoGrid