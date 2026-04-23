"use client"
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
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={2} />

                <div className="mt-8 mb-12 flex bg-foreground border-b border-border overflow-x-auto no-scrollbar divide-x divide-white/10 rounded-t-lg">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`px-8 py-5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${activeTab === category
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-background hover:bg-white/10'
                                }`}
                        >
                            {getTabIcon(category)}
                            {category} [{items.filter(i => i.type === category).length.toString().padStart(2, '0')}]
                        </button>
                    ))}

                    <div className="flex-1 flex items-center justify-end px-6">
                        <span className="font-mono text-sm font-semibold text-primary uppercase italic">
                            Filter Active: {activeTab}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item, index) => {
                        const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/400/400`

                        return (
                            <div
                                key={item.id}
                                className="p-8 flex items-center gap-6 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors duration-300 group relative shadow-sm hover:shadow-md"
                            >
                                <div className="relative w-20 h-20 border-2 border-foreground flex-shrink-0 group-hover:shadow-lg transition-all duration-300 overflow-hidden rounded-full">
                                    <Image
                                        src={src as string}
                                        alt={item.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <span className="font-mono text-sm font-semibold text-muted-foreground/40 uppercase mb-1">
                                        Ref {(index + 1).toString().padStart(3, '0')}
                                    </span>
                                    <h3 className="font-bold text-lg md:text-xl text-foreground uppercase leading-none tracking-tighter group-hover:text-primary transition-colors italic">
                                        {item.name}
                                    </h3>

                                    {item.role && (
                                        <p className="font-mono text-sm font-semibold text-foreground uppercase mt-2 bg-primary inline-block px-3 py-1 self-start rounded-md">
                                            {item.role}
                                        </p>
                                    )}

                                    {item.organization && (
                                        <p className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-tighter mt-2">
                                            {item.organization}
                                        </p>
                                    )}
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-3 h-3 bg-primary rotate-45 border border-foreground rounded-sm" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16">
                    <SectionFooter variant={3} />
                </div>
            </div>
        </section>
    )
}

export default DirectoryTabs