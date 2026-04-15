'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Country, Leader, Media } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Crown, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LeaderStrip({ leaders }: { leaders: Leader[] }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            className="w-full py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
        >
            <div className="max-w-[1440px] mx-auto">
                {/* Header Logic */}
                <div className="mb-40 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Crown size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span
                                className="text-[10px] font-black uppercase tracking-[0.4em]"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                            >
                                Management_Core_v2.0
                            </span>
                        </div>
                        <h2
                            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85]"
                            style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                        >
                            The <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Vision</span><br />
                            Collective
                        </h2>
                    </div>
                    <div className="hidden md:block text-right max-w-xs">
                        <p className="text-[10px] font-bold uppercase leading-relaxed text-zinc-500">
                            Strategically driving the technical and creative evolution of the motorsport grid through precision leadership.
                        </p>
                    </div>
                </div>

                {/* Interactive List */}
                <div className="relative border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    {leaders.map((leader, index) => (
                        <LeaderRow
                            key={leader.id}
                            leader={leader}
                            index={index}
                            isHovered={hoveredId === leader.id}
                            onHover={() => setHoveredId(leader.id)}
                            onLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>

                {/* Floating Preview Asset */}
                <AnimatePresence>
                    {hoveredId !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed pointer-events-none z-50 overflow-hidden border-2"
                            style={{
                                width: '320px',
                                height: '400px',
                                left: mousePos.x + 40,
                                top: mousePos.y - 200,
                                borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[900]
                            }}
                        >
                            <img
                                src={(leaders.find(l => l.id === hoveredId)?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${hoveredId}/600/800`}
                                alt="Preview"
                                className="w-full h-full object-cover grayscale-0 brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function LeaderRow({
    leader,
    index,
    isHovered,
    onHover,
    onLeave
}: {
    leader: Leader;
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    const nationality = (leader.basics?.nationality as Country)?.name || 'Global';

    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="group relative border-b transition-colors"
            style={{
                borderColor: 'rgba(255,255,255,0.05)',
                backgroundColor: isHovered ? 'rgba(255,255,255,0.02)' : 'transparent'
            }}
        >
            <Link href={`/team/leader/${leader.slug}`} className="block py-12 md:py-16">
                <div className="flex flex-col md:flex-row md:items-center gap-12">
                    {/* Index & Status */}
                    <div className="flex items-center gap-8 min-w-[120px]">
                        <span
                            className="text-sm font-black italic tabular-nums"
                            style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[700] }}
                        >
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div
                            className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", isHovered ? "scale-150 animate-pulse" : "scale-100")}
                            style={{ backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[800] }}
                        />
                    </div>

                    {/* Main Name & Title Stack */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-2 mb-4">
                            <span
                                className="text-[10px] font-black uppercase tracking-widest"
                                style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[300] : DESIGN_SYSTEM.COLORS.ZINC[500] }}
                            >
                                {leader.basics?.title || 'Operational Lead'}
                            </span>
                            <h3
                                className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter transition-all duration-500"
                                style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                {leader.first_name} <span className="text-zinc-500 group-hover:text-white transition-colors">{leader.last_name}</span>
                            </h3>
                        </div>
                    </div>

                    {/* Metadata Specs */}
                    <div className="flex items-center gap-16">
                        <div className="hidden lg:flex flex-col items-end text-right">
                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest mb-1">Origin_ID</span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">{nationality}</span>
                        </div>

                        <div className="hidden sm:flex flex-col items-end text-right">
                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest mb-1">Access_Protocol</span>
                            <div className="flex items-center gap-2">
                                <Zap size={10} style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[800] }} />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Lvl_0{index + 1}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-4 border transition-colors group-hover:bg-primary-500"
                            style={{
                                borderColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : 'rgba(255,255,255,0.1)',
                                backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : 'transparent'
                            }}
                        >
                            <ArrowUpRight size={24} className={isHovered ? "text-black" : "text-zinc-700"} />
                        </div>
                    </div>
                </div>
            </Link>

            {/* Background Hover Stripe */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                className="absolute top-0 left-0 w-full h-[1px] origin-left"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
            />
        </motion.div>
    );
}