'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

export interface Attendee {
    id: string
    name: string
    role?: string
    organization?: string
    image?: Media | string | null
    type: 'HOST' | 'GUEST' | 'SPEAKER' | 'PARTNER'
}

interface DirectoryTabsProps {
    id: string
    title: string
    items: Attendee[]
}

const DirectoryTabs: React.FC<DirectoryTabsProps> = ({ id, title, items }) => {
    const categories = Array.from(new Set(items.map((item) => item.type)))
    const [activeTab, setActiveTab] = useState(categories[0])

    const filteredItems = items.filter((item) => item.type === activeTab)

    return (
        <section className="relative w-full min-h-[70vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex border-b border-black-pure bg-neutral-50 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-10 py-6 text-[10px] font-bold uppercase tracking-widest border-r border-black-pure transition-colors whitespace-nowrap ${activeTab === category
                                ? 'bg-white-pure text-primary-500'
                                : 'text-neutral-400 hover:text-black-pure'
                            }`}
                    >
                        {category} ({items.filter(i => i.type === category).length})
                    </button>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-black-pure">
                {filteredItems.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/400/400`

                    return (
                        <div key={index} className="p-8 flex items-center gap-6 bg-white-pure">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-black-pure flex-shrink-0">
                                <Image
                                    src={src as string}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-race text-xl text-black-pure uppercase leading-none">
                                    {item.name}
                                </h3>
                                {item.role && (
                                    <p className="text-[9px] font-bold text-primary-500 uppercase mt-1 tracking-tight">
                                        {item.role}
                                    </p>
                                )}
                                {item.organization && (
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">
                                        {item.organization}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-auto z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, activeTab, `COUNT_${filteredItems.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default DirectoryTabs