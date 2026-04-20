// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/sections/Slug/SlugRegulations.tsx

'use client'

import { Media, Regulation } from '@/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface SlugRegulationsProps {
    regulations: Regulation[]
    title?: string
    emptyMessage?: string
}

export default function SlugRegulations({
    regulations,
    title = "REGULATIONS",
    emptyMessage = "No regulations found"
}: SlugRegulationsProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null)

    if (!regulations || regulations.length === 0) {
        return (
            <section className="py-20 bg-white-pure border-t border-black-pure">
                <div className="px-10 flex flex-col items-center text-center">
                    <div className="size-12 border border-black-pure flex items-center justify-center rotate-45 mb-10">
                        <div className="size-2 bg-primary-500" />
                    </div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest mb-4 text-black-pure">
                        DATABASE EMPTY
                    </span>
                    <h2 className="text-3xl font-race font-black uppercase italic text-black-pure">
                        {emptyMessage}
                    </h2>
                </div>
            </section>
        )
    }

    const groupedRegulations = regulations.reduce((acc, reg) => {
        const type = reg.basics?.type || 'General protocol'
        if (!acc[type]) acc[type] = []
        acc[type].push(reg)
        return acc
    }, {} as Record<string, Regulation[]>)

    return (
        <section className="bg-white-pure border-t border-black-pure">
            <div className="p-10 lg:p-20 border-b border-black-pure flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-1 bg-primary-500" />
                        <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black-pure">
                            Competition framework
                        </span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-race font-black uppercase italic leading-none text-black-pure">
                        {title}
                    </h2>
                </div>

                <div className="flex border border-black-pure divide-x divide-black-pure">
                    <div className="p-6 flex flex-col bg-white-pure">
                        <span className="font-mono text-[9px] font-black uppercase text-black-pure/40 mb-1">Articles</span>
                        <span className="font-race font-black text-3xl italic leading-none text-black-pure">
                            {regulations.length.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <div className="p-6 flex flex-col bg-secondary-500">
                        <span className="font-mono text-[9px] font-black uppercase text-black-pure mb-1">Revision</span>
                        <span className="font-race font-black text-3xl italic leading-none text-black-pure">
                            {regulations[0]?.basics?.version || '1.0'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {Object.entries(groupedRegulations).map(([type, items]) => (
                    <div key={type} className="flex flex-col">
                        <div className="px-10 py-4 bg-tertiary-500 border-b border-black-pure flex items-center">
                            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-white-pure">
                                {type}
                            </span>
                        </div>

                        <div className="flex flex-col divide-y divide-black-pure">
                            {items.map((reg, index) => {
                                const isOpen = expandedId === reg.id
                                const doc = reg.basics?.document as Media

                                return (
                                    <div key={reg.id} className="flex flex-col">
                                        <button
                                            onClick={() => setExpandedId(isOpen ? null : reg.id)}
                                            className="w-full px-10 py-12 flex flex-col lg:flex-row lg:items-center justify-between group transition-colors hover:bg-primary-500 text-left outline-none focus:bg-secondary-500"
                                        >
                                            <div className="flex items-start gap-10">
                                                <span className="font-race font-black text-2xl italic text-black-pure/20 group-hover:text-black-pure/40">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-mono text-[9px] font-black text-tertiary-500 uppercase group-hover:text-black-pure">
                                                            {reg.basics?.code || 'Ref'}
                                                        </span>
                                                        <div className="size-1 bg-black-pure opacity-20" />
                                                        <span className="font-mono text-[9px] font-black text-black-pure/40 uppercase group-hover:text-black-pure/60">
                                                            Active {reg.basics?.effective_date ? new Date(reg.basics.effective_date).getFullYear() : '2026'}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-3xl lg:text-4xl font-race font-black uppercase italic text-black-pure">
                                                        {reg.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-10 mt-8 lg:mt-0">
                                                <div className="hidden xl:flex flex-col items-end">
                                                    <span className="font-mono text-[9px] font-black text-black-pure/40 uppercase mb-1">Enforcement</span>
                                                    <span className="text-[11px] font-race font-black uppercase italic text-black-pure">
                                                        {reg.basics?.enforcement || 'Manual'}
                                                    </span>
                                                </div>
                                                <div className={`size-12 flex items-center justify-center border border-black-pure transition-all duration-300 ${isOpen ? 'bg-black-pure text-white-pure rotate-45' : 'group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                        <path d={isOpen ? "M18 6L6 18M6 6l12 12" : "M12 5v14M5 12h14"} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: 'auto' }}
                                                    exit={{ height: 0 }}
                                                    className="overflow-hidden bg-white-200 border-t border-black-pure"
                                                >
                                                    <div className="p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
                                                        <div className="lg:col-span-8 flex flex-col gap-10">
                                                            <div className="space-y-4">
                                                                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-primary-500">
                                                                    Rule detail
                                                                </span>
                                                                <p className="text-sm font-bold uppercase leading-tight text-black-pure max-w-2xl">
                                                                    {reg.basics?.description || 'The competition rules for this article are currently being updated. Compliance with the latest sporting standards is required.'}
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <div className="p-4 border border-black-pure bg-white-pure flex flex-col">
                                                                    <span className="font-mono text-[8px] font-black uppercase text-black-pure/40 mb-1">Effective</span>
                                                                    <span className="text-xs font-race font-black text-black-pure uppercase">
                                                                        {reg.basics?.effective_date ? new Date(reg.basics.effective_date).toLocaleDateString('en-GB') : '01.01.2026'}
                                                                    </span>
                                                                </div>
                                                                <div className="p-4 border border-black-pure bg-white-pure flex flex-col">
                                                                    <span className="font-mono text-[8px] font-black uppercase text-black-pure/40 mb-1">Clearance</span>
                                                                    <span className="text-xs font-race font-black text-black-pure uppercase italic">Approved</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="lg:col-span-4 flex items-end">
                                                            <a
                                                                href={doc?.url || `https://picsum.photos/seed/doc-${reg.id}/800/1000`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-full flex items-center justify-between p-6 bg-black-pure hover:bg-secondary-500 transition-colors group outline-none focus:bg-primary-500"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-mono text-[9px] font-black text-white-pure/40 group-hover:text-black-pure/40">Technical log</span>
                                                                    <span className="font-race font-black text-sm uppercase italic text-white-pure group-hover:text-black-pure">Open article</span>
                                                                </div>
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-white-pure group-hover:text-black-pure">
                                                                    <path d="M7 17l10-10M7 7h10v10" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}