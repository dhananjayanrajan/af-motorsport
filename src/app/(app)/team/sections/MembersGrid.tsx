'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Member } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Globe, Shield, Target, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const getBottomClipPath = (index: number) => {
    const variations = [
        'polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%)',
        'polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px))',
    ];
    return variations[index % variations.length];
};

export default function MembersGrid({ members }: { members: Member[] }) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    useEffect(() => {
        if (selectedMember) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedMember]);

    return (
        <section
            className="relative w-full py-32 px-6 md:px-12 lg:px-20"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Cpu size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Personnel_Database</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic text-black tracking-tighter uppercase leading-none">
                            Active_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Units</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {members.map((member, i) => (
                        <MemberTacticalModule
                            key={member.id}
                            member={member}
                            index={i}
                            onClick={() => setSelectedMember(member)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selectedMember && (
                    <MemberDossierModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function MemberTacticalModule({ member, index, onClick }: { member: Member; index: number; onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const clip = getBottomClipPath(index);
    const avatarUrl = (member.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${member.id}/800/800`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className="relative h-full cursor-pointer group"
        >
            <div
                className="relative p-[1px] transition-all duration-500 h-full"
                style={{
                    clipPath: clip,
                    backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200],
                }}
            >
                <div className="relative bg-white p-6 h-full flex flex-col" style={{ clipPath: clip }}>
                    <div className="relative aspect-square overflow-hidden mb-8 bg-zinc-100">
                        <motion.div
                            animate={{ opacity: isHovered ? 0.4 : 0 }}
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], mixBlendMode: 'overlay' }}
                        />
                        <img
                            src={avatarUrl}
                            alt={member.last_name}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute top-0 right-0 p-4 z-30">
                            <Shield size={16} className={cn("transition-colors", isHovered ? "text-primary-500" : "text-white/20")} />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                                    {member.alias || 'Class_Alpha'}
                                </span>
                                <div className="h-px flex-1 bg-zinc-100" />
                            </div>
                            <h3 className="text-4xl font-black italic uppercase leading-none text-black">
                                {member.first_name}<br />
                                <span className="transition-colors group-hover:text-primary-600">
                                    {member.last_name}
                                </span>
                            </h3>
                        </div>

                        <div className="flex justify-between items-end pt-6 border-t border-zinc-50">
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-300 uppercase">Specialization</span>
                                <span className="text-[10px] font-bold text-black uppercase block">
                                    {member.basics?.nickname || 'Operational_Lead'}
                                </span>
                            </div>
                            <div className="p-3 border transition-all duration-300 group-hover:bg-black group-hover:border-black">
                                <ArrowUpRight size={18} className={cn("transition-colors", isHovered ? "text-primary-500" : "text-zinc-300")} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function MemberDossierModal({ member, onClose }: { member: Member; onClose: () => void }) {
    const avatarUrl = (member.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${member.id}/800/800`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                className="relative w-full max-w-6xl bg-white overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-[100] p-3 bg-black text-white hover:bg-primary-500 hover:text-black transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row min-h-[80vh]">
                    <div className="w-full md:w-5/12 relative bg-zinc-950 overflow-hidden min-h-[400px]">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <img
                            src={avatarUrl}
                            alt={member.last_name}
                            className="w-full h-full object-cover grayscale brightness-75"
                        />
                        <div className="absolute bottom-12 left-12 z-20 space-y-4">
                            <div className="inline-block px-6 py-2 bg-primary-500 text-black font-black italic text-lg uppercase tracking-tighter">
                                ID_{member.id.toString().padStart(3, '0')}
                            </div>
                            <div className="flex items-center gap-4 text-white/40">
                                <Target size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Confirmed_Entity</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 p-12 md:p-24 flex flex-col justify-center bg-white relative">
                        <div className="space-y-16">
                            <header className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Personnel_Record</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter text-black">
                                    {member.first_name}<br />
                                    <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{member.last_name}</span>
                                </h2>
                            </header>

                            <div className="grid grid-cols-2 gap-16">
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest block">Designation</span>
                                    <p className="text-lg font-black uppercase italic text-black">{member.basics?.nickname || 'Class_Alpha'}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest block">Operational_Hub</span>
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} className="text-primary-500" />
                                        <p className="text-lg font-black uppercase italic text-black">
                                            {typeof member.basics?.nationality === 'object' ? member.basics?.nationality?.name : 'Central_Command'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-zinc-100">
                                <div className="flex items-center gap-3 text-primary-600">
                                    <Zap size={14} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Active_Directives</span>
                                </div>
                                <p className="text-base text-zinc-600 font-medium uppercase leading-relaxed max-w-xl">
                                    {member.details?.duties || 'Specific operational parameters remain classified for this unit profile.'}
                                </p>
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={onClose}
                                    className="px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:text-black transition-all duration-300 flex items-center gap-4 group/btn"
                                >
                                    Close_Profile_Session
                                    <X size={14} className="transition-transform group-hover/btn:rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}