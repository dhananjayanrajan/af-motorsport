'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SectionScroller from './Scroller'

export interface ListEntry {
    id: string
    title: string
    subtitle?: string
    status?: string
    tag?: string
    href?: string
    timestamp?: string
}

interface DirectoryListProps {
    id: string
    title: string
    items: ListEntry[]
}

const DirectoryList: React.FC<DirectoryListProps> = ({ id, title, items }) => {
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
            { threshold: 0.1, rootMargin: '50px' }
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

    const getStatusColor = (status?: string) => {
        if (!status) return 'bg-neutral-300'
        const lower = status.toLowerCase()
        if (lower.includes('active') || lower.includes('open')) return 'bg-green-500'
        if (lower.includes('completed') || lower.includes('closed')) return 'bg-blue-500'
        if (lower.includes('pending')) return 'bg-yellow-500'
        if (lower.includes('cancelled')) return 'bg-red-500'
        return 'bg-primary-500'
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-secondary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {items.length} RECORDS
                </div>
            </div>

            <div className="flex flex-col border-l border-black-pure">
                {items.map((item, index) => {
                    const Wrapper = item.href ? Link : 'div'
                    const isVisible = visibleItems.has(index)

                    return (
                        <Wrapper
                            key={index}
                            href={item.href as string}
                            className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 lg:p-8 xl:p-10 border-b border-black-pure bg-white-pure hover:bg-secondary-500/5 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            <div ref={(el) => setRef(el as HTMLDivElement, index)} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 lg:gap-8 xl:gap-12 flex-1 w-full md:w-auto">
                                <span className="text-[9px] md:text-[10px] font-black text-neutral-300 font-mono tracking-tighter w-10">
                                    {(index + 1).toString().padStart(3, '0')}
                                </span>

                                <div className="flex-1">
                                    <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase mt-1 tracking-tight">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-0">
                                {item.timestamp && (
                                    <span className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase font-mono">
                                        {item.timestamp}
                                    </span>
                                )}

                                {item.tag && (
                                    <span className="px-2 py-0.5 md:px-3 md:py-1 border border-secondary-500 text-[8px] md:text-[9px] font-black text-secondary-500 uppercase tracking-wider bg-white-pure hover:bg-secondary-500 hover:text-black-pure transition-colors duration-300">
                                        {item.tag}
                                    </span>
                                )}

                                {item.status && (
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${getStatusColor(item.status)} animate-pulse`} />
                                        <span className="text-[9px] md:text-[10px] font-black text-black-pure uppercase">
                                            {item.status}
                                        </span>
                                    </div>
                                )}

                                {item.href && (
                                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-black-pure group-hover:bg-black-pure group-hover:text-white-pure transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <SectionScroller items={[title, id, "CATALOG", "INDEX", "DIRECTORY"]} variant={3} velocity={32} />
        </section>
    )
}

export default DirectoryList