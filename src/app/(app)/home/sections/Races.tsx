"use client"

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

    const raceNames = races.map(r => r.name)
    const ongoingCount = races.filter(r => r.details?.status === 'ongoing').length
    const completedCount = races.filter(r => r.details?.status === 'completed').length
    const scheduledCount = races.filter(r => r.details?.status === 'scheduled').length

    const raceAsChampionship = races.map(r => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        basics: {
            identifiers: {
                abbreviation: r.basics?.identifiers?.abbreviation || r.basics?.identifiers?.code || 'RC'
            }
        }
    })) as unknown as Championship[]

    return (
        <section className="relative w-full min-h-screen bg-white-50 flex flex-col overflow-hidden rounded-none">
            <SectionHeader
                title="RACING"
                subtitle="CALENDAR"
                variant={1}
                championships={raceAsChampionship}
            />

            <SectionScroller
                items={raceNames.length > 0 ? raceNames : ["RACE CALENDAR", "CIRCUIT SCHEDULE"]}
                velocity={40}
                backgroundColor="bg-secondary"
                textColor="text-black-pure"
                variant={5}
            />

            <div className="flex-1 flex flex-col lg:flex-row w-full border-b-2 border-black-pure rounded-none">
                <main className="flex-1 flex flex-col bg-white-100 rounded-none">
                    <div className="flex-1 grid grid-cols-12 rounded-none">
                        <div className="col-span-12 lg:col-span-8 p-8 md:p-16 flex flex-col justify-start border-r-0 lg:border-r-2 border-black-pure rounded-none">
                            <SectionTitle
                                variant={1}
                                label="SEASON OVERVIEW"
                                lineOne="CIRCUIT"
                                lineTwo="DYNAMICS"
                                highlight={String(new Date().getFullYear())}
                            />

                            <div className="grid grid-cols-3 gap-0 border-2 border-black-pure mt-12 bg-white-50 rounded-none">
                                <button
                                    className="flex flex-col items-center justify-center h-32 md:h-48 bg-primary border-r-2 border-black-pure rounded-none transition-all duration-200 ease-in-out hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={() => router.push('/races?status=active')}
                                >
                                    <span className="text-4xl md:text-6xl font-black text-black-pure leading-none">{ongoingCount}</span>
                                    <span className="text-xs font-sans font-black tracking-widest text-black-pure uppercase mt-2">ACTIVE</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center h-32 md:h-48 bg-secondary border-r-2 border-black-pure rounded-none transition-all duration-200 ease-in-out hover:bg-secondary-600 focus:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={() => router.push('/races?status=completed')}
                                >
                                    <span className="text-4xl md:text-6xl font-black text-black-pure leading-none">{completedCount}</span>
                                    <span className="text-xs font-sans font-black tracking-widest text-black-pure uppercase mt-2">FINISHED</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center h-32 md:h-48 bg-tertiary-500 rounded-none transition-all duration-200 ease-in-out hover:bg-tertiary-600 focus:bg-tertiary-600 active:bg-tertiary-700 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={() => router.push('/races?status=scheduled')}
                                >
                                    <span className="text-4xl md:text-6xl font-black text-white-pure leading-none">{scheduledCount}</span>
                                    <span className="text-xs font-sans font-black tracking-widest text-white-pure uppercase mt-2">SCHEDULED</span>
                                </button>
                            </div>

                            <div className="mt-16">
                                <SectionDescription
                                    variant={1}
                                    text="Complete race results with performance data and technical analysis from each competition."
                                />
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:col-span-4 bg-white-300 relative overflow-hidden rounded-none group cursor-pointer">
                            {races[0] && (races[0].assets?.poster as Media)?.url ? (
                                <Image
                                    src={(races[0].assets?.poster as Media).url || ''}
                                    alt={races[0].name || "Current Race"}
                                    fill
                                    className="object-cover grayscale rounded-none transition-all duration-500 ease-out group-hover:grayscale-0"
                                />
                            ) : (
                                <Image
                                    src={`https://picsum.photos/seed/${races[0]?.id || 'featured'}/800/1200`}
                                    alt="Race Preview"
                                    fill
                                    className="object-cover grayscale rounded-none transition-all duration-500 ease-out group-hover:grayscale-0"
                                />
                            )}
                            <div className="absolute inset-0 border-l-2 border-black-pure rounded-none" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black-pure p-6 translate-y-full transition-all duration-400 ease-in-out group-hover:translate-y-0 group-focus:translate-y-0">
                                <span className="text-primary-500 font-sans text-sm font-black uppercase tracking-widest block mb-2">FEATURED</span>
                                <span className="text-white-pure font-race text-xl uppercase font-black">{races[0]?.name || 'SEASON OPENER'}</span>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="w-full lg:w-[480px] bg-white-50 flex flex-col shrink-0 border-t-2 lg:border-t-0 lg:border-l-2 border-black-pure rounded-none">
                    <div className="h-20 bg-white-200 flex items-center px-8 border-b-2 border-black-pure rounded-none justify-between">
                        <span className="text-black-pure font-sans text-sm font-black tracking-[0.4em] uppercase">RACE CALENDAR</span>
                        <button
                            className="text-xs font-sans font-black text-primary-500 uppercase tracking-widest transition-all duration-200 hover:text-primary-600 hover:border-b-2 hover:border-primary-500 focus:text-primary-600 focus:border-b-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => router.push('/calendar')}
                        >
                            VIEW ALL
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[50vh] lg:max-h-none rounded-none">
                        {races.map((race, index) => (
                            <button
                                key={race.id}
                                onClick={() => setSelectedRace(race)}
                                className="w-full group flex flex-col border-b-2 border-black-pure last:border-b-0 rounded-none transition-all duration-200 ease-in-out hover:bg-primary focus:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
                            >
                                <div className="flex items-center h-24 px-8 gap-8 rounded-none transition-all duration-200 ease-in-out group-hover:pl-12 group-focus:pl-12">
                                    <div className="w-12 h-12 bg-black-pure flex items-center justify-center shrink-0 rounded-none transition-all duration-200 ease-in-out group-hover:bg-white-pure group-focus:bg-white-pure">
                                        <span className="text-white-pure font-sans font-black transition-all duration-200 ease-in-out group-hover:text-black-pure group-focus:text-black-pure">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-start overflow-hidden rounded-none">
                                        <span className="text-[10px] font-sans font-black text-tertiary-500 uppercase tracking-widest mb-1 transition-all duration-200 ease-in-out group-hover:text-black-pure group-hover:tracking-[0.3em] group-focus:text-black-pure group-focus:tracking-[0.3em]">
                                            {race.details?.type || 'CHAMPIONSHIP'}
                                        </span>
                                        <h4 className="text-lg font-black uppercase tracking-wide text-black-pure truncate w-full text-left rounded-none transition-all duration-200 ease-in-out group-hover:text-white-pure group-hover:pl-1 group-focus:text-white-pure group-focus:pl-1">
                                            {race.name}
                                        </h4>
                                    </div>
                                    <div className="w-0 h-12 bg-primary transition-all duration-200 ease-in-out group-hover:w-2 group-hover:h-16 group-focus:w-2 group-focus:h-16 shrink-0" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <SectionCTA
                        variant={1}
                        label="FULL CALENDAR"
                        path="/calendar"
                        description="Complete schedule of all races and circuit events for the current season."
                        onClick={() => router.push('/calendar')}
                    />
                </aside>
            </div>

            <SectionFooter
                variant={1}
                championships={raceAsChampionship}
            />

            <SectionModal
                isOpen={!!selectedRace}
                onClose={() => setSelectedRace(null)}
                title={selectedRace?.name || ''}
                description={selectedRace?.basics?.description || 'Race information currently being updated'}
                imageUrl={(selectedRace?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${selectedRace?.id}/800/800`}
                idCode={selectedRace?.basics?.identifiers?.code || 'RC'}
                buttonLabel="VIEW RACE"
                onAction={() => selectedRace?.slug && router.push(`/calendar/races/${selectedRace.slug}`)}
                stats={[
                    { label: 'DISTANCE', val: `${selectedRace?.details?.distance_km || '0'} KM`, color: 'bg-primary' },
                    { label: 'STATUS', val: selectedRace?.details?.status || 'PENDING', color: 'bg-secondary' },
                    { label: 'FORMAT', val: selectedRace?.details?.type || 'STANDARD', color: 'bg-tertiary-500' },
                    { label: 'LAPS', val: String(selectedRace?.details?.laps || '0'), color: 'bg-white-400' },
                ]}
            />
        </section>
    )
}

export default LatestRaces