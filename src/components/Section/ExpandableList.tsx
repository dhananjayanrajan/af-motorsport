'use client'

import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

export interface ExpandablePanel {
    id: string
    title: string
    label: string
    summary: string
    content: React.ReactNode | string
    metadata?: { label: string; value: string }[]
}

interface ExpandableListProps {
    id: string
    title: string
    panels: ExpandablePanel[]
}

const ExpandableList: React.FC<ExpandableListProps> = ({ id, title, panels }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const togglePanel = (panelId: string) => {
        setExpandedId(expandedId === panelId ? null : panelId)
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-tertiary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {panels.length} SECTIONS
                </div>
            </div>

            <div className="flex flex-col">
                {panels.map((panel, index) => {
                    const isExpanded = expandedId === panel.id

                    return (
                        <div key={panel.id} className="relative border-b border-black-pure last:border-b-0">
                            <div className={`sticky top-16 z-30 flex flex-col md:flex-row items-stretch min-h-[100px] md:min-h-[120px] bg-white-pure transition-all duration-500 ${isExpanded ? 'bg-secondary-500/5' : 'hover:bg-neutral-50'}`}>
                                <div className="w-16 md:w-20 lg:w-24 border-r border-black-pure flex items-center justify-center bg-white-pure">
                                    <span className="font-mono text-[9px] md:text-[10px] font-black text-neutral-400 -rotate-90 whitespace-nowrap">
                                        {(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>

                                <button
                                    onClick={() => togglePanel(panel.id)}
                                    className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 flex flex-col md:flex-row md:items-center justify-between text-left group"
                                >
                                    <div className="flex flex-col gap-1 md:gap-2 flex-1">
                                        <span className="text-[8px] md:text-[9px] font-black text-primary-500 uppercase tracking-wider">
                                            {panel.label}
                                        </span>
                                        <h3 className="font-race text-xl md:text-2xl lg:text-3xl xl:text-4xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                            {panel.title}
                                        </h3>
                                        <p className="text-[10px] md:text-xs text-neutral-500 font-medium uppercase max-w-xl mt-1">
                                            {panel.summary}
                                        </p>
                                    </div>

                                    <div className="mt-4 md:mt-0 flex items-center gap-3 md:gap-4">
                                        <div className={`text-[9px] md:text-[10px] font-black uppercase transition-all duration-300 ${isExpanded ? 'text-primary-500' : 'text-neutral-400'}`}>
                                            {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                                        </div>
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black-pure flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-180 bg-primary-500 border-primary-500' : 'group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-black-pure border-t border-black-pure">
                                    <div className="flex-1 p-6 md:p-8 lg:p-10 xl:p-12">
                                        <div className="text-xs md:text-sm font-medium uppercase leading-relaxed tracking-wide text-neutral-600 space-y-4">
                                            {typeof panel.content === 'string' ? (
                                                <p>{panel.content}</p>
                                            ) : (
                                                panel.content
                                            )}
                                        </div>
                                    </div>

                                    {panel.metadata && panel.metadata.length > 0 && (
                                        <div className="w-full lg:w-80 xl:w-96 p-6 md:p-8 lg:p-10 bg-gradient-to-br from-neutral-50 to-white-pure flex flex-col gap-6 md:gap-8">
                                            <span className="text-[9px] md:text-[10px] font-black text-black-pure uppercase tracking-wider border-b-2 border-primary-500 pb-2">
                                                SPECIFICATIONS
                                            </span>
                                            <div className="space-y-4 md:space-y-5">
                                                {panel.metadata.map((meta, mIdx) => (
                                                    <div key={mIdx} className="group/metadata">
                                                        <p className="text-[8px] md:text-[9px] font-black text-neutral-400 uppercase mb-1 tracking-wider">{meta.label}</p>
                                                        <p className="text-[10px] md:text-xs font-black text-black-pure uppercase group-hover/metadata:text-primary-500 transition-colors duration-300">{meta.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionScroller items={[title, id, "DETAILS", "SPECS", "INFO"]} variant={4} velocity={30} />
        </section>
    )
}

export default ExpandableList