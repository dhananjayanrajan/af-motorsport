"use client"

import { Championship, Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
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

interface ChampionshipTickerProps {
    championships?: Championship[]
}

const ChampionshipTicker: React.FC<ChampionshipTickerProps> = ({ championships = [] }) => {
    const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null)
    const router = useRouter()

    const marqueeNames = championships.map(c => c.name)
    const [gridRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        watchDrag: championships.length > 6
    })

    const galleryImages: Media[] = championships.flatMap(c => (c.assets?.gallery as Media[]) || [])
    const placeholders = Array.from({ length: 5 }).map((_, i) => ({
        id: `placeholder-${i}`,
        url: `https://picsum.photos/seed/series-gallery-${i}/800/450`,
        alt: `Championship Gallery Placeholder ${i + 1}`
    }));

    const displayImages = galleryImages.length > 0 ? galleryImages : placeholders;

    const chunkedChampionships = [];
    for (let i = 0; i < championships.length; i += 6) {
        chunkedChampionships.push(championships.slice(i, i + 6));
    }

    return (
        <section className="relative w-full min-h-screen bg-white-50 flex flex-col overflow-hidden">
            <SectionHeader
                title="DIVISION"
                subtitle="HIERARCHY"
                variant={2}
                championships={championships}
            />

            <div className="flex-1 grid grid-cols-12 w-full border-b-2 border-black-pure overflow-y-auto lg:overflow-hidden">
                <div className="col-span-12 lg:col-span-4 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black-pure bg-white-100">
                    <div className="flex-1 flex flex-col">
                        <div className="bg-black-pure p-8 grid grid-cols-2 gap-px">
                            <div className="flex flex-col border-r border-white/10 pr-4">
                                <span className="text-primary font-mono text-[10px] font-black tracking-widest uppercase mb-2">ENTRIES</span>
                                <span className="text-white-pure text-5xl font-black leading-none italic">{championships.length}</span>
                            </div>
                            <div className="flex flex-col pl-6">
                                <span className="text-secondary font-mono text-[10px] font-black tracking-widest uppercase mb-2">SEASON</span>
                                <span className="text-white-pure text-5xl font-black leading-none italic">{new Date().getFullYear().toString().slice(-2)}</span>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 flex-1 flex flex-col">
                            <div className="space-y-12">
                                <SectionTitle
                                    variant={1}
                                    label="SYSTEM INDEX"
                                    lineOne="RANKED"
                                    lineTwo=""
                                    highlight="SERIES"
                                />

                                <SectionDescription
                                    variant={1}
                                    text="A systematic directory showcasing the tier-based organization of professional racing divisions and official championship structures."
                                />
                            </div>

                            <div className="mt-auto pt-12">
                                <SectionCarousel images={displayImages} variant={1} />
                            </div>
                        </div>
                    </div>

                    <SectionCTA
                        variant={1}
                        label="EXPLORE DIVISIONS"
                        path="/competition/series"
                        description="Access the complete structural hierarchy of competitive divisions."
                        onClick={() => router.push('/competition/series')}
                    />
                </div>

                <div className="col-span-12 lg:col-span-8 flex flex-col bg-white-50">
                    <SectionScroller
                        items={marqueeNames.length > 0 ? marqueeNames : ["COMPETITION DATA", "OFFICIAL RANKINGS"]}
                        velocity={50}
                        backgroundColor="bg-secondary"
                        textColor="text-black-pure"
                    />

                    <div className="flex-1 overflow-x-hidden overflow-y-auto lg:overflow-hidden" ref={gridRef}>
                        <div className="flex h-full flex-col lg:flex-row">
                            <div className="flex lg:hidden flex-col w-full">
                                {championships.map((championship) => (
                                    <div key={championship.id} className="h-64 w-full">
                                        <SectionCard
                                            variant={1}
                                            title={championship.name}
                                            label={championship.basics?.identifiers?.abbreviation ?? undefined}
                                            image={(championship.assets?.cover as Media)?.url ?? `https://picsum.photos/seed/${championship.id}/800/800`}
                                            onClick={() => setSelectedChampionship(championship)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="hidden lg:flex h-full w-full">
                                {chunkedChampionships.map((group, idx) => (
                                    <div key={idx} className="flex-[0_0_100%] min-w-0 h-full grid grid-cols-3 grid-rows-2 gap-0 auto-rows-fr">
                                        {group.map((championship) => (
                                            <SectionCard
                                                key={championship.id}
                                                variant={1}
                                                title={championship.name}
                                                label={championship.basics?.identifiers?.abbreviation ?? undefined}
                                                image={(championship.assets?.cover as Media)?.url ?? `https://picsum.photos/seed/${championship.id}/800/800`}
                                                onClick={() => setSelectedChampionship(championship)}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SectionFooter variant={2} championships={championships} />

            <SectionSidebar
                isOpen={!!selectedChampionship}
                onClose={() => setSelectedChampionship(null)}
                title={selectedChampionship?.name || ''}
                description={selectedChampionship?.basics?.description || 'NO ADDITIONAL INFORMATION'}
                imageUrl={(selectedChampionship?.assets?.cover as Media)?.url || `https://picsum.photos/seed/side-${selectedChampionship?.id}/800/1200`}
                idCode={selectedChampionship?.basics?.identifiers?.code || '00'}
                buttonLabel="OPEN SERIES"
                onAction={() => selectedChampionship?.slug && router.push(`/competition/series/${selectedChampionship.slug}`)}
                stats={[
                    { label: 'TYPE', val: selectedChampionship?.details?.format || 'PRO', color: 'bg-primary' },
                    { label: 'RULESET', val: 'STANDARD', color: 'bg-secondary' },
                    { label: 'REGION', val: 'GLOBAL', color: 'bg-tertiary-500' },
                ]}
            />
        </section>
    )
}

export default ChampionshipTicker