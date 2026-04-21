'use client'

import Link from 'next/link'
import React from 'react'
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
    return (
        <section className="relative w-full min-h-[60vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex flex-col border-l border-black-pure">
                {items.map((item, index) => {
                    const Wrapper = item.href ? Link : 'div'

                    return (
                        <Wrapper
                            key={index}
                            href={item.href as string}
                            className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:px-12 md:py-10 border-b border-black-pure bg-white-pure hover:bg-neutral-50 transition-colors duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
                                <span className="text-[10px] font-bold text-neutral-300 font-mono tracking-tighter">
                                    {String(index + 1).padStart(3, '0')}
                                </span>

                                <div className="flex flex-col">
                                    <h3 className="font-race text-2xl md:text-3xl text-black-pure uppercase leading-none group-hover:text-primary-500 transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase mt-2 tracking-tight">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-6 md:mt-0">
                                {item.timestamp && (
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase font-mono">
                                        {item.timestamp}
                                    </span>
                                )}

                                {item.tag && (
                                    <span className="px-3 py-1 border border-neutral-200 text-[9px] font-bold text-neutral-500 uppercase tracking-widest bg-white-pure">
                                        {item.tag}
                                    </span>
                                )}

                                {item.status && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                        <span className="text-[10px] font-bold text-black-pure uppercase">
                                            {item.status}
                                        </span>
                                    </div>
                                )}

                                {item.href && (
                                    <div className="w-8 h-8 flex items-center justify-center border border-black-pure group-hover:bg-black-pure group-hover:text-white-pure transition-all ml-4">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </Wrapper>
                    )
                })}
            </div>

            <div className="mt-auto z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, `INDEX_COUNT_${items.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default DirectoryList