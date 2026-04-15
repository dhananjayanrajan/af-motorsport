'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Vacancy } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowRight, Clock, MapPin, Target, Zap } from 'lucide-react';
import { useState } from 'react';

interface VacanciesSectionProps {
    vacancies: Vacancy[];
}

export default function VacanciesSection({ vacancies }: VacanciesSectionProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const formatContract = (type: string) => {
        return type?.replace('_', ' ').toUpperCase() || 'OPERATIONAL';
    };

    return (
        <section
            className="w-full py-32 md:py-56 relative overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            {/* Colorful Accent Glows */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}, ${DESIGN_SYSTEM.COLORS.SECONDARY[500]}, ${DESIGN_SYSTEM.COLORS.TERTIARY[500]})` }} />

            <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-12 mb-32">
                    <div className="flex items-center gap-4">
                        <span
                            className={cn("text-xs font-black uppercase italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL)}
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[600] }}
                        >
                            Logistics_Uplink
                        </span>
                        <div className="h-[2px] flex-grow" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                    </div>

                    <h2
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[950] }}
                    >
                        Open<br />
                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Directives</span>
                    </h2>
                </div>

                {/* Vacancy Matrix */}
                <div className="flex flex-col gap-4">
                    {vacancies.map((job, index) => {
                        const isHovered = hoveredId === job.id;

                        return (
                            <motion.div
                                key={job.id}
                                onMouseEnter={() => setHoveredId(job.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="relative transition-all duration-300 group"
                            >
                                <div
                                    className="relative z-20 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 border-2 transition-all duration-500"
                                    style={{
                                        backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[950] : DESIGN_SYSTEM.COLORS.WHITE[100],
                                        borderColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[100],
                                        boxShadow: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY.GLOW : 'none'
                                    }}
                                >
                                    {/* Identity Block */}
                                    <div className="flex-1 space-y-6 w-full">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Activity size={14} style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[300] }} />
                                                <span
                                                    className="text-[10px] font-black uppercase tracking-widest tabular-nums"
                                                    style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                                >
                                                    REF_0{job.id}
                                                </span>
                                            </div>
                                            <span
                                                className="text-[10px] font-black uppercase px-2 py-0.5 border"
                                                style={{
                                                    borderColor: isHovered ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200],
                                                    color: isHovered ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.ZINC[600]
                                                }}
                                            >
                                                {job.details?.department}
                                            </span>
                                        </div>

                                        <h3
                                            className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none transition-colors duration-500"
                                            style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[950] }}
                                        >
                                            {job.basics.title}
                                        </h3>
                                    </div>

                                    {/* Specs Block */}
                                    <div className="flex-1 grid grid-cols-2 gap-8 w-full py-10 lg:py-0 lg:px-12">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest block" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[600] : DESIGN_SYSTEM.COLORS.ZINC[400] }}>Sequence</span>
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} style={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }} />
                                                <span className="text-xs font-black uppercase italic" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[900] }}>
                                                    {formatContract(job.details?.contract as string)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest block" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[600] : DESIGN_SYSTEM.COLORS.ZINC[400] }}>Deployment</span>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-xs font-black uppercase italic" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[900] }}>
                                                    Global_Ops
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Block */}
                                    <button
                                        className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-12 pl-8 pr-2 py-2 border-l-2 transition-all duration-500 group/btn"
                                        style={{ borderColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                    >
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Uplink_Request</span>
                                            <span className="text-xs font-black uppercase italic" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[900] }}>Apply_Now</span>
                                        </div>
                                        <div
                                            className="w-14 h-14 flex items-center justify-center transition-all duration-500"
                                            style={{
                                                backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[950]
                                            }}
                                        >
                                            <ArrowRight size={20} style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[950] : DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
                                        </div>
                                    </button>
                                </div>

                                {/* Expanded Detail Section */}
                                <AnimatePresence>
                                    {isHovered && job.details?.expectations?.list && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-x-2 border-b-2"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[900],
                                                borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                            }}
                                        >
                                            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <Target size={14} style={{ color: DESIGN_SYSTEM.COLORS.SECONDARY[500] }} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Objective</span>
                                                    </div>
                                                    <p className="text-xs font-bold uppercase italic leading-relaxed text-zinc-400">
                                                        {job.basics.description}
                                                    </p>
                                                </div>
                                                <div className="md:col-span-2 space-y-6">
                                                    <div className="flex items-center gap-2">
                                                        <Zap size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Directive_Specifications</span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {job.details.expectations.list.slice(0, 4).map((exp, i) => (
                                                            <div key={i} className="flex gap-4 p-4 bg-zinc-950 border border-zinc-800">
                                                                <span className="text-[10px] font-black tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{i + 1}</span>
                                                                <span className="text-[10px] font-black uppercase italic text-zinc-300">{exp.statement}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}