"use client"

import SectionDescription from '@/components/Section/Description'
import SectionSidebar from '@/components/Section/Sidebar'
import SectionTitle from '@/components/Section/Title'
import { Celebration, Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

interface CelebrationsGalleryProps {
    celebrations: Celebration[]
}

const CelebrationsGallery: React.FC<CelebrationsGalleryProps> = ({ celebrations = [] }) => {
    const router = useRouter()
    const [activeItem, setActiveItem] = useState<Celebration | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    })

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="bg-white-pure min-h-screen flex flex-col relative overflow-hidden">

            <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b-2 border-black-pure bg-white-pure z-10">
                <div className="lg:col-span-8">
                    <SectionTitle
                        variant={2}
                        label="Historical Registry"
                        highlight="Milestone"
                        lineOne="Visual"
                        lineTwo="Archive"
                    />
                </div>
                <div className="lg:col-span-4 flex flex-col justify-end">
                    <SectionDescription
                        variant={2}
                        text="Uniform documentation of community victories. Every entry is normalized to a strict structural ratio to maintain the integrity of the archival grid."
                    />
                </div>
            </div>

            <div className="flex-1 bg-black-pure flex flex-col overflow-hidden">
                <div className="flex-1 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex h-full">
                        {celebrations.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setActiveItem(item)}
                                className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] border-r-2 border-black-pure bg-white-pure group flex flex-col"
                            >
                                <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0">
                                    <Image
                                        src={(item.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${item.id}/800/1000`}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-0 left-0 bg-primary-500 text-black-pure px-4 py-2 font-mono text-[10px] font-black uppercase z-20">
                                        REC. {(index + 1).toString().padStart(3, '0')}
                                    </div>
                                    <div className="absolute inset-0 bg-secondary-500 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                </div>

                                <div className="flex-1 p-8 flex flex-col border-t-2 border-black-pure group-hover:bg-black-pure transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-0.5 w-10 bg-tertiary-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-tertiary-500">
                                            {item.details?.date_time ? new Date(item.details.date_time).getFullYear() : '2026'}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-black-pure group-hover:text-white-pure leading-none mb-6">
                                        {item.name}
                                    </h3>

                                    <div className="mt-auto pt-6 border-t border-black-pure/5 group-hover:border-white/10 flex items-center justify-between">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/30 group-hover:text-white/40">
                                            Data Profile
                                        </span>
                                        <div className="size-10 bg-black-pure text-white-pure flex items-center justify-center group-hover:bg-primary-500 group-hover:text-black-pure transition-all">
                                            <span className="text-xl font-black">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-16 bg-black-pure flex border-t-2 border-black-pure relative z-20">
                <div className="w-16 h-full bg-primary-500 flex items-center justify-center border-r-2 border-black-pure">
                    <div className="w-2 h-2 bg-black-pure animate-pulse" />
                </div>
                <div className="flex-1 relative flex items-center px-12">
                    <div className="w-full h-1 bg-white-pure/10">
                        <div
                            className="h-full bg-primary-500 transition-all duration-700 ease-out"
                            style={{ width: `${((selectedIndex + 1) / celebrations.length) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="px-8 flex items-center border-l-2 border-black-pure bg-white-pure">
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-black-pure">
                        {selectedIndex + 1} / {celebrations.length}
                    </span>
                </div>
            </div>

            <SectionSidebar
                isOpen={!!activeItem}
                onClose={() => setActiveItem(null)}
                title={activeItem?.name || ""}
                description={activeItem?.basics?.description || "An official record documenting a strategic community milestone and its subsequent impact on the network history."}
                imageUrl={(activeItem?.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${activeItem?.id}/1200/800`}
                idCode={`HST-${activeItem?.id || '00'}`}
                infoLabel="Event Dossier"
                buttonLabel="Open Record"
                onAction={() => activeItem && router.push(`/celebrations/${activeItem.slug}`)}
                stats={[
                    {
                        label: "Level",
                        val: activeItem?.details?.exclusivity || "Public",
                        color: "bg-primary-500"
                    },
                    {
                        label: "Recorded",
                        val: activeItem?.details?.date_time ? new Date(activeItem.details.date_time).toLocaleDateString() : "2026",
                        color: "bg-secondary-500"
                    },
                    {
                        label: "Registry",
                        val: "Official",
                        color: "bg-tertiary-500"
                    }
                ]}
            />
        </section>
    )
}

export default CelebrationsGallery