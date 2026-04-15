'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Media } from '@/payload-types';
import { motion } from 'framer-motion';
import { Target, User, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface DriverSpotlightProps {
    drivers: Driver[];
}

export default function DriverSpotlight({ drivers }: DriverSpotlightProps) {
    const spotlightDrivers = drivers.slice(0, 5);

    return (
        <section className="relative w-full py-24 md:py-40 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 80%, ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW} 0%, transparent 60%)` }}
            />

            <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: DESIGN_SYSTEM.COLORS.TERTIARY.MUTED }} />

            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex flex-col mb-16 md:mb-32">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <User size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </motion.div>
                        <motion.span
                            className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            whileHover={{ letterSpacing: "0.8em" }}
                        >
                            Active Personnel
                        </motion.span>
                    </motion.div>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
                    >
                        <motion.span
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                            whileHover={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }}
                        >
                            Driver
                        </motion.span>
                        <br />
                        <motion.span
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Spotlight
                        </motion.span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-px border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200], borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                    {spotlightDrivers[0] && (
                        <div className="md:col-span-6 md:row-span-2">
                            <SpotlightCard driver={spotlightDrivers[0]} size="large" />
                        </div>
                    )}

                    {spotlightDrivers[1] && (
                        <div className="md:col-span-6 md:row-span-1">
                            <SpotlightCard driver={spotlightDrivers[1]} size="wide" />
                        </div>
                    )}

                    {spotlightDrivers[2] && (
                        <div className="md:col-span-3 md:row-span-1">
                            <SpotlightCard driver={spotlightDrivers[2]} size="square" />
                        </div>
                    )}

                    {spotlightDrivers[3] && (
                        <div className="md:col-span-3 md:row-span-1">
                            <SpotlightCard driver={spotlightDrivers[3]} size="square" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function SpotlightCard({ driver, size }: { driver: Driver; size: 'large' | 'wide' | 'square' }) {
    const [hovered, setHovered] = useState(false);
    const avatar = driver.assets?.avatar as Media;
    const isLarge = size === 'large';
    const isWide = size === 'wide';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative w-full h-full min-h-[400px] overflow-hidden flex flex-col transition-all duration-500 cursor-pointer"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className={`relative flex-1 overflow-hidden ${isLarge ? 'h-full' : ''}`}>
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                >
                    <Image
                        src={avatar?.url || `https://picsum.photos/seed/driver-${driver.id}/800/1200`}
                        alt={driver.last_name}
                        fill
                        className="object-cover"
                        style={{ filter: "grayscale(20%)" }}
                    />
                </motion.div>
                <motion.div
                    animate={{ opacity: hovered ? 0.4 : 0.2 }}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.BLACK[800]} 0%, transparent 40%)` }}
                />

                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <motion.span
                        animate={{ color: hovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[400] }}
                        className="text-4xl md:text-6xl font-black italic tracking-tighter transition-all duration-300"
                    >
                        #{driver.basics?.racing_number?.toString().padStart(2, '0') || '00'}
                    </motion.span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-col gap-1">
                        <motion.span
                            animate={{ color: hovered ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.PRIMARY[400] }}
                            className="text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                        >
                            {driver.basics?.competition_name || 'Competitor'}
                        </motion.span>
                        <h3 className="font-black uppercase italic leading-none tracking-tighter">
                            <motion.span
                                animate={{ color: hovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                className={isLarge ? 'text-4xl md:text-6xl' : 'text-3xl'}
                            >
                                {driver.first_name} <br /> {driver.last_name}
                            </motion.span>
                        </h3>
                    </div>
                </div>
            </div>

            <motion.div
                animate={{
                    backgroundColor: hovered ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.WHITE.PURE,
                    borderTopColor: hovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[100]
                }}
                className="p-6 md:p-8 transition-all duration-300 border-t"
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 mb-1">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Target size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                </motion.div>
                                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Callsign</span>
                            </div>
                            <motion.span
                                animate={{ color: hovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                className="text-xs font-bold uppercase italic transition-all duration-300"
                            >
                                {driver.basics?.callsign || 'N/A'}
                            </motion.span>
                        </div>
                        {isWide && (
                            <div className="hidden md:flex flex-col border-l pl-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Zap size={10} style={{ color: DESIGN_SYSTEM.COLORS.SECONDARY[500] }} />
                                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Status</span>
                                </div>
                                <motion.span
                                    className="text-xs font-bold uppercase italic transition-all duration-300"
                                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[600] }}
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Active Duty
                                </motion.span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute top-0 right-0 w-1 transition-all duration-500"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], height: 0 }}
                whileHover={{ height: "100%" }}
            />
        </motion.div>
    );
}