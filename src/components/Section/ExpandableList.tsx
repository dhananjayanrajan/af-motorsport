"use client"
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
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={1} />

                <div className="mt-8 mb-12 flex h-12 bg-foreground border-b border-border px-6 items-center justify-between rounded-t-lg">
                    <span className="font-mono text-sm font-semibold text-background uppercase tracking-wider">
                        Technical Directives // {panels.length.toString().padStart(2, '0')} Nodes Active
                    </span>
                    <span className="font-mono text-sm font-semibold text-primary uppercase italic">
                        System ID: {id.toUpperCase()}
                    </span>
                </div>

                <div className="flex flex-col">
                    {panels.map((panel, index) => {
                        const isExpanded = expandedId === panel.id

                        return (
                            <div key={panel.id} className="relative border-b border-border last:border-b-0">
                                <div className={`flex flex-col md:flex-row items-stretch min-h-[120px] transition-all duration-300 rounded-lg overflow-hidden ${isExpanded ? 'bg-primary' : 'bg-card hover:bg-accent/50'
                                    }`}>
                                    <div className={`w-16 md:w-24 border-r border-border flex items-center justify-center transition-colors ${isExpanded ? 'bg-foreground' : 'bg-card'
                                        }`}>
                                        <span className={`font-mono text-sm font-semibold -rotate-90 whitespace-nowrap ${isExpanded ? 'text-primary' : 'text-foreground'
                                            }`}>
                                            {(index + 1).toString().padStart(3, '0')}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => togglePanel(panel.id)}
                                        className="flex-1 px-8 py-8 flex flex-col md:flex-row md:items-center justify-between text-left group"
                                    >
                                        <div className="flex flex-col gap-2 flex-1">
                                            <span className={`font-mono text-sm font-semibold uppercase tracking-[0.2em] ${isExpanded ? 'text-primary-foreground' : 'text-primary'
                                                }`}>
                                                {panel.label}
                                            </span>
                                            <h3 className={`font-bold text-2xl md:text-3xl xl:text-4xl uppercase leading-none tracking-tighter italic ${isExpanded ? 'text-primary-foreground' : 'text-foreground'
                                                }`}>
                                                {panel.title}
                                            </h3>
                                            <p className={`font-mono text-sm font-semibold uppercase leading-tight max-w-xl ${isExpanded ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                                }`}>
                                                {panel.summary}
                                            </p>
                                        </div>

                                        <div className="mt-6 md:mt-0 flex items-center gap-6">
                                            <div className={`font-mono text-sm font-semibold uppercase tracking-wider ${isExpanded ? 'text-primary-foreground underline' : 'text-muted-foreground/60'
                                                }`}>
                                                {isExpanded ? 'Close Stream' : 'Open Stream'}
                                            </div>
                                            <div className={`w-12 h-12 border-2 border-foreground flex items-center justify-center transition-all duration-500 rounded-full ${isExpanded
                                                    ? 'rotate-180 bg-foreground text-background shadow-lg'
                                                    : 'bg-card text-foreground group-hover:bg-foreground group-hover:text-background'
                                                }`}>
                                                <ChevronDown className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-border border-t-2 border-border">
                                        <div className="flex-1 p-8 md:p-12 lg:p-16 bg-card">
                                            <div className="font-mono text-sm md:text-base font-semibold uppercase leading-relaxed text-foreground space-y-6">
                                                {typeof panel.content === 'string' ? (
                                                    <p className="max-w-3xl">{panel.content}</p>
                                                ) : (
                                                    panel.content
                                                )}
                                            </div>

                                            <div className="mt-12 flex gap-1">
                                                {[...Array(6)].map((_, i) => (
                                                    <div key={i} className="w-2 h-2 bg-primary border border-foreground rounded-sm" />
                                                ))}
                                            </div>
                                        </div>

                                        {panel.metadata && panel.metadata.length > 0 && (
                                            <div className="w-full lg:w-96 p-8 md:p-12 bg-muted/30 flex flex-col gap-10">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-foreground rotate-45 rounded-sm" />
                                                    <span className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
                                                        Spec Array V1
                                                    </span>
                                                </div>

                                                <div className="space-y-6">
                                                    {panel.metadata.map((meta, mIdx) => (
                                                        <div key={mIdx} className="flex flex-col gap-1 border-b-2 border-border/10 pb-4">
                                                            <p className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-wider">{meta.label}</p>
                                                            <p className="text-base font-semibold text-foreground uppercase italic">{meta.value}</p>
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

                <div className="mt-16">
                    <SectionFooter variant={2} />
                </div>
            </div>
        </section>
    )
}

export default ExpandableList