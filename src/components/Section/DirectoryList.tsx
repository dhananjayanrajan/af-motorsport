"use client"
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
        if (!status) return 'bg-muted-foreground'
        const lower = status.toLowerCase()
        if (lower.includes('active') || lower.includes('open')) return 'bg-green-500'
        if (lower.includes('completed') || lower.includes('closed')) return 'bg-blue-500'
        if (lower.includes('pending')) return 'bg-yellow-500'
        if (lower.includes('cancelled')) return 'bg-red-500'
        return 'bg-primary'
    }

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={1} />

                <div className="mt-8 mb-12 flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
                        {items.length} Records
                    </span>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-primary rotate-45 rounded-sm" />
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
                                className={`group flex flex-col md:flex-row items-stretch border-b border-border last:border-b-0 bg-card hover:bg-accent/50 transition-all duration-300 transform rounded-lg mb-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                <div
                                    ref={(el) => setRef(el as HTMLDivElement, index)}
                                    className="w-16 md:w-24 border-r border-border flex items-center justify-center bg-card group-hover:bg-foreground transition-colors duration-300 rounded-l-lg"
                                >
                                    <span className={`font-mono text-sm font-semibold transition-colors ${isVisible ? 'text-foreground group-hover:text-primary' : 'text-muted'
                                        }`}>
                                        {(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>

                                <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            {item.tag && (
                                                <span className="px-3 py-1 bg-primary border border-primary text-sm font-semibold text-primary-foreground uppercase font-mono rounded-md">
                                                    {item.tag}
                                                </span>
                                            )}
                                            <h3 className="font-bold text-2xl md:text-3xl text-foreground uppercase leading-none tracking-tighter italic group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        {item.subtitle && (
                                            <p className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 md:gap-8 lg:gap-12">
                                        {item.timestamp && (
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">Timestamp</span>
                                                <span className="font-mono text-sm font-semibold text-foreground uppercase">
                                                    {item.timestamp}
                                                </span>
                                            </div>
                                        )}

                                        {item.status && (
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-xs font-semibold text-muted-foreground uppercase text-right">Status</span>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 ${getStatusStyles(item.status)} rounded-full border border-foreground`} />
                                                    <span className="font-mono text-sm font-semibold text-foreground uppercase">
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {item.href && (
                                            <div className="w-12 h-12 flex items-center justify-center border-2 border-foreground group-hover:bg-primary shadow-sm group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all rounded-full">
                                                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Wrapper>
                        )
                    })}
                </div>

                <div className="mt-16">
                    <SectionFooter variant={1} />
                </div>
            </div>
        </section>
    )
}

export default DirectoryList