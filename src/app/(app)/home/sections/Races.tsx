'use client'

import { Championship, Media, Race } from '@/payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import SectionCTA from '@/components/Section/CTA'
import SectionDescription from '@/components/Section/Description'
import SectionModal from '@/components/Section/Modal'
import SectionScroller from '@/components/Section/Scroller'
import SectionTitle from '@/components/Section/Title'

interface LatestRacesProps {
    races?: Race[] | null
}

const LatestRaces: React.FC<LatestRacesProps> = ({ races = [] }) => {
    const [selectedRace, setSelectedRace] = useState<Race | null>(null)
    const router = useRouter()

    const raceList = races || []
    const raceNames = raceList.map((r) => r.name || 'UNIT_ID')

    const activeCount = raceList.filter((r) => r.details?.status === 'ongoing').length
    const overCount = raceList.filter((r) => r.details?.status === 'completed').length
    const upcomingCount = raceList.filter((r) => r.details?.status === 'scheduled').length

    const raceAsChampionship = raceList.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        basics: {
            identifiers: {
                abbreviation: r.basics?.identifiers?.abbreviation || r.basics?.identifiers?.code || 'RC',
            },
        },
    })) as unknown as Championship[]

    const stats = [
        { label: 'Active', count: activeCount, color: 'bg-primary-500', text: 'text-black-pure', query: 'active' },
        { label: 'Done', count: overCount, color: 'bg-secondary-500', text: 'text-black-pure', query: 'completed' },
        { label: 'Next', count: upcomingCount, color: 'bg-tertiary-500', text: 'text-white-pure', query: 'scheduled' }
    ]

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure outline-none" tabIndex={0}>
            <SectionHeader
                title="RACING"
                subtitle="CALENDAR"
                variant={3}
                championships={raceAsChampionship}
            />

            <SectionScroller
                items={raceNames.length > 0 ? raceNames : ['SYSTEM_SYNC', 'FEED_ACTIVE']}
                velocity={40}
                backgroundColor="bg-black-pure"
                textColor="text-primary-500 font-black"
                variant={2}
            />

            <div className="flex-1 flex flex-col lg:flex-row w-full border-b border-black-pure">
                <main className="flex-1 flex flex-col bg-white-pure overflow-hidden">
                    <div className="flex-1 grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col border-r border-black-pure">
                            <SectionTitle
                                variant={1}
                                label="SEASON STATUS"
                                lineOne="TRACK"
                                lineTwo="DATA"
                                highlight={String(new Date().getFullYear())}
                            />

                            <div className="grid grid-cols-3 border border-black-pure mt-8 overflow-hidden bg-black-pure">
                                {stats.map((stat) => (
                                    <button
                                        key={stat.label}
                                        className={`flex flex-col items-center justify-center py-6 border-r border-black-pure last:border-r-0 ${stat.color} ${stat.text} hover:bg-black-pure hover:text-primary-500 focus:bg-white-pure focus:text-black-pure active:bg-secondary-500 transition-colors duration-100 outline-none group`}
                                        onClick={() => router.push(`/races?status=${stat.query}`)}
                                    >
                                        <span className="text-3xl md:text-4xl font-black leading-none">
                                            {stat.count}
                                        </span>
                                        <span className="text-xs font-black uppercase tracking-normal mt-2">
                                            {stat.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 max-w-lg">
                                <SectionDescription
                                    variant={1}
                                    text="Operational data streams and technical logs synchronized for the current circuit cycle."
                                />
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden group">
                            <Image
                                src={(raceList[0]?.assets?.poster as Media)?.url || `https://picsum.photos/seed/${raceList[0]?.id || 'race'}/1200/1600`}
                                alt={raceList[0]?.name || 'Current'}
                                fill
                                priority
                                className="object-cover transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary-500 mix-blend-multiply opacity-10 group-hover:opacity-0 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 bg-primary-500 p-6 border-t border-black-pure translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-black-pure text-[10px] font-black uppercase tracking-normal block mb-1 opacity-60">
                                    Primary Assignment
                                </span>
                                <span className="text-black-pure text-lg md:text-xl uppercase font-black leading-none">
                                    {raceList[0]?.name || 'PENDING_ID'}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="w-full lg:w-80 flex flex-col shrink-0 border-t lg:border-t-0 lg:border-l border-black-pure bg-white-pure">
                    <div className="h-14 flex items-center px-6 border-b border-black-pure justify-between bg-primary-500 text-black-pure">
                        <span className="text-xs font-black tracking-normal uppercase">
                            Registry
                        </span>
                        <button
                            className="text-[10px] font-black bg-black-pure text-white-pure px-3 py-1 uppercase hover:bg-white-pure hover:text-black-pure focus:bg-secondary-500 transition-colors outline-none"
                            onClick={() => router.push('/calendar')}
                        >
                            All Data
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-80 lg:max-h-none">
                        {raceList.map((race, index) => (
                            <button
                                key={race.id || index}
                                onClick={() => setSelectedRace(race)}
                                className="w-full group flex items-stretch border-b border-black-pure last:border-b-0 hover:bg-black-pure focus:bg-secondary-500 transition-colors duration-100 outline-none text-left"
                            >
                                <div className="w-12 flex items-center justify-center bg-black-pure text-primary-500 border-r border-black-pure shrink-0 group-hover:bg-primary-500 group-hover:text-black-pure transition-colors">
                                    <span className="text-base font-black">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="flex-1 p-4 flex flex-col justify-center min-w-0 group-hover:text-white-pure">
                                    <span className="text-[10px] font-black text-tertiary-500 uppercase leading-none mb-1 group-hover:text-primary-500">
                                        {race.details?.type || 'CORE_EVENT'}
                                    </span>
                                    <h4 className="text-sm font-black uppercase leading-tight truncate">
                                        {race.name || 'MISSING_DATA'}
                                    </h4>
                                </div>
                            </button>
                        ))}
                    </div>

                    <SectionCTA
                        variant={1}
                        label="View Full Registry"
                        path="/calendar"
                        description="Access total season logs and schedules."
                        onClick={() => router.push('/calendar')}
                    />
                </aside>
            </div>

            <SectionFooter variant={3} championships={raceAsChampionship} />

            <SectionModal
                isOpen={!!selectedRace}
                onClose={() => setSelectedRace(null)}
                title={selectedRace?.name || 'Unit Identification'}
                description={selectedRace?.basics?.description || 'Operational data synchronization pending.'}
                imageUrl={(selectedRace?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${selectedRace?.id || 'detail'}/800/800`}
                idCode={selectedRace?.basics?.identifiers?.code || 'RC-XX'}
                buttonLabel="Access Log"
                onAction={() => selectedRace?.slug && router.push(`/calendar/races/${selectedRace.slug}`)}
                stats={[
                    { label: 'Range', val: `${selectedRace?.details?.distance_km || '0'} KM`, color: 'bg-primary-500' },
                    { label: 'Status', val: selectedRace?.details?.status || 'Standby', color: 'bg-secondary-500' },
                    { label: 'Type', val: selectedRace?.details?.type || 'Core', color: 'bg-tertiary-500' },
                    { label: 'Inter', val: String(selectedRace?.details?.laps || '0'), color: 'bg-black-pure text-white-pure' },
                ]}
            />
        </section>
    )
}

export default LatestRaces