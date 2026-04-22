'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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
    }, [items])

    const setRef = (el: HTMLDivElement | null, index: number) => {
        itemRefs.current[index] = el
    }

    const getStatusStyles = (status?: string) => {
        if (!status) return 'bg-neutral-400'
        const lower = status.toLowerCase()
        if (lower.includes('active') || lower.includes('open')) return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
        if (lower.includes('completed') || lower.includes('closed')) return 'bg-blue-500'
        if (lower.includes('pending')) return 'bg-yellow-500'
        if (lower.includes('cancelled')) return 'bg-red-500'
        return 'bg-primary-500'
    }

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={1}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center justify-between">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                    LIST_ENTRY_ARRAY // {items.length.toString().padStart(3, '0')}_RECORDS
                </span>
                <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-primary-500 rotate-45" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                {items.map((item, index) => {
                    const Wrapper = item.href ? Link : 'div'
                    const isVisible = visibleItems.has(index)

                    return (
                        <Wrapper
                            key={item.id}
                            href={item.href as string}
                            className={`group flex flex-col md:flex-row items-stretch border-b-2 border-black-pure bg-white-pure hover:bg-neutral-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <div
                                ref={(el) => setRef(el as HTMLDivElement, index)}
                                className="w-16 md:w-24 border-r-2 border-black-pure flex items-center justify-center bg-white-pure group-hover:bg-black-pure transition-colors duration-300"
                            >
                                <span className={`font-mono text-xs font-black transition-colors ${isVisible ? 'text-black-pure group-hover:text-primary-500' : 'text-neutral-200'}`}>
                                    {(index + 1).toString().padStart(3, '0')}
                                </span>
                            </div>

                            <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        {item.tag && (
                                            <span className="px-2 py-0.5 bg-primary-500 border-2 border-black-pure text-[9px] font-black text-black-pure uppercase font-mono">
                                                {item.tag}
                                            </span>
                                        )}
                                        <h3 className="font-bold text-2xl md:text-3xl text-black-pure uppercase leading-none tracking-tighter italic group-hover:text-primary-500 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    {item.subtitle && (
                                        <p className="font-mono text-[10px] font-black text-neutral-400 uppercase tracking-widest pl-1">
                                            // {item.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-6 md:gap-8 lg:gap-12">
                                    {item.timestamp && (
                                        <div className="flex flex-col items-end">
                                            <span className="font-mono text-[8px] font-black text-neutral-300 uppercase">TIMESTAMP</span>
                                            <span className="font-mono text-[10px] font-black text-black-pure uppercase">
                                                {item.timestamp}
                                            </span>
                                        </div>
                                    )}

                                    {item.status && (
                                        <div className="flex flex-col items-end">
                                            <span className="font-mono text-[8px] font-black text-neutral-300 uppercase text-right">NODE_STATUS</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 ${getStatusStyles(item.status)} animate-pulse border border-black-pure`} />
                                                <span className="font-mono text-[10px] font-black text-black-pure uppercase">
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {item.href && (
                                        <div className="w-12 h-12 flex items-center justify-center border-2 border-black-pure group-hover:bg-primary-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                            <svg className="w-5 h-5 text-black-pure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <SectionFooter variant={1} />
        </section>
    )
}

export default DirectoryList