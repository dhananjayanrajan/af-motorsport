'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Driver, Media } from '@/payload-types';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface PodiumProps {
    championship: Championship;
}

export default function Podium({ championship }: PodiumProps) {
    const winner = championship.details?.winner as Driver;
    const runnerUp = championship.details?.runner_up as Driver;
    const thirdPlace = championship.details?.third_place as Driver;

    const getPortrait = (driver?: Driver) =>
        (driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/driver-${driver?.id}/400/600`;

    const podiumData = [
        {
            driver: runnerUp,
            position: '02',
            height: 'h-[450px]',
            order: 'order-1',
            delay: 0.2
        },
        {
            driver: winner,
            position: '01',
            height: 'h-[550px]',
            order: 'order-2',
            isWinner: true,
            delay: 0
        },
        {
            driver: thirdPlace,
            position: '03',
            height: 'h-[380px]',
            order: 'order-3',
            delay: 0.4
        }
    ];

    return (
        <section className="w-full py-32 bg-white">
            <div className="max-w-7xl mx-auto px-10">
                <div className="flex flex-col items-center mb-20">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-400 mb-4">Season Results</span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic text-black">Championship Podium</h2>
                </div>

                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0">
                    {podiumData.map((spot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: spot.delay, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative w-full md:w-1/3 flex flex-col ${spot.order}`}
                        >
                            <div className={`relative w-full ${spot.height} overflow-hidden bg-zinc-100 group`}>
                                {spot.driver ? (
                                    <>
                                        <img
                                            src={getPortrait(spot.driver)}
                                            alt={spot.driver.last_name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Points_Total</span>
                                                    <div className="h-px flex-1 bg-white/20" />
                                                </div>
                                                <span className="text-4xl font-black text-white tabular-nums italic">
                                                    {championship.details?.points_system ? 'TBD' : '000'}
                                                </span>
                                            </div>
                                        </div>

                                        {spot.isWinner && (
                                            <div
                                                className="absolute top-0 right-0 px-4 py-2 flex items-center gap-2"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                            >
                                                <Trophy size={14} className="text-black" />
                                                <span className="text-[10px] font-black text-black uppercase tracking-widest">Champion</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-200">
                                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">TBD</span>
                                    </div>
                                )}
                            </div>

                            <div className="py-8 bg-zinc-50 border-x border-b border-zinc-100 px-8">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Position</span>
                                        <span className="text-2xl font-black italic text-black tabular-nums">{spot.position}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Identity</span>
                                        <h3 className="text-xl font-black uppercase italic text-black leading-none">
                                            {spot.driver ? `${spot.driver.first_name[0]}. ${spot.driver.last_name}` : 'Awaiting Result'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}