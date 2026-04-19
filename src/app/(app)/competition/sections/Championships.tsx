"use client"

import { Championship, Media } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import SectionCard from '@/components/Section/Card'
import SectionCarousel from '@/components/Section/Carousel'
import SectionCTA from '@/components/Section/CTA'
import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionScroller from '@/components/Section/Scroller'
import SectionSidebar from '@/components/Section/Sidebar'
import SectionTitle from '@/components/Section/Title'

interface ChampionshipDirectoryProps {
    championships?: Championship[]
}

const ChampionshipDirectory: React.FC<ChampionshipDirectoryProps> = ({ championships = [] }) => {
    const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null)
    const router = useRouter()

    const marqueeNames = championships.map(c => c.name)

    const galleryImages: Media[] = championships.flatMap(c => {
        if (!c.assets?.gallery) return []
        return c.assets.gallery.filter((item): item is Media => typeof item !== 'number')
    })

    const placeholders = Array.from({ length: 5 }).map((_, i) => ({
        id: `placeholder-${i}`,
        url: `https://picsum.photos/seed/championships-gallery-${i}/800/450`,
        alt: `Championship Gallery ${i + 1}`
    }))

    const displayImages = galleryImages.length > 0 ? galleryImages : placeholders

    const carouselItems = displayImages.map((img, index) => ({
        id: `carousel-${index}`,
        type: 'image' as const,
        media: img
    }))

    const getFormatLabel = (format?: string | null) => {
        if (!format) return 'CHAMPIONSHIP'
        return format.toUpperCase()
    }

    const getRegionLabel = () => {
        return 'GLOBAL'
    }

    const getStandingsScope = (scope?: string | null) => {
        if (!scope) return 'SEASON'
        return scope.replace('_', ' ').toUpperCase()
    }

    return (
        <section className="relative w-full min-h-screen bg-white-50 flex flex-col overflow-hidden border-t-2 border-black-pure">
            <SectionHeader
                title="CHAMPIONSHIP"
                subtitle="DIRECTORY"
                variant={2}
                championships={championships}
            />

            <div className="flex-1 grid grid-cols-12 w-full">
                <div className="col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black-pure bg-white-100 z-20">
                    <div className="flex-1 flex flex-col overflow-y-auto lg:overflow-visible">
                        <div className="bg-black-pure p-6 md:p-8 grid grid-cols-2 gap-px shrink-0">
                            <div className="flex flex-col border-r border-white/10 pr-4">
                                <span className="text-primary-500 font-mono text-[10px] font-black tracking-widest uppercase mb-2">TOTAL</span>
                                <span className="text-white-pure text-4xl md:text-5xl font-black leading-none italic">{championships.length}</span>
                            </div>
                            <div className="flex flex-col pl-6">
                                <span className="text-secondary-500 font-mono text-[10px] font-black tracking-widest uppercase mb-2">SEASON</span>
                                <span className="text-white-pure text-4xl md:text-5xl font-black leading-none italic">{new Date().getFullYear().toString()}</span>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 flex-1 flex flex-col justify-between gap-12">
                            <div className="space-y-8">
                                <SectionTitle
                                    variant={1}
                                    label="CHAMPIONSHIP"
                                    lineOne="DIRECTORY"
                                    lineTwo=""
                                    highlight=""
                                />

                                <SectionDescription
                                    variant={1}
                                    text="Comprehensive listing of all active championships sanctioned by the FIA. Explore official calendars, circuit information, and series regulations."
                                />
                            </div>

                            <div className="hidden md:block">
                                <SectionCarousel items={carouselItems} variant={1} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto shrink-0 border-t-2 border-black-pure lg:border-t-0">
                        <SectionCTA
                            variant={1}
                            label="EXPLORE CHAMPIONSHIPS"
                            path="/competition/championships"
                            description="Access the complete structural hierarchy of competitive championships."
                            onClick={() => router.push('/competition/championships')}
                        />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6 xl:col-span-8 flex flex-col bg-white-50 min-h-[600px] lg:min-h-0">
                    <div className="shrink-0 border-b-2 border-black-pure">
                        <SectionScroller
                            items={marqueeNames.length > 0 ? marqueeNames : ["CHAMPIONSHIP STANDINGS", "OFFICIAL RANKINGS"]}
                            velocity={50}
                            backgroundColor="bg-secondary-500"
                            textColor="text-black-pure"
                            variant={2}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-black-pure/5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-[320px] lg:auto-rows-fr h-full">
                            {championships.map((championship) => {
                                const coverMedia = championship.assets?.cover
                                const coverUrl = coverMedia && typeof coverMedia !== 'number' ? coverMedia.url : null

                                return (
                                    <div
                                        key={championship.id}
                                        className="border-b-2 border-r-2 last:border-r-0 border-black-pure group relative overflow-hidden h-full"
                                    >
                                        <SectionCard
                                            variant={1}
                                            title={championship.name}
                                            label={championship.basics?.identifiers?.abbreviation ?? undefined}
                                            image={coverUrl ?? `https://picsum.photos/seed/${championship.id}/800/800`}
                                            onClick={() => setSelectedChampionship(championship)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="shrink-0 border-t-2 border-black-pure">
                <SectionFooter variant={2} championships={championships} />
            </div>

            <SectionSidebar
                isOpen={!!selectedChampionship}
                onClose={() => setSelectedChampionship(null)}
                title={selectedChampionship?.name || ''}
                description={selectedChampionship?.basics?.description || selectedChampionship?.basics?.tagline || 'No additional information available for this championship.'}
                imageUrl={(selectedChampionship?.assets?.cover && typeof selectedChampionship.assets.cover !== 'number' ? selectedChampionship.assets.cover.url : null) || `https://picsum.photos/seed/side-${selectedChampionship?.id}/800/1200`}
                idCode={selectedChampionship?.basics?.identifiers?.code || selectedChampionship?.basics?.identifiers?.abbreviation || String(selectedChampionship?.id || '00')}
                buttonLabel="VIEW CHAMPIONSHIP"
                onAction={() => selectedChampionship?.slug && router.push(`/competition/championships/${selectedChampionship.slug}`)}
                stats={[
                    { label: 'FORMAT', val: getFormatLabel(selectedChampionship?.details?.format), color: 'bg-primary-500' },
                    { label: 'STANDINGS', val: getStandingsScope(selectedChampionship?.details?.standings_scope), color: 'bg-secondary-500' },
                    { label: 'REGION', val: getRegionLabel(), color: 'bg-tertiary-500' },
                ]}
            />
        </section>
    )
}

export default ChampionshipDirectory