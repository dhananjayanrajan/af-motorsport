'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex flex-col">
                {panels.map((panel, index) => {
                    const isExpanded = expandedId === panel.id

                    return (
                        <div
                            key={panel.id}
                            className="relative border-b border-black-pure last:border-b-0"
                        >
                            <div
                                className={`sticky top-16 z-30 flex flex-col md:flex-row items-stretch min-h-[120px] bg-white-pure transition-colors duration-500 ${isExpanded ? 'bg-neutral-50' : 'hover:bg-neutral-50'}`}
                            >
                                <div className="w-16 md:w-24 border-r border-black-pure flex items-center justify-center">
                                    <span className="font-mono text-[10px] font-bold text-neutral-300 -rotate-90 whitespace-nowrap">
                                        REF_{String(index + 1).padStart(3, '0')}
                                    </span>
                                </div>

                                <button
                                    onClick={() => togglePanel(panel.id)}
                                    className="flex-1 px-8 py-10 flex flex-col md:flex-row md:items-center justify-between text-left group"
                                >
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[9px] font-bold text-primary-500 uppercase tracking-widest">
                                            {panel.label}
                                        </span>
                                        <h3 className="font-race text-3xl md:text-4xl text-black-pure uppercase leading-none">
                                            {panel.title}
                                        </h3>
                                        <p className="text-[11px] text-neutral-500 font-medium uppercase max-w-xl">
                                            {panel.summary}
                                        </p>
                                    </div>

                                    <div className="mt-6 md:mt-0 flex items-center gap-4">
                                        <div className="h-8 w-[1px] bg-neutral-200 hidden md:block" />
                                        <div className={`text-[10px] font-bold uppercase transition-all duration-300 ${isExpanded ? 'text-primary-500 pr-4' : 'text-black-pure'}`}>
                                            {isExpanded ? 'Collapse' : 'Expand Details'}
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-700 ease-in-out bg-white-pure ${isExpanded ? 'max-h-[2000px] opacity-100 border-t border-black-pure' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-black-pure">
                                    <div className="flex-1 p-10 lg:p-20">
                                        <div className="prose prose-neutral max-w-4xl text-[14px] uppercase font-medium leading-relaxed tracking-tight text-neutral-600">
                                            {typeof panel.content === 'string' ? (
                                                <p>{panel.content}</p>
                                            ) : (
                                                panel.content
                                            )}
                                        </div>
                                    </div>

                                    {panel.metadata && (
                                        <div className="w-full lg:w-96 p-10 lg:p-12 bg-neutral-50 flex flex-col gap-8">
                                            <span className="text-[10px] font-bold text-black-pure uppercase tracking-widest border-b border-black-pure pb-2">
                                                Technical Params
                                            </span>
                                            <div className="space-y-6">
                                                {panel.metadata.map((meta, mIdx) => (
                                                    <div key={mIdx}>
                                                        <p className="text-[9px] font-bold text-neutral-400 uppercase mb-1">{meta.label}</p>
                                                        <p className="text-[12px] font-bold text-black-pure uppercase">{meta.value}</p>
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

            <div className="z-40 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "INDEX_STACK_ACTIVE"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default ExpandableList