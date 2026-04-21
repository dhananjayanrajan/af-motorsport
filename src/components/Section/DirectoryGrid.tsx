'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SectionScroller from './Scroller'

export interface DirectoryItem {
    id: string
    title: string
    subtitle?: string
    label?: string
    image?: Media | string | null
    href?: string
    metadata?: { label: string; value: string }[]
}

interface DirectoryGridProps {
    id: string
    title: string
    items: DirectoryItem[]
    variant?: 'portrait' | 'square' | 'landscape'
}

const DirectoryGrid: React.FC<DirectoryGridProps> = ({
    id,
    title,
    items,
    variant = 'square'
}) => {
    const aspectRatio = {
        portrait: 'aspect-[3/4]',
        square: 'aspect-square',
        landscape: 'aspect-video'
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-t border-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/800/800`
                    const Wrapper = item.href ? Link : 'div'

                    return (
                        <Wrapper
                            key={index}
                            href={item.href as string}
                            className="flex flex-col group bg-white-pure hover:bg-neutral-50 transition-colors duration-500"
                        >
                            <div className={`relative w-full overflow-hidden border-b border-black-pure ${aspectRatio[variant]}`}>
                                <Image
                                    src={src as string}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {item.label && (
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-black-pure text-white-pure px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-6">
                                    <h3 className="font-race text-2xl text-black-pure uppercase leading-none group-hover:text-primary-500 transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase mt-2 tracking-tight">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>

                                {item.metadata && (
                                    <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-col gap-2">
                                        {item.metadata.map((meta, mIdx) => (
                                            <div key={mIdx} className="flex justify-between items-center">
                                                <span className="text-[9px] text-neutral-400 font-bold uppercase">{meta.label}</span>
                                                <span className="text-[10px] text-black-pure font-bold uppercase tracking-tighter">{meta.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <div className="mt-auto z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, `${items.length} ENTRIES`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default DirectoryGrid