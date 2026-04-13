'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media, Race } from '@/payload-types';
import { motion } from 'framer-motion';

interface RaceCalendarProps {
    races: Race[];
}

export default function RaceCalendar({ races }: RaceCalendarProps) {
    return (
        <section className="bg-white py-32 font-sans">
            <div className="px-10 mb-24">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Temporal_Sequence</span>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black">Race_Calendar</h2>
            </div>

            <div className="relative">
                <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-zinc-100 hidden lg:block" />

                <div className="flex flex-col gap-32">
                    {races.map((race, index) => {
                        const isEven = index % 2 === 0;
                        const circuit = race.details.circuit as Circuit;
                        const winner = race.details.winner as Driver;
                        const winnerAvatar = (winner?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/winner-${race.id}/200/200`;

                        return (
                            <div key={race.id} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                                <div className={`flex-1 px-10 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className={`flex items-center gap-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                            <span className="text-sm font-black text-zinc-300 tabular-nums">ROUND_{(index + 1).toString().padStart(2, '0')}</span>
                                            <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border border-zinc-200">{race.details.type}</span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">{race.name}</h3>
                                        <div className={`flex items-center gap-2 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                            <span className="text-xs font-bold text-zinc-500">{circuit?.name || 'Street Circuit'}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="relative flex-none h-12 w-12 hidden lg:flex items-center justify-center">
                                    <div className="h-4 w-4 rotate-45 border-2 border-zinc-100 bg-white z-10" />
                                    {race.details.status === 'completed' && (
                                        <div className="absolute h-4 w-4 rotate-45 animate-ping opacity-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    )}
                                </div>

                                <div className="flex-1 px-10 w-full lg:w-auto">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="bg-zinc-50 border border-zinc-100 p-6 flex items-center justify-between"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</span>
                                            <span className={`text-[10px] font-black uppercase ${race.details.status === 'completed' ? 'text-black' : 'text-primary'}`} style={{ color: race.details.status !== 'completed' ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {race.details.status}
                                            </span>
                                        </div>

                                        {race.details.status === 'completed' ? (
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Winner</span>
                                                    <span className="text-xs font-black uppercase italic">{(winner as any)?.basics?.last_name || 'Driver'}</span>
                                                </div>
                                                <div className="h-10 w-10 overflow-hidden bg-zinc-200 grayscale">
                                                    <img src={winnerAvatar} alt="" className="h-full w-full object-cover" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Commences</span>
                                                <span className="text-xs font-black tabular-nums">{new Date(race.details.start_date!).toLocaleDateString('en-GB')}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}