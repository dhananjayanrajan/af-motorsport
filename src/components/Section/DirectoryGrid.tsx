'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
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
        portrait: 'aspect-[2/3] md:aspect-[3/4]',
        square: 'aspect-square',
        landscape: 'aspect-[4/3] md:aspect-video'
    }
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'))
                        setVisibleItems(prev => new Set(prev).add(index))
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        itemRefs.current.forEach((ref, idx) => {
            if (ref) {
                ref.setAttribute('data-index', String(idx))
                observer.observe(ref)
            }
        })

        return () => observer.disconnect()
    }, [])

    const setRef = (el: HTMLDivElement | null, index: number) => {
        itemRefs.current[index] = el
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-primary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {items.length} ENTRIES
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/800/800`
                    const Wrapper = item.href ? Link : 'div'
                    const isVisible = visibleItems.has(index)

                    return (
                        <Wrapper
                            key={index}
                            href={item.href as string}
                            className={`flex flex-col group bg-white-pure hover:bg-secondary-500/5 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <div ref={(el) => setRef(el as HTMLDivElement, index)} className={`relative w-full overflow-hidden border-b border-black-pure ${aspectRatio[variant]}`}>
                                <Image
                                    src={src as string}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-colors duration-500" />
                                {item.label && (
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                        <span className="bg-primary-500 text-black-pure px-2 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-wider border border-black-pure">
                                            {item.label}
                                        </span>
                                    </div>
                                )}
                                {item.href && (
                                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                                        <div className="bg-black-pure text-white-pure w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white-pure/20">
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 md:p-6 lg:p-8 flex flex-col flex-1">
                                <div className="mb-4 md:mb-6">
                                    <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase mt-1 md:mt-2 tracking-tight">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>

                                {item.metadata && (
                                    <div className="mt-auto pt-4 md:pt-6 border-t border-neutral-100 flex flex-col gap-1 md:gap-2">
                                        {item.metadata.map((meta, mIdx) => (
                                            <div key={mIdx} className="flex justify-between items-center">
                                                <span className="text-[7px] md:text-[8px] text-neutral-400 font-black uppercase tracking-wider">{meta.label}</span>
                                                <span className="text-[8px] md:text-[9px] text-black-pure font-black uppercase tracking-tighter">{meta.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <SectionScroller items={[title, id, "BROWSE", "EXPLORE", "DISCOVER"]} variant={4} velocity={38} />
        </section>
    )
}

export default DirectoryGrid