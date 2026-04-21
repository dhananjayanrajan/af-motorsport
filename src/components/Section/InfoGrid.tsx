'use client'

import React from 'react'
import SectionScroller from './Scroller'

/**
 * Universal Data Item: Represents a single unit of information 
 * extracted from any of the 20+ collection detail fields.
 */
export interface InfoBlock {
    id: string
    label: string        // e.g., "AERODYNAMICS" or "BIOMETRICS"
    title: string        // e.g., "Downforce Level" or "Heart Rate Avg"
    description?: string // Contextual brief
    metadata?: {         // High-density technical key-values
        key: string      // e.g., "Metric"
        value: string    // e.g., "2400kg"
    }[]
    variant?: 'default' | 'highlight' | 'status'
}

interface InfoGridProps {
    id: string           // Section ID for navigation
    title: string        // Section Heading
    blocks: InfoBlock[]  // The mapped data from the collection
    columns?: 2 | 3 | 4  // Responsive grid density
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

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure">
            {/* STICKY HEADER: Standardized across all universal components */}
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            {/* THE GRID: Modular border-collapse simulation using divide-x/y */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols[columns]} divide-x divide-y divide-black-pure border-l border-black-pure`}>
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        className={`p-10 lg:p-14 flex flex-col min-h-[400px] transition-all duration-300 group ${block.variant === 'highlight' ? 'bg-neutral-50' : 'bg-white-pure hover:bg-neutral-50'
                            }`}
                    >
                        {/* IDENTIFIER: Meta-tagging for the specific data point */}
                        <div className="mb-12 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-primary-500 uppercase tracking-[0.2em]">
                                    {block.label}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-300 italic">
                                    DP_{String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            {/* Visual Status Indicator */}
                            {block.variant === 'status' && (
                                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            )}
                        </div>

                        {/* CONTENT: Typography follows the 'Race' font for headings */}
                        <div className="flex-1 flex flex-col justify-start">
                            <h3 className="font-race text-3xl lg:text-5xl text-black-pure uppercase leading-[0.8] tracking-tighter mb-8 group-hover:text-primary-500 transition-colors">
                                {block.title}
                            </h3>
                            {block.description && (
                                <p className="text-[13px] font-medium text-neutral-500 uppercase leading-relaxed max-w-sm">
                                    {block.description}
                                </p>
                            )}
                        </div>

                        {/* METADATA: Flat table-style rows for raw data values */}
                        {block.metadata && block.metadata.length > 0 && (
                            <div className="mt-12 space-y-2">
                                {block.metadata.map((meta, mIdx) => (
                                    <div key={mIdx} className="flex justify-between items-end border-b border-neutral-100 pb-2 group-hover:border-black-pure transition-colors">
                                        <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                                            {meta.key}
                                        </span>
                                        <span className="text-[14px] font-bold text-black-pure uppercase tracking-tighter">
                                            {meta.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* FOOTER: Section-specific scroller data */}
            <div className="z-40 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "SPECIFICATION_GRID_V1", `TOTAL_NODES_${blocks.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default InfoGrid