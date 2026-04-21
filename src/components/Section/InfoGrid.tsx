'use client'

import React, { useEffect, useRef, useState } from 'react'
import SectionScroller from './Scroller'

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
    }, [])

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-secondary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {blocks.length} RECORDS
                </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols[columns]} divide-x divide-y divide-black-pure border-l border-black-pure`}>
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        ref={el => { blockRefs.current[index] = el }}
                        className={`p-6 md:p-8 lg:p-10 xl:p-14 flex flex-col min-h-[350px] md:min-h-[400px] transition-all duration-700 transform ${visibleBlocks.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            } ${block.variant === 'highlight' ? 'bg-secondary-500/10' : 'bg-white-pure hover:bg-neutral-50'
                            }`}
                    >
                        <div className="mb-8 md:mb-12 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] md:text-[10px] font-black text-primary-500 uppercase tracking-[0.15em]">
                                    {block.label}
                                </span>
                                <span className="text-[8px] md:text-[10px] font-mono font-black text-neutral-300">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            {block.variant === 'status' && (
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                            )}
                        </div>

                        <div className="flex-1 flex flex-col justify-start">
                            <h3 className="font-race text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black-pure uppercase leading-[0.85] tracking-tighter mb-4 md:mb-6 lg:mb-8 group-hover:text-primary-500 transition-colors duration-300">
                                {block.title}
                            </h3>
                            {block.description && (
                                <p className="text-xs md:text-sm font-medium text-neutral-500 uppercase leading-relaxed max-w-sm">
                                    {block.description}
                                </p>
                            )}
                        </div>

                        {block.metadata && block.metadata.length > 0 && (
                            <div className="mt-8 md:mt-10 lg:mt-12 space-y-2">
                                {block.metadata.map((meta, mIdx) => (
                                    <div key={mIdx} className="flex justify-between items-end border-b border-neutral-100 pb-2 group-hover:border-primary-500 transition-colors duration-300">
                                        <span className="text-[7px] md:text-[8px] font-black text-neutral-400 uppercase tracking-wider">
                                            {meta.key}
                                        </span>
                                        <span className="text-xs md:text-sm font-black text-black-pure uppercase tracking-tighter">
                                            {meta.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <SectionScroller items={[title, id, "ANALYSIS", "METRICS", "INSIGHTS"]} variant={4} velocity={35} />
        </section>
    )
}

export default InfoGrid