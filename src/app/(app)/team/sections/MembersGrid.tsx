'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Member } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

const getBottomClipPath = (index: number) => {
    const variations = [
        'polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%)',
        'polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px))',
    ];
    return variations[index % variations.length];
};

export default function MembersGrid({ members }: { members: Member[] }) {
    return (
        <section
            className="relative w-full py-24 px-6 md:px-12 lg:px-20 border-t"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
            <div className="max-w-7xl mx-auto">
                <div
                    className="flex flex-col md:flex-row justify-between items-end mb-16 border-l-4 pl-8"
                    style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black italic text-black tracking-tighter uppercase leading-none">
                            Team
                        </h2>
                    </div>

                    <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-zinc-600">
                        <span>Count: {members.length}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member, i) => (
                        <MemberTacticalModule key={member.id} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MemberTacticalModule({ member, index }: { member: Member; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const clip = getBottomClipPath(index);
    const avatarUrl = (member.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${member.id}/800/800`;

    const truncatedDuties = member.details?.duties
        ? member.details.duties.length > 80
            ? member.details.duties.slice(0, 80) + '...'
            : member.details.duties
        : null;

    const skillsList = member.details?.skills as any[];
    const primarySkill = skillsList?.[0]?.name || skillsList?.[0]?.title;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-full transition-all duration-300"
        >
            <div
                className="relative p-[1px] transition-colors duration-300 h-full"
                style={{
                    clipPath: clip,
                    backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200
                }}
            >
                <div
                    className="relative bg-white overflow-hidden p-6 h-full flex flex-col"
                    style={{ clipPath: clip }}
                >
                    <div className="relative z-10 flex flex-col gap-6 h-full">
                        <div
                            className="relative aspect-square overflow-hidden border transition-colors bg-zinc-100 flex-shrink-0 w-full"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}
                        >
                            <img
                                src={avatarUrl}
                                alt={`${member.first_name} ${member.last_name}`}
                                className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                            />

                            <div className="absolute top-3 left-3 flex flex-col gap-0.5">
                                <span className="text-[10px] font-black text-black tabular-nums">{member.id}</span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className={cn("text-[9px] font-black italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}
                                        style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                    >
                                        {member.alias || member.basics?.nickname || member.basics?.pronouns || 'OPERATIVE'}
                                    </span>
                                    <div className="h-[1px] flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }} />
                                </div>

                                <h3 className="font-black italic leading-[0.9] tracking-tighter uppercase text-3xl text-black">
                                    {member.first_name}<br />
                                    <span style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : 'inherit' }}>{member.last_name}</span>
                                </h3>

                                {truncatedDuties && (
                                    <p className="mt-4 text-[11px] font-medium text-zinc-600 uppercase leading-relaxed border-l-2 pl-4 transition-colors line-clamp-2"
                                        style={{ borderLeftColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                        {truncatedDuties}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-4">
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-400 uppercase mb-1">Nationality</span>
                                        <span className="text-[10px] font-bold text-black uppercase">
                                            {typeof member.basics?.nationality === 'object' ? member.basics?.nationality?.name : ''}
                                        </span>
                                    </div>
                                    {primarySkill && (
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-zinc-400 uppercase mb-1">Specialty</span>
                                            <span className="text-[10px] font-bold text-black uppercase">
                                                {primarySkill}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <Link href={`/team/member/${member.slug}`} className="relative">
                                    <div
                                        className="p-2 border transition-all duration-200"
                                        style={{
                                            backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.SURFACE,
                                            borderColor: DESIGN_SYSTEM.COLORS.ZINC_200
                                        }}
                                    >
                                        <ExternalLink className={cn("size-4", isHovered ? "text-black" : "text-zinc-400")} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}