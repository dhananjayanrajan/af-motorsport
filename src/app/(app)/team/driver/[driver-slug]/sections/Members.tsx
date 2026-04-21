// sections/MembersSection.tsx
'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Car, Media, Member } from '@/payload-types';
import { BarChart3, Cpu, Layers, ShieldCheck, Target, Users, X, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MembersSectionProps {
    cars: Car[];
}

export default function MembersSection({ cars }: MembersSectionProps) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedMember]);

    const crewMembers = cars
        .flatMap((car) => car.details?.members || [])
        .filter(
            (member, index, self) =>
                typeof member === 'object' &&
                self.findIndex((m) => (m as Member).id === member.id) === index
        ) as Member[];

    if (crewMembers.length === 0) return null;

    const getImageUrl = (media: number | Media | null | undefined, seed: string) => {
        if (media && typeof media === 'object' && media.url) return media.url;
        return `https://picsum.photos/seed/${seed}/800/1000`;
    };

    return (
        <section
            className="relative py-32 px-6 md:px-20 overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="relative z-10 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div
                    className="flex flex-col gap-4 border-l-4 pl-8"
                    style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                >
                    <div className="flex items-center gap-3">
                        <Users className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                        <span
                            className="text-xs font-black uppercase tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Pit Crew
                        </span>
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Crew <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Members</span>
                    </h2>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
                {crewMembers.map((member, idx) => (
                    <div
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className="group cursor-pointer relative"
                    >
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="relative aspect-[3/4] w-full mb-8 border-2 overflow-hidden transition-all duration-700 pointer-events-auto"
                            style={{
                                borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50]
                            }}
                        >
                            <Image
                                src={getImageUrl(member.assets?.avatar, `member-${member.id}`)}
                                alt={member.last_name}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                style={{
                                    filter: 'grayscale(1)',
                                }}
                            />
                            <style jsx global>{`
                                .group:hover img { filter: grayscale(0) !important; }
                            `}</style>
                            <span
                                className="absolute top-4 left-4 text-xs font-black p-2 italic z-10"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                    color: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                }}
                            >
                                0{idx + 1}
                            </span>
                        </motion.div>

                        <div className="space-y-1">
                            <p
                                className="text-[10px] font-black uppercase tracking-widest transition-colors"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                {member.alias || 'Crew Specialist'}
                            </p>
                            <h3
                                className="text-2xl font-black italic uppercase tracking-tighter transition-colors group-hover:text-primary-500"
                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                {member.first_name} {member.last_name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
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
                                <Image
                                    src={getImageUrl(selectedMember.assets?.avatar, `member-detail-${selectedMember.id}`)}
                                    alt={selectedMember.last_name}
                                    fill
                                    className="object-cover contrast-125 transition-all duration-700 hover:grayscale-0"
                                />
                                <div className="absolute top-8 left-8">
                                    <span
                                        className="text-xs font-black uppercase p-3 italic"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                            color: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                        }}
                                    >
                                        Verified Personnel Node
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-16 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className={`absolute top-8 right-8 size-12 border-2 flex items-center justify-center transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} hover:bg-black group`}
                                    style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    <X
                                        className="size-6 transition-colors"
                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                    />
                                    <style jsx>{`
                                        button:hover .size-6 { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
                                    `}</style>
                                </button>

                                <div className="flex flex-col gap-12">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Target className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                            <span
                                                className="text-[11px] font-black uppercase tracking-widest"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                {selectedMember.alias || 'Field Specialist'}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {selectedMember.first_name}<br />{selectedMember.last_name}
                                        </h3>
                                        <div className="h-1 w-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <MemberMetric label="Nationality" value={(selectedMember.basics?.nationality as any)?.name || 'N/A'} icon={Layers} />
                                        <MemberMetric label="Enlisted" value={selectedMember.basics?.joining_date || 'N/A'} icon={BarChart3} />
                                        <MemberMetric label="Classification" value="Class-A" icon={Cpu} />
                                        <MemberMetric label="Clearance" value="Level Max" icon={Zap} />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="text-xs font-black uppercase tracking-[0.3em]"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Operational Duties
                                            </span>
                                            <div className="h-px flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                                        </div>
                                        <div
                                            className="p-8 border-2"
                                            style={{
                                                borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50]
                                            }}
                                        >
                                            <p
                                                className="text-base font-bold italic uppercase leading-relaxed transition-colors hover:text-primary-600"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                {selectedMember.details?.duties || 'Technical integration and real-time machine telemetry monitoring.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="text-xs font-black uppercase tracking-[0.3em]"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Core Competencies
                                            </span>
                                            <div className="h-px flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {(selectedMember.details?.skills || []).map((skill: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="px-4 py-2 border-2 text-xs font-black uppercase italic transition-all hover:bg-black hover:text-white"
                                                    style={{
                                                        borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                                        color: DESIGN_SYSTEM.COLORS.BLACK.PURE
                                                    }}
                                                >
                                                    {typeof skill === 'object' ? skill.name : skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className="mt-auto flex items-center justify-between pt-10 border-t"
                                        style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Archive Status</span>
                                            <span
                                                className="text-xl font-black uppercase italic transition-colors hover:text-primary-500"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                Active Duty
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

function MemberMetric({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
    return (
        <div
            className={`flex flex-col gap-2 p-4 border-2 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} hover:bg-black group/metric`}
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
            }}
        >
            <div className="flex items-center gap-2">
                <Icon className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>{label}</span>
            </div>
            <span
                className={`text-sm font-black italic uppercase truncate transition-colors`}
                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
                {value}
            </span>
            <style jsx>{`
                .group\\/metric:hover span { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
            `}</style>
        </div>
    );
}