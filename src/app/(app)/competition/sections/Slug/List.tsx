// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/sections/Slug/SlugList.tsx

'use client'

import SectionHeader from '@/components/Section/Header'
import Link from 'next/link'
import React from 'react'

interface SlugListItem {
    id: string | number
    name: string
    slug: string
    image?: string
    badge?: string
    year?: string
    tagline?: string
    description?: string
    metrics?: Array<{ label: string; value: string | number }>
    footer?: {
        label: string
        value: string
    }
}

interface SlugListProps {
    items: SlugListItem[]
    title: string
    emptyMessage?: string
    basePath: string
    parentSlug: string
    entityKey: string
}

const SlugList: React.FC<SlugListProps> = ({
    items,
    title,
    emptyMessage = "No items found",
    basePath,
    parentSlug,
    entityKey
}) => {
    if (items.length === 0) {
        return (
            <section className="relative w-full bg-white-pure flex flex-col py-20">
                <SectionHeader title={title} subtitle="DIRECTORY" variant={1} championships={[]} />
                <div className="flex flex-col items-center justify-center py-20 border-t border-black-pure">
                    <div className="size-12 border border-black-pure flex items-center justify-center rotate-45 mb-6">
                        <div className="size-2 bg-primary-500" />
                    </div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black-pure/40">
                        DATABASE EMPTY
                    </span>
                    <p className="text-xs font-race font-black uppercase text-black-pure mt-2">
                        {emptyMessage}
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col">
            <SectionHeader title={title} subtitle="DIRECTORY" variant={1} championships={[]} />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-black-pure bg-black-pure gap-px">
                {items.map((item) => {
                    const href = `/${basePath}/${parentSlug}/${entityKey}/${item.slug}`.replace(/\/+/g, '/')

                    return (
                        <Link
                            key={item.id}
                            href={href}
                            className="group relative flex flex-col bg-white-pure transition-colors duration-300"
                        >
                            <div className="relative h-64 overflow-hidden border-b border-black-pure bg-white-100">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                )}
                                <div className="absolute top-0 right-0 bg-black-pure px-3 py-1">
                                    <span className="font-mono text-[9px] font-black text-white-pure uppercase tracking-widest">
                                        {item.badge || 'REF'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 bg-primary-500 px-3 py-1 border-t border-r border-black-pure">
                                    <span className="font-mono text-[9px] font-black text-black-pure uppercase tracking-widest">
                                        {item.year || 'DATA'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1 group-hover:bg-primary-500 transition-colors duration-300">
                                <div className="flex flex-col mb-4">
                                    <h2 className="text-5xl font-race font-black text-black-pure uppercase italic leading-[0.8]">
                                        {item.year || item.badge || '--'}
                                    </h2>
                                    <span className="text-[10px] font-race font-black text-black-pure uppercase mt-3 tracking-tight">
                                        {item.name}
                                    </span>
                                </div>

                                <div className="flex-1 mb-8">
                                    <p className="text-[9px] font-mono font-black text-tertiary-500 uppercase tracking-widest mb-2 group-hover:text-black-pure">
                                        {item.tagline || 'SYSTEM LOG'}
                                    </p>
                                    <p className="text-[10px] font-bold text-black-pure uppercase leading-tight line-clamp-2">
                                        {item.description || `${item.name} technical parameters and operational logs.`}
                                    </p>
                                </div>

                                {item.metrics && item.metrics.length > 0 && (
                                    <div className="grid grid-cols-2 border-y border-black-pure -mx-8 divide-x divide-black-pure">
                                        {item.metrics.map((metric, idx) => (
                                            <div key={idx} className="p-4 flex flex-col group-hover:bg-white-pure/20 transition-colors">
                                                <span className="text-[8px] font-mono font-black text-black-pure/40 uppercase tracking-widest mb-0.5 group-hover:text-black-pure/60">
                                                    {metric.label}
                                                </span>
                                                <span className="text-2xl font-race font-black text-black-pure italic leading-none">
                                                    {metric.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {item.footer && (
                                    <div className="pt-6 flex items-center gap-4">
                                        <div className="size-10 bg-black-pure overflow-hidden shrink-0 flex items-center justify-center">
                                            <span className="text-white-pure font-black text-xs">#1</span>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[8px] font-mono font-black text-black-pure/40 uppercase group-hover:text-black-pure/60">
                                                {item.footer.label}
                                            </span>
                                            <span className="text-[10px] font-race font-black text-black-pure uppercase italic truncate">
                                                {item.footer.value}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default SlugList