'use client'

import { Media } from '@/payload-types'
import { Briefcase, Building2, Star, Users } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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
            case 'HOST': return <Users className="w-4 h-4" />
            case 'GUEST': return <Star className="w-4 h-4" />
            case 'SPEAKER': return <Briefcase className="w-4 h-4" />
            case 'PARTNER': return <Building2 className="w-4 h-4" />
            default: return <Users className="w-4 h-4" />
        }
    }

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={2}
            />

            <div className="flex bg-black-pure border-b-2 border-black-pure overflow-x-auto no-scrollbar divide-x-2 divide-white-pure/10">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${activeTab === category
                                ? 'bg-primary-500 text-black-pure'
                                : 'text-white-pure hover:bg-white-pure/10'
                            }`}
                    >
                        {getTabIcon(category)}
                        {category}_[{items.filter(i => i.type === category).length.toString().padStart(2, '0')}]
                    </button>
                ))}
                <div className="flex-1 flex items-center justify-end px-6">
                    <span className="font-mono text-[10px] font-black text-primary-500 uppercase italic">
                        FILTER_ACTIVE: {activeTab}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure">
                {filteredItems.map((item, index) => {
                    const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/400/400`

                    return (
                        <div
                            key={item.id}
                            className="p-8 flex items-center gap-6 bg-white-pure hover:bg-neutral-50 transition-colors duration-300 group relative"
                        >
                            <div className="relative w-20 h-20 border-2 border-black-pure flex-shrink-0 group-hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all duration-300 overflow-hidden">
                                <Image
                                    src={src as string}
                                    alt={item.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <span className="font-mono text-[9px] font-black text-black-pure/30 uppercase mb-1">
                                    REF_{(index + 1).toString().padStart(3, '0')}
                                </span>
                                <h3 className="font-bold text-lg md:text-xl text-black-pure uppercase leading-none tracking-tighter group-hover:text-primary-500 transition-colors italic">
                                    {item.name}
                                </h3>
                                {item.role && (
                                    <p className="font-mono text-[10px] font-black text-black-pure uppercase mt-2 bg-primary-500 inline-block px-2 self-start">
                                        {item.role}
                                    </p>
                                )}
                                {item.organization && (
                                    <p className="font-mono text-[9px] font-black text-neutral-400 uppercase tracking-tighter mt-1">
                                        // {item.organization}
                                    </p>
                                )}
                            </div>

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 bg-primary-500 rotate-45 border border-black-pure" />
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionFooter variant={3} />
        </section>
    )
}

export default DirectoryTabs