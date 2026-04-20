'use client'

import { Championship, Media, Race } from '@/payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import SectionCTA from '@/components/Section/CTA'
import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionModal from '@/components/Section/Modal'
import SectionScroller from '@/components/Section/Scroller'
import SectionTitle from '@/components/Section/Title'

interface LatestRacesProps {
    races?: Race[]
}

const LatestRaces: React.FC<LatestRacesProps> = ({ races = [] }) => {
    const [selectedRace, setSelectedRace] = useState<Race | null>(null)
    const router = useRouter()

    const raceNames = races.map((r) => r.name)
    const activeCount = races.filter((r) => r.details?.status === 'ongoing').length
    const overCount = races.filter((r) => r.details?.status === 'completed').length
    const upcomingCount = races.filter((r) => r.details?.status === 'scheduled').length

    const raceAsChampionship = races.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        basics: {
            identifiers: {
                abbreviation: r.basics?.identifiers?.abbreviation || r.basics?.identifiers?.code || 'RC',
            },
        },
    })) as unknown as Championship[]

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure">
            <SectionHeader
                title="RACING"
                subtitle="CALENDAR"
                variant={1}
                championships={raceAsChampionship}
            />

            <SectionScroller
                items={raceNames.length > 0 ? raceNames : ['RACE LIST', 'TRACK DATA']}
                velocity={30}
                backgroundColor="bg-secondary-500"
                textColor="text-black-pure font-black"
                variant={5}
            />

            <div className="flex-1 flex flex-col lg:flex-row w-full border-b border-black-pure">
                <main className="flex-1 flex flex-col bg-white-pure overflow-hidden">
                    <div className="flex-1 grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-7 p-6 md:p-10 flex flex-col border-r border-black-pure overflow-hidden">
                            <SectionTitle
                                variant={1}
                                label="SEASON OVERVIEW"
                                lineOne="TRACK"
                                lineTwo="DATA"
                                highlight={String(new Date().getFullYear())}
                            />

                            <div className="grid grid-cols-3 bg-white-pure border border-black-pure mt-6">
                                <button
                                    className="flex flex-col items-center justify-center py-6 border-r border-black-pure bg-primary-500 hover:bg-black-pure hover:text-white-pure focus:bg-secondary-500 focus:text-black-pure transition-colors outline-none group"
                                    onClick={() => router.push('/races?status=active')}
                                >
                                    <span className="text-2xl md:text-4xl font-race font-black leading-none">
                                        {activeCount}
                                    </span>
                                    <span className="text-[9px] font-mono font-black tracking-widest uppercase mt-2">
                                        ACTIVE
                                    </span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center py-6 border-r border-black-pure bg-secondary-500 hover:bg-black-pure hover:text-white-pure focus:bg-primary-500 focus:text-black-pure transition-colors outline-none group"
                                    onClick={() => router.push('/races?status=completed')}
                                >
                                    <span className="text-2xl md:text-4xl font-race font-black leading-none">
                                        {overCount}
                                    </span>
                                    <span className="text-[9px] font-mono font-black tracking-widest uppercase mt-2">
                                        DONE
                                    </span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center py-6 bg-tertiary-500 text-white-pure hover:bg-black-pure hover:text-white-pure focus:bg-primary-500 focus:text-black-pure transition-colors outline-none group"
                                    onClick={() => router.push('/races?status=scheduled')}
                                >
                                    <span className="text-2xl md:text-4xl font-race font-black leading-none">
                                        {upcomingCount}
                                    </span>
                                    <span className="text-[9px] font-mono font-black tracking-widest uppercase mt-2">
                                        NEXT
                                    </span>
                                </button>
                            </div>

                            <div className="mt-6">
                                <SectionDescription
                                    variant={1}
                                    text="Performance data and technical analysis from each competition."
                                />
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden group">
                            <Image
                                src={
                                    (races[0]?.assets?.poster as Media)?.url ||
                                    `https://picsum.photos/seed/${races[0]?.id || 'race'}/800/1000`
                                }
                                alt={races[0]?.name || 'Current'}
                                fill
                                priority
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary-500 opacity-10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 bg-white-pure p-5 border-t border-black-pure translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-primary-500 font-mono text-[9px] font-black uppercase tracking-widest block mb-1">
                                    MAIN EVENT
                                </span>
                                <span className="text-black-pure font-race text-base uppercase font-black">
                                    {races[0]?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="w-full lg:w-80 flex flex-col shrink-0 border-t lg:border-t-0 lg:border-l border-black-pure bg-white-pure">
                    <div className="h-14 flex items-center px-5 border-b border-black-pure justify-between bg-white-200">
                        <span className="text-black-pure font-mono text-[9px] font-black tracking-widest uppercase">
                            RACE LIST
                        </span>
                        <button
                            className="text-[9px] font-mono font-black text-primary-500 uppercase hover:text-black-pure focus:text-tertiary-500 transition-colors outline-none"
                            onClick={() => router.push('/calendar')}
                        >
                            ALL
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-80 lg:max-h-none">
                        {races.map((race, index) => (
                            <button
                                key={race.id}
                                onClick={() => setSelectedRace(race)}
                                className="w-full group flex items-stretch border-b border-black-pure last:border-b-0 hover:bg-primary-500 focus:bg-secondary-500 transition-colors outline-none text-left min-w-0"
                            >
                                <div className="w-12 flex items-center justify-center bg-black-pure text-white-pure border-r border-black-pure shrink-0 group-hover:bg-white-pure group-hover:text-black-pure transition-colors">
                                    <span className="font-mono text-[10px] font-black">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                                    <span className="text-[8px] font-mono font-black text-tertiary-500 uppercase tracking-widest group-hover:text-black-pure transition-colors block truncate mb-0.5">
                                        {race.details?.type || 'EVENT'}
                                    </span>
                                    <h4 className="text-xs font-race font-black uppercase tracking-tighter text-black-pure truncate">
                                        {race.name}
                                    </h4>
                                </div>
                            </button>
                        ))}
                    </div>

                    <SectionCTA
                        variant={1}
                        label="FULL LIST"
                        path="/calendar"
                        description="Complete schedule for the current season."
                        onClick={() => router.push('/calendar')}
                    />
                </aside>
            </div>

            <SectionFooter variant={1} championships={raceAsChampionship} />

            <SectionModal
                isOpen={!!selectedRace}
                onClose={() => setSelectedRace(null)}
                title={selectedRace?.name || ''}
                description={selectedRace?.basics?.description || 'Information currently being updated.'}
                imageUrl={
                    (selectedRace?.assets?.cover as Media)?.url ||
                    `https://picsum.photos/seed/${selectedRace?.id}/800/800`
                }
                idCode={selectedRace?.basics?.identifiers?.code || 'RC'}
                buttonLabel="VIEW DATA"
                onAction={() =>
                    selectedRace?.slug && router.push(`/calendar/races/${selectedRace.slug}`)
                }
                stats={[
                    {
                        label: 'LENGTH',
                        val: `${selectedRace?.details?.distance_km || '0'} KM`,
                        color: 'bg-primary-500',
                    },
                    { label: 'STATUS', val: selectedRace?.details?.status || 'WAIT', color: 'bg-secondary-500' },
                    { label: 'TYPE', val: selectedRace?.details?.type || 'CORE', color: 'bg-tertiary-500' },
                    { label: 'ROUNDS', val: String(selectedRace?.details?.laps || '0'), color: 'bg-white-300' },
                ]}
            />
        </section>
    )
}

export default LatestRaces