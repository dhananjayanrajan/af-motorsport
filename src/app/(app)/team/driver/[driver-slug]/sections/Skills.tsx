'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Activity, BarChart3, Cpu, Layers, ShieldCheck, Target, X, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface SkillsSectionProps {
    driver: any;
}

export default function SkillsSection({ driver }: SkillsSectionProps) {
    const [selectedSkill, setSelectedSkill] = useState<any>(null);

    const skills = (driver.details?.skills || [])
        .map((skill: any) => (typeof skill === 'object' ? skill : null))
        .filter(Boolean);

    useEffect(() => {
        if (selectedSkill) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedSkill]);

    if (skills.length === 0) return null;

    return (
        <section className="relative w-full py-32 bg-white overflow-hidden select-none">
            <div className="mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-24">

                    <div className="flex flex-col gap-4 border-l-4 border-zinc-900 pl-8">
                        <div className="flex items-center gap-3">
                            <Activity className="size-4 text-zinc-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                                Neural Network // Core Competency
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-zinc-900">
                            Skill <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Tree</span>
                        </h2>
                    </div>

                    <div className="relative w-full overflow-x-auto no-scrollbar py-12">
                        <div className="flex items-center gap-12 md:gap-20 px-4 min-w-max">
                            {skills.map((skill: any, idx: number) => (
                                <div key={skill.id || idx} className="relative flex flex-col items-center gap-8 group">
                                    {idx !== skills.length - 1 && (
                                        <div className="absolute top-16 -right-10 md:-right-14 w-10 md:w-14 h-0.5 bg-zinc-100" />
                                    )}

                                    <motion.button
                                        onClick={() => setSelectedSkill(skill)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="size-32 md:size-40 border-2 border-zinc-900 flex flex-col items-center justify-center bg-white relative z-10 transition-colors hover:bg-zinc-900 group"
                                    >
                                        <Zap className="size-10 text-zinc-900 group-hover:text-white transition-colors" />
                                        <span className="absolute bottom-4 text-[10px] font-black uppercase text-zinc-400 group-hover:text-zinc-500">
                                            Lvl_Max
                                        </span>
                                        <span className="absolute -top-3 -left-3 text-xs font-black p-2 bg-zinc-900 text-white italic">
                                            0{idx + 1}
                                        </span>
                                    </motion.button>

                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-sm font-black uppercase italic text-zinc-900 text-center max-w-[120px]">
                                            {skill.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-100 pt-10">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">System Synchronized</span>
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-400 italic">Select node to analyze specs</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedSkill && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100]"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white z-[101] border-2 border-zinc-900 flex flex-col md:flex-row overflow-hidden shadow-2xl"
                        >
                            <div className="w-full md:w-1/2 h-64 md:h-full relative bg-zinc-50">
                                <img
                                    src={selectedSkill.assets?.thumbnail?.url || `https://picsum.photos/seed/${selectedSkill.id}/1200/1600`}
                                    className="w-full h-full object-cover grayscale contrast-125"
                                    alt={selectedSkill.name}
                                />
                                <div className="absolute inset-0 bg-zinc-900/5" />
                                <div className="absolute top-8 left-8">
                                    <span className="text-xs font-black uppercase p-3 bg-zinc-900 text-white italic">
                                        Verified Skill Node
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-16 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className="absolute top-8 right-8 size-12 border-2 border-zinc-900 flex items-center justify-center hover:bg-zinc-900 group transition-colors"
                                >
                                    <X className="size-6 text-zinc-900 group-hover:text-white" />
                                </button>

                                <div className="flex flex-col gap-12">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Target className="size-5 text-zinc-400" />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                                                Active Specialization
                                            </span>
                                        </div>
                                        <h3 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-zinc-900">
                                            {selectedSkill.name}
                                        </h3>
                                        <div className="h-1 w-24 bg-zinc-900" />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <SkillMetric label="Depth" value={selectedSkill.details?.depth} icon={BarChart3} />
                                        <SkillMetric label="Scale" value={selectedSkill.details?.scale} icon={Layers} />
                                        <SkillMetric label="Rarity" value={selectedSkill.details?.rarity} icon={Cpu} />
                                        <SkillMetric label="Complexity" value={selectedSkill.details?.complexity} icon={Zap} />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-black uppercase text-zinc-400 tracking-[0.3em]">Technical Specs</span>
                                            <div className="h-px flex-1 bg-zinc-100" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedSkill.details?.specifications?.list?.map((spec: any, i: number) => (
                                                <div key={i} className="p-5 border border-zinc-100 flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase text-zinc-400">{spec.parameter || 'Parameter'}</span>
                                                    <span className="text-base font-bold italic text-zinc-900 uppercase">{spec.value || 'Data Verified'}</span>
                                                    <p className="text-xs text-zinc-500 leading-tight mt-1">{spec.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-10 border-t border-zinc-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Record Status</span>
                                            <span className="text-xl font-black uppercase italic text-zinc-900">Active Node</span>
                                        </div>
                                        <ShieldCheck className="size-10 text-zinc-900" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

function SkillMetric({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-zinc-50 border border-zinc-100">
            <div className="flex items-center gap-2">
                <Icon className="size-3 text-zinc-400" />
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">{label}</span>
            </div>
            <span className="text-sm font-black italic uppercase text-zinc-900">{value || 'N/A'}</span>
        </div>
    );
}