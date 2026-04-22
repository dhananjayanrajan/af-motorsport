'use client'

import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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

    if (!panels || panels.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={1}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center justify-between">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                    TECHNICAL_DIRECTIVES // {panels.length.toString().padStart(2, '0')}_NODES_ACTIVE
                </span>
                <span className="font-mono text-[10px] font-black text-primary-500 uppercase italic">
                    SYSTEM_ID: {id.toUpperCase()}
                </span>
            </div>

            <div className="flex flex-col">
                {panels.map((panel, index) => {
                    const isExpanded = expandedId === panel.id

                    return (
                        <div key={panel.id} className="relative border-b-2 border-black-pure last:border-b-0">
                            <div className={`flex flex-col md:flex-row items-stretch min-h-[120px] transition-all duration-300 ${isExpanded ? 'bg-primary-500' : 'bg-white-pure hover:bg-neutral-50'}`}>
                                <div className={`w-16 md:w-24 border-r-2 border-black-pure flex items-center justify-center transition-colors ${isExpanded ? 'bg-black-pure' : 'bg-white-pure'}`}>
                                    <span className={`font-mono text-xs font-black -rotate-90 whitespace-nowrap ${isExpanded ? 'text-primary-500' : 'text-black-pure'}`}>
                                        {(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>

                                <button
                                    onClick={() => togglePanel(panel.id)}
                                    className="flex-1 px-8 py-8 flex flex-col md:flex-row md:items-center justify-between text-left group"
                                >
                                    <div className="flex flex-col gap-2 flex-1">
                                        <span className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] ${isExpanded ? 'text-black-pure' : 'text-primary-500'}`}>
                                            {panel.label}
                                        </span>
                                        <h3 className={`font-bold text-2xl md:text-3xl xl:text-4xl uppercase leading-none tracking-tighter italic ${isExpanded ? 'text-black-pure' : 'text-black-pure'}`}>
                                            {panel.title}
                                        </h3>
                                        <p className={`font-mono text-[10px] font-black uppercase leading-tight max-w-xl ${isExpanded ? 'text-black-pure/70' : 'text-neutral-400'}`}>
                                            {panel.summary}
                                        </p>
                                    </div>

                                    <div className="mt-6 md:mt-0 flex items-center gap-6">
                                        <div className={`font-mono text-[10px] font-black uppercase tracking-widest ${isExpanded ? 'text-black-pure underline' : 'text-black-pure/40'}`}>
                                            {isExpanded ? 'CLOSE_STREAM' : 'OPEN_STREAM'}
                                        </div>
                                        <div className={`w-12 h-12 border-2 border-black-pure flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-180 bg-black-pure text-white-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white-pure text-black-pure group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                                            <ChevronDown className="w-6 h-6" />
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure border-t-2 border-black-pure">
                                    <div className="flex-1 p-8 md:p-12 lg:p-16 bg-white-pure">
                                        <div className="font-mono text-xs md:text-sm font-black uppercase leading-relaxed text-black-pure space-y-6">
                                            {typeof panel.content === 'string' ? (
                                                <p className="max-w-3xl">{panel.content}</p>
                                            ) : (
                                                panel.content
                                            )}
                                        </div>
                                        <div className="mt-12 flex gap-1">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 bg-primary-500 border border-black-pure" />
                                            ))}
                                        </div>
                                    </div>

                                    {panel.metadata && panel.metadata.length > 0 && (
                                        <div className="w-full lg:w-96 p-8 md:p-12 bg-neutral-50 flex flex-col gap-10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-black-pure rotate-45" />
                                                <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-widest">
                                                    SPEC_ARRAY_V1
                                                </span>
                                            </div>
                                            <div className="space-y-6">
                                                {panel.metadata.map((meta, mIdx) => (
                                                    <div key={mIdx} className="flex flex-col gap-1 border-b-2 border-black-pure/10 pb-4">
                                                        <p className="font-mono text-[9px] font-black text-black-pure/40 uppercase tracking-widest">{meta.label}</p>
                                                        <p className="text-sm font-black text-black-pure uppercase italic">{meta.value}</p>
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

            <SectionFooter variant={2} />
        </section>
    )
}

export default ExpandableList