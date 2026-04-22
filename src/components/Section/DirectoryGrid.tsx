'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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
        landscape: 'aspect-[16/9]'
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
    }, [items])

    const setRef = (el: HTMLDivElement | null, index: number) => {
        itemRefs.current[index] = el
    }

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={2}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center justify-between">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                    DIRECTORY_FLUX // {items.length.toString().padStart(3, '0')}_NODES_DETECTED
                </span>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] font-black text-primary-500 uppercase italic">
                        LAYOUT: {variant.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure bg-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || ''
                    const Wrapper = item.href ? Link : 'div'
                    const isVisible = visibleItems.has(index)

                    return (
                        <Wrapper
                            key={item.id}
                            href={item.href as string}
                            className={`flex flex-col group bg-white-pure hover:bg-neutral-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                                }`}
                        >
                            <div
                                ref={(el) => setRef(el as HTMLDivElement, index)}
                                className={`relative w-full overflow-hidden border-b-2 border-black-pure ${aspectRatio[variant]}`}
                            >
                                <Image
                                    src={src as string}
                                    alt={item.title}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />

                                {item.label && (
                                    <div className="absolute top-0 left-0 p-4">
                                        <div className="bg-primary-500 border-2 border-black-pure px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-tighter">
                                                {item.label}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-0 right-0 p-4">
                                    <span className="font-mono text-[10px] font-black text-white-pure mix-blend-difference opacity-50">
                                        REF_{(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>

                                {item.href && (
                                    <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="bg-black-pure text-primary-500 w-12 h-12 flex items-center justify-center border-2 border-primary-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 md:p-10 flex flex-col flex-1">
                                <div className="mb-8">
                                    <h3 className="font-bold text-2xl md:text-3xl text-black-pure uppercase leading-[0.9] tracking-tighter italic group-hover:text-primary-500 transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="font-mono text-[10px] font-black text-neutral-400 uppercase mt-2 tracking-widest pl-1">
                                            // {item.subtitle}
                                        </p>
                                    )}
                                </div>

                                {item.metadata && (
                                    <div className="mt-auto pt-8 border-t-2 border-black-pure/10 flex flex-col gap-2">
                                        {item.metadata.map((meta, mIdx) => (
                                            <div key={mIdx} className="flex justify-between items-end border-b border-black-pure/5 pb-1">
                                                <span className="font-mono text-[8px] text-neutral-300 font-black uppercase tracking-widest">
                                                    {meta.label}
                                                </span>
                                                <span className="text-[10px] text-black-pure font-black uppercase italic tracking-tighter">
                                                    {meta.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <SectionFooter variant={3} />
        </section>
    )
}

export default DirectoryGrid