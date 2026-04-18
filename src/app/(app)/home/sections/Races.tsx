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
        <section className="relative w-full min-h-screen bg-white-50 flex flex-col overflow-hidden">
            <SectionHeader
                title="RACING"
                subtitle="CALENDAR"
                variant={1}
                championships={raceAsChampionship}
            />

            <SectionScroller
                items={raceNames.length > 0 ? raceNames : ["DATABASE SYNCHRONIZATION", "CIRCUIT REGISTRY"]}
                velocity={40}
                backgroundColor="bg-secondary"
                textColor="text-black-pure"
            />

            <div className="flex-1 flex flex-col lg:flex-row w-full border-b-2 border-black-pure">
                <main className="flex-1 flex flex-col bg-white-100">
                    <div className="flex-1 grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-8 p-8 md:p-16 flex flex-col justify-between border-r-0 lg:border-r-2 border-black-pure">
                            <SectionTitle
                                variant={1}
                                label="SEASON OVERVIEW"
                                lineOne="CIRCUIT"
                                lineTwo="DYNAMICS"
                                highlight={String(new Date().getFullYear())}
                            />

                            <div className="grid grid-cols-3 gap-0 border-2 border-black-pure mt-12 bg-white-50">
                                <div className="flex flex-col items-center justify-center h-32 md:h-48 bg-primary border-r-2 border-black-pure transition-colors duration-300">
                                    <span className="text-4xl md:text-6xl font-black text-black-pure leading-none">{ongoingCount}</span>
                                    <span className="text-xs font-mono font-black tracking-widest text-black-pure uppercase mt-2">ACTIVE</span>
                                </div>
                                <div className="flex flex-col items-center justify-center h-32 md:h-48 bg-secondary border-r-2 border-black-pure transition-colors duration-300">
                                    <span className="text-4xl md:text-6xl font-black text-black-pure leading-none">{completedCount}</span>
                                    <span className="text-xs font-mono font-black tracking-widest text-black-pure uppercase mt-2">FINISH</span>
                                </div>
                                <div className="flex flex-col items-center justify-center h-32 md:h-48 bg-tertiary-500 transition-colors duration-300">
                                    <span className="text-4xl md:text-6xl font-black text-white-pure leading-none">{scheduledCount}</span>
                                    <span className="text-xs font-mono font-black tracking-widest text-white-pure uppercase mt-2">UPCOMING</span>
                                </div>
                            </div>

                            <div className="mt-16">
                                <SectionDescription
                                    variant={1}
                                    text="Detailed records of official race events including performance analytics and technical outcomes."
                                />
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:col-span-4 bg-white-300 relative overflow-hidden group">
                            {races[0] && (races[0].assets?.poster as Media)?.url ? (
                                <Image
                                    src={(races[0].assets?.poster as Media).url || ''}
                                    alt={races[0].name || "Featured Race"}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                            ) : (
                                <Image
                                    src={`https://picsum.photos/seed/${races[0]?.id || 'featured'}/800/1200`}
                                    alt="Featured Placeholder"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                            )}
                            <div className="absolute inset-0 border-l-2 border-black-pure" />
                        </div>
                    </div>
                </main>

                <aside className="w-full lg:w-[480px] bg-white-50 flex flex-col shrink-0 border-t-2 lg:border-t-0 lg:border-l-2 border-black-pure">
                    <div className="h-20 bg-white-200 flex items-center px-8 border-b-2 border-black-pure">
                        <span className="text-black-pure font-mono text-sm font-black tracking-[0.4em] uppercase">REGISTRY</span>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[50vh] lg:max-h-none custom-scrollbar">
                        {races.map((race, index) => (
                            <button
                                key={race.id}
                                onClick={() => setSelectedRace(race)}
                                className="w-full group flex flex-col border-b-2 border-black-pure last:border-b-0 hover:bg-white-200 transition-all duration-300 outline-none focus:bg-primary"
                            >
                                <div className="flex items-center h-24 px-8 gap-8">
                                    <div className="w-12 h-12 bg-black-pure flex items-center justify-center shrink-0 group-hover:bg-primary group-focus:bg-white-pure transition-colors duration-300">
                                        <span className="text-white-pure font-mono font-black group-hover:text-black-pure group-focus:text-black-pure transition-colors duration-300">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-start overflow-hidden">
                                        <span className="text-[10px] font-mono font-black text-tertiary-500 uppercase tracking-widest mb-1 group-focus:text-black-pure">
                                            {race.details?.type || 'FEATURE'}
                                        </span>
                                        <h4 className="text-lg font-black uppercase tracking-tighter text-black-pure truncate w-full text-left">
                                            {race.name}
                                        </h4>
                                    </div>
                                    <div className="w-2 h-12 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <SectionCTA
                        variant={1}
                        label="FULL CALENDAR"
                        path="/calendar"
                        description="Comprehensive listing of all scheduled events and circuit appearances for the current season."
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
                description={selectedRace?.basics?.description || 'RECORDS UNAVAILABLE'}
                imageUrl={(selectedRace?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${selectedRace?.id}/800/800`}
                idCode={selectedRace?.basics?.identifiers?.code || 'X0'}
                buttonLabel="OPEN"
                onAction={() => selectedRace?.slug && router.push(`/calendar/races/${selectedRace.slug}`)}
                stats={[
                    { label: 'DISTANCE', val: `${selectedRace?.details?.distance_km || '0'} KM`, color: 'bg-primary' },
                    { label: 'STATUS', val: selectedRace?.details?.status || 'OFFLINE', color: 'bg-secondary' },
                    { label: 'FORMAT', val: selectedRace?.details?.type || 'DEFAULT', color: 'bg-tertiary-500' },
                    { label: 'CYCLES', val: String(selectedRace?.details?.laps || '0'), color: 'bg-white-400' },
                ]}
            />
        </section>
    )
}

export default LatestRaces