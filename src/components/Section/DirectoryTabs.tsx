'use client'

import { Media } from '@/payload-types'
import { Briefcase, Building2, Star, Users } from 'lucide-react'
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

    const getTabIcon = (category: string) => {
        switch (category) {
            case 'HOST': return <Users className="w-3 h-3 md:w-4 md:h-4" />
            case 'GUEST': return <Star className="w-3 h-3 md:w-4 md:h-4" />
            case 'SPEAKER': return <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
            case 'PARTNER': return <Building2 className="w-3 h-3 md:w-4 md:h-4" />
            default: return <Users className="w-3 h-3 md:w-4 md:h-4" />
        }
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-tertiary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {items.length} PARTICIPANTS
                </div>
            </div>

            <div className="flex border-b border-black-pure bg-neutral-50 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-wider border-r border-black-pure transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${activeTab === category
                                ? 'bg-white-pure text-primary-500 border-t-2 border-t-primary-500'
                                : 'text-neutral-500 hover:text-black-pure hover:bg-white-pure/50'
                            }`}
                    >
                        {getTabIcon(category)}
                        {category} ({items.filter(i => i.type === category).length})
                    </button>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-black-pure">
                {filteredItems.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/400/400`

                    return (
                        <div key={index} className="p-4 md:p-5 lg:p-6 flex items-center gap-4 md:gap-5 lg:gap-6 bg-white-pure hover:bg-gradient-to-r hover:from-white-pure hover:to-secondary-500/5 transition-all duration-500 group">
                            <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-black-pure flex-shrink-0 group-hover:border-primary-500 transition-colors duration-300">
                                <Image
                                    src={src as string}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="font-race text-base md:text-lg lg:text-xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                    {item.name}
                                </h3>
                                {item.role && (
                                    <p className="text-[8px] md:text-[9px] font-black text-primary-500 uppercase mt-0.5 tracking-tight">
                                        {item.role}
                                    </p>
                                )}
                                {item.organization && (
                                    <p className="text-[7px] md:text-[8px] font-black text-neutral-400 uppercase tracking-tighter mt-0.5">
                                        {item.organization}
                                    </p>
                                )}
                            </div>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary-500">
                                <span className="text-[8px] md:text-[9px] font-black text-black-pure">→</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionScroller items={[title, activeTab, "NETWORK", "CONNECTIONS"]} variant={3} velocity={32} />
        </section>
    )
}

export default DirectoryTabs