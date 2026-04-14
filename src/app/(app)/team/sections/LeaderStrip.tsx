'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Country, Leader, Media } from '@/payload-types';
import { ArrowUpRight, Crown, Shield, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LeaderStrip({ leaders }: { leaders: Leader[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section
            className="w-full min-h-screen py-32 px-6 md:px-12 lg:px-20"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            <div className="max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Crown size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span
                            className="text-xs font-black uppercase tracking-[0.3em]"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                        >
                            Executive Leadership
                        </span>
                    </div>
                    <h2
                        className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] max-w-5xl"
                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                    >
                        The <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Council</span><br />
                        of Visionaries
                    </h2>
                </motion.div>

                <div className="space-y-1">
                    {leaders.map((leader, index) => {
                        const avatarUrl = (leader.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${leader.id}/1000/1200`;
                        const nationality = (leader.basics?.nationality as Country)?.name;
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={leader.id}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                className="group relative border-b last:border-b-0"
                                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                            >
                                <Link href={`/team/leader/${leader.slug}`} className="block">
                                    <div className="flex flex-col md:flex-row md:items-center py-8 md:py-10 transition-all duration-500 group-hover:py-12">
                                        <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                                            <motion.span
                                                animate={{
                                                    color: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_700
                                                }}
                                                className="text-5xl md:text-6xl lg:text-7xl font-black italic tabular-nums tracking-tighter"
                                            >
                                                {(index + 1).toString().padStart(2, '0')}
                                            </motion.span>

                                            <div className="relative">
                                                <motion.div
                                                    animate={{ opacity: isActive ? 1 : 0 }}
                                                    className="absolute -inset-2 rounded-full opacity-20 blur-xl"
                                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                                />
                                                <div className="relative size-16 md:size-20 rounded-full overflow-hidden border-2 transition-colors"
                                                    style={{
                                                        borderColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : 'rgba(255,255,255,0.1)'
                                                    }}
                                                >
                                                    <img
                                                        src={avatarUrl}
                                                        alt={`${leader.first_name} ${leader.last_name}`}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 ml-0 md:ml-8">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span
                                                            className="text-xs font-black uppercase tracking-wider"
                                                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                                        >
                                                            {leader.basics?.title}
                                                        </span>
                                                        <Shield size={12} style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }} />
                                                    </div>
                                                    <h3
                                                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] transition-colors"
                                                        style={{
                                                            color: isActive ? DESIGN_SYSTEM.COLORS.WHITE : DESIGN_SYSTEM.COLORS.ZINC_400
                                                        }}
                                                    >
                                                        {leader.first_name} {leader.last_name}
                                                    </h3>
                                                </div>

                                                <motion.div
                                                    animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                                                    className="flex items-center gap-6"
                                                >
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                                                            {nationality}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <Star size={12} fill={DESIGN_SYSTEM.COLORS.PRIMARY} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                            <span className="text-xs font-bold text-zinc-400 uppercase">
                                                                {leader.basics?.debut_date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ArrowUpRight
                                                        size={32}
                                                        strokeWidth={2.5}
                                                        style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <motion.div
                                    animate={{ scaleX: isActive ? 1 : 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 flex justify-end"
                >
                    <div className="text-right">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 block mb-2">
                            Strategic Command
                        </span>
                        <p className="text-sm font-medium text-zinc-500 uppercase max-w-md">
                            {leaders.length} executives shaping the future of motorsport excellence
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}