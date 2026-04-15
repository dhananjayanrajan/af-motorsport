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
        <section
            className="relative w-full py-32 overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <style jsx global>{`
                .skill-node:hover { background-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                .skill-node:hover .node-icon { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
                .skill-node:hover .lvl-text { color: ${DESIGN_SYSTEM.COLORS.ZINC[500]} !important; }
                .skill-close-btn:hover { background-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                .skill-close-btn:hover .close-icon { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
            `}</style>

            <div className="mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-24">
                    <div
                        className="flex flex-col gap-4 border-l-4 pl-8"
                        style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        <div className="flex items-center gap-3">
                            <Activity className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                            <span
                                className="text-xs font-black uppercase tracking-widest"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                Neural Network // Core Competency
                            </span>
                        </div>
                        <h2
                            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Skill <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Tree</span>
                        </h2>
                    </div>

                    <div className="relative w-full overflow-x-auto no-scrollbar py-12">
                        <div className="flex items-center gap-12 md:gap-20 px-4 min-w-max">
                            {skills.map((skill: any, idx: number) => (
                                <div key={skill.id || idx} className="relative flex flex-col items-center gap-8">
                                    {idx !== skills.length - 1 && (
                                        <div
                                            className="absolute top-16 -right-10 md:-right-14 w-10 md:w-14 h-0.5"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                        />
                                    )}

                                    <motion.button
                                        onClick={() => setSelectedSkill(skill)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`skill-node size-32 md:size-40 border-2 flex flex-col items-center justify-center relative z-10 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE}`}
                                        style={{
                                            borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                        }}
                                    >
                                        <Zap
                                            className="node-icon size-10 transition-colors"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        />
                                        <span
                                            className="lvl-text absolute bottom-4 text-[10px] font-black uppercase transition-colors"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                        >
                                            Lvl_Max
                                        </span>
                                        <span
                                            className="absolute -top-3 -left-3 text-xs font-black p-2 italic"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                                color: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                            }}
                                        >
                                            0{idx + 1}
                                        </span>
                                    </motion.button>

                                    <div className="flex flex-col items-center gap-1">
                                        <span
                                            className="text-sm font-black uppercase italic text-center max-w-[120px]"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {skill.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="flex justify-between items-center border-t pt-10"
                        style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span
                                className="text-[10px] font-black uppercase tracking-widest"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                System Synchronized
                            </span>
                        </div>
                        <span
                            className="text-[10px] font-black uppercase italic"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Select node to analyze specs
                        </span>
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
                            className="fixed inset-0 backdrop-blur-md z-[100]"
                            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}F2` }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] border-2 flex flex-col md:flex-row overflow-hidden shadow-2xl"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                            }}
                        >
                            <div
                                className="w-full md:w-1/2 h-64 md:h-full relative"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50] }}
                            >
                                <img
                                    src={selectedSkill.assets?.thumbnail?.url || `https://picsum.photos/seed/${selectedSkill.id}/1200/1600`}
                                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
                                    alt={selectedSkill.name}
                                />
                                <div className="absolute inset-0" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}0D` }} />
                                <div className="absolute top-8 left-8">
                                    <span
                                        className="text-xs font-black uppercase p-3 italic"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                            color: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                        }}
                                    >
                                        Verified Skill Node
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-16 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className={`skill-close-btn absolute top-8 right-8 size-12 border-2 flex items-center justify-center transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE}`}
                                    style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    <X
                                        className="close-icon size-6 transition-colors"
                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                    />
                                </button>

                                <div className="flex flex-col gap-12">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Target className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                            <span
                                                className="text-[11px] font-black uppercase tracking-widest"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Active Specialization
                                            </span>
                                        </div>
                                        <h3
                                            className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {selectedSkill.name}
                                        </h3>
                                        <div className="h-1 w-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <SkillMetric label="Depth" value={selectedSkill.details?.depth} icon={BarChart3} />
                                        <SkillMetric label="Scale" value={selectedSkill.details?.scale} icon={Layers} />
                                        <SkillMetric label="Rarity" value={selectedSkill.details?.rarity} icon={Cpu} />
                                        <SkillMetric label="Complexity" value={selectedSkill.details?.complexity} icon={Zap} />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="text-xs font-black uppercase tracking-[0.3em]"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Technical Specs
                                            </span>
                                            <div className="h-px flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedSkill.details?.specifications?.list?.map((spec: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className={`p-5 border flex flex-col gap-1 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} hover:translate-x-1`}
                                                    style={{
                                                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                                        backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                                    }}
                                                >
                                                    <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>{spec.parameter || 'Parameter'}</span>
                                                    <span
                                                        className="text-base font-bold italic uppercase"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                    >
                                                        {spec.value || 'Data Verified'}
                                                    </span>
                                                    <p className="text-xs leading-tight mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>{spec.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className="mt-auto flex items-center justify-between pt-10 border-t"
                                        style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Record Status</span>
                                            <span
                                                className="text-xl font-black uppercase italic"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                Active Node
                                            </span>
                                        </div>
                                        <ShieldCheck className="size-10" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
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
        <div
            className={`flex flex-col gap-2 p-4 border transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} hover:border-black hover:bg-white`}
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
            }}
        >
            <div className="flex items-center gap-2">
                <Icon className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>{label}</span>
            </div>
            <span
                className="text-sm font-black italic uppercase transition-colors"
                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
                {value || 'N/A'}
            </span>
        </div>
    );
}