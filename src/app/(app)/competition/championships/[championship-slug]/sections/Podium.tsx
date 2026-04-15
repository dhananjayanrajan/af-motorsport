'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Driver, Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ShieldCheck, Target, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';

interface PodiumProps {
    championship: Championship;
}

export default function Podium({ championship }: PodiumProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const winner = championship.details?.winner as Driver;
    const runnerUp = championship.details?.runner_up as Driver;
    const thirdPlace = championship.details?.third_place as Driver;

    const getPortrait = (driver?: Driver) =>
        (driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/driver-${driver?.id}/600/800`;

    const getDriverTeam = (driver?: Driver) => {
        const car = driver?.details?.cars?.[0] as any;
        return car?.name || 'TBA';
    };

    const getDriverPoints = (driver?: Driver) => {
        const points = driver?.details?.points?.[0] as any;
        return points?.total || '--';
    };

    const podiumData = [
        {
            driver: runnerUp,
            position: 'P02',
            height: 'h-[400px] md:h-[500px]',
            width: 'w-full md:w-[33%]',
            zIndex: 'z-20',
            clip: 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)',
            delay: 0.1,
            accent: DESIGN_SYSTEM.COLORS.SECONDARY[500],
            initialY: 60,
            order: 'order-2 md:order-1'
        },
        {
            driver: winner,
            position: 'P01',
            height: 'h-[450px] md:h-[620px]',
            width: 'w-full md:w-[34%]',
            zIndex: 'z-30',
            clip: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
            delay: 0,
            isWinner: true,
            accent: DESIGN_SYSTEM.COLORS.PRIMARY[500],
            initialY: 60,
            order: 'order-1 md:order-2'
        },
        {
            driver: thirdPlace,
            position: 'P03',
            height: 'h-[350px] md:h-[420px]',
            width: 'w-full md:w-[33%]',
            zIndex: 'z-10',
            clip: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
            delay: 0.2,
            accent: DESIGN_SYSTEM.COLORS.TERTIARY[500],
            initialY: 60,
            order: 'order-3'
        }
    ];

    return (
        <section className="relative w-full py-20 md:py-40 overflow-hidden bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-900" />
                <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-900" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-900" />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
                <div className="flex flex-col mb-12 md:mb-24 relative">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <BarChart3 size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT}`} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[600] }}>Official Standings</span>
                    </motion.div>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none"
                    >
                        <span style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>Podium</span>
                        <br />
                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Standings</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 120 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 mt-6"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-end justify-center space-y-12 md:space-y-0">
                    {podiumData.map((spot, index) => (
                        <motion.div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: spot.initialY }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: spot.delay, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex flex-col ${spot.width} ${spot.zIndex} ${spot.order} group px-2 md:px-0`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, y: -8 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                className={`relative w-full ${spot.height} overflow-hidden border ${DESIGN_SYSTEM.COLORS.ZINC[200]} bg-zinc-100 shadow-xl md:shadow-2xl transition-shadow duration-500 group-hover:shadow-black/10 group-hover:${DESIGN_SYSTEM.COLORS.ZINC[400]}`}
                                style={{ clipPath: spot.clip }}
                            >
                                {spot.driver ? (
                                    <>
                                        <motion.img
                                            animate={{
                                                scale: hoveredIndex === index ? 1.08 : 1,
                                                filter: hoveredIndex === index ? 'grayscale(0%) contrast(100%)' : 'grayscale(100%) contrast(110%)'
                                            }}
                                            transition={{ duration: 0.6 }}
                                            src={getPortrait(spot.driver)}
                                            alt={spot.driver.last_name}
                                            className="w-full h-full object-cover origin-bottom"
                                        />

                                        <motion.div
                                            animate={{ opacity: hoveredIndex === index ? 0.4 : 0.2 }}
                                            className="absolute inset-0 transition-colors duration-500"
                                            style={{ backgroundColor: spot.accent }}
                                        />

                                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)` }} />

                                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                            <div className="flex items-end justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Target size={12} style={{ color: spot.accent }} />
                                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Position</span>
                                                    </div>
                                                    <span className="text-5xl md:text-7xl font-black italic text-white drop-shadow-2xl leading-none">
                                                        {spot.position}
                                                    </span>
                                                </div>
                                                {spot.isWinner && (
                                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                        <Trophy size={14} className="text-yellow-400" />
                                                        <span className="text-[9px] font-black uppercase tracking-wider text-white">Champion</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <motion.div
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                scale: hoveredIndex === index ? 1 : 0.5,
                                                rotate: hoveredIndex === index ? 0 : -45
                                            }}
                                            className="absolute top-6 right-6"
                                        >
                                            <Zap size={24} className="text-white/80 fill-white/80" />
                                        </motion.div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 border-2 border-dashed border-zinc-200">
                                        <ShieldCheck size={32} className="text-zinc-200 mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Data Missing</span>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                animate={{
                                    backgroundColor: hoveredIndex === index ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.WHITE[50],
                                    borderColor: hoveredIndex === index ? spot.accent : DESIGN_SYSTEM.COLORS.ZINC[900]
                                }}
                                className="border relative z-10 p-8 md:p-10 transition-colors duration-300"
                            >
                                <motion.div
                                    animate={{
                                        width: hoveredIndex === index ? '100%' : '40px',
                                        backgroundColor: spot.accent
                                    }}
                                    className="absolute top-0 right-0 h-1.5 transition-all duration-500"
                                />

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 block">{spot.driver.basics?.competition_name}</span>
                                                <motion.h3
                                                    animate={{ color: hoveredIndex === index ? spot.accent : DESIGN_SYSTEM.COLORS.BLACK[50] }}
                                                    className="text-xl md:text-2xl font-black uppercase italic leading-tight"
                                                >
                                                    {spot.driver ? `${spot.driver.first_name} ${spot.driver.last_name}` : 'Awaiting Data'}
                                                </motion.h3>
                                            </div>
                                            {spot.isWinner && (
                                                <div className="md:hidden">
                                                    <Trophy size={20} className="text-yellow-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {hoveredIndex === index && spot.driver && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Team</span>
                                                        <span className="text-xs font-bold text-white uppercase italic">{getDriverTeam(spot.driver)}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Points</span>
                                                        <span className="text-xs font-bold text-white uppercase italic">{getDriverPoints(spot.driver)}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}