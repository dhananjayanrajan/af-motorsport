'use client'

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import { Championship, Driver, Media } from '@/payload-types'
import { motion } from 'framer-motion'
import { ShieldCheck, Trophy, Zap } from 'lucide-react'
import { useState } from 'react'

interface PodiumProps {
    championship: Championship
}

export default function Podium({ championship }: PodiumProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const winner = championship.details?.winner as Driver
    const runnerUp = championship.details?.runner_up as Driver
    const thirdPlace = championship.details?.third_place as Driver

    const getPortrait = (driver?: Driver) =>
        (driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${driver?.id}/800/1200`

    const getTeam = (driver?: Driver) => {
        const car = driver?.details?.cars?.[0] as any
        return car?.name || 'TBA'
    }

    const getPoints = (driver?: Driver) => {
        const pointsData = driver?.details?.points?.[0] as any
        return pointsData?.total || '000'
    }

    const podiumData = [
        {
            driver: runnerUp,
            rank: 'P02',
            label: 'Runner Up',
            height: 'h-[500px] md:h-[600px]',
            clip: 'polygon(0 0, 100% 12%, 100% 100%, 0 100%)',
            accent: 'bg-secondary-500',
            textColor: 'text-secondary-500',
            order: 'order-2 md:order-1'
        },
        {
            driver: winner,
            rank: 'P01',
            label: 'Champion',
            height: 'h-[550px] md:h-[720px]',
            clip: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)',
            accent: 'bg-primary-500',
            textColor: 'text-primary-500',
            isWinner: true,
            order: 'order-1 md:order-2'
        },
        {
            driver: thirdPlace,
            rank: 'P03',
            label: 'Third Place',
            height: 'h-[450px] md:h-[500px]',
            clip: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
            accent: 'bg-tertiary-500',
            textColor: 'text-tertiary-500',
            order: 'order-3'
        }
    ]

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure">
            <SectionHeader
                variant={1}
                title="Classification"
                subtitle="Podium Standings"
                officialLabel="Live Data"
                totalEntriesLabel="Ranked Competitors"
                championships={[championship]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure">
                <div className="p-10 lg:p-20 border-r border-black-pure flex flex-col justify-center">
                    <SectionMainTitle
                        variant={1}
                        label="Official Results"
                        lineOne="Final"
                        lineTwo="Standings"
                        highlight="Top 03"
                    />
                </div>
                <div className="p-10 lg:p-20 flex flex-col justify-center">
                    <SectionDescription
                        variant={1}
                        text="The official podium classification representing the top three drivers of the championship. All points and team associations are verified via the technical registry."
                    />
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-20 w-full">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-0">
                    {podiumData.map((spot, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col w-full md:w-1/3 ${spot.order} group`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative w-full ${spot.height} overflow-hidden bg-white-100 border-x border-t border-black-pure transition-colors duration-300 group-hover:bg-white-200`}
                                style={{ clipPath: spot.clip }}
                            >
                                {spot.driver ? (
                                    <>
                                        <img
                                            src={getPortrait(spot.driver)}
                                            alt={spot.driver.last_name}
                                            className="w-full h-full object-cover contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 origin-bottom"
                                        />
                                        <div className="absolute inset-0 bg-black-pure/10 mix-blend-multiply" />

                                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col">
                                            <div className="flex items-end justify-between">
                                                <div className="flex flex-col">
                                                    <span className={`text-6xl md:text-8xl font-black italic leading-none ${spot.textColor}`}>
                                                        {spot.rank}
                                                    </span>
                                                </div>
                                                {spot.isWinner && (
                                                    <div className="bg-primary-500 p-3 mb-2">
                                                        <Trophy size={24} className="text-black-pure" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`absolute top-12 right-0 p-6 ${spot.accent} opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                            <Zap size={24} className="text-black-pure" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-black-pure/10">
                                        <ShieldCheck size={48} className="text-black-pure/5" />
                                    </div>
                                )}
                            </motion.div>

                            <div className="relative z-10 border-2 border-black-pure p-8 bg-white-pure group-hover:bg-black-pure transition-colors duration-300">
                                <div className={`absolute top-0 left-0 h-1.5 transition-all duration-500 ${spot.accent}`} style={{ width: hoveredIndex === index ? '100%' : '15%' }} />

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-white-pure/40 mb-1">
                                            {spot.label}
                                        </span>
                                        <h3 className={`text-2xl font-black uppercase italic leading-none tracking-tighter ${hoveredIndex === index ? spot.textColor : 'text-black-pure'}`}>
                                            {spot.driver ? `${spot.driver.first_name} ${spot.driver.last_name}` : 'Standing Vacant'}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-6 pt-4 border-t border-black-pure group-hover:border-white-pure/20">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-black-pure/40 group-hover:text-white-pure/40 tracking-widest">Team</span>
                                            <span className="text-xs font-black text-black-pure group-hover:text-white-pure uppercase italic">{getTeam(spot.driver)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-black-pure/40 group-hover:text-white-pure/40 tracking-widest">Points</span>
                                            <span className={`text-xs font-black uppercase italic ${hoveredIndex === index ? spot.textColor : 'text-black-pure group-hover:text-white-pure'}`}>
                                                {getPoints(spot.driver)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SectionFooter
                variant={5}
                navigateLabel="Registry Data"
                entryPointsLabel="Championship Stats"
                championships={[]}
            />
        </section>
    )
}