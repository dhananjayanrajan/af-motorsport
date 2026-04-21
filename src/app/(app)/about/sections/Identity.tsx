'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Designation, Identity, Leader, Media } from '@/payload-types';
import { Award, Globe, Heart, Quote, Radio, Shield, Target, UserCheck, Zap } from 'lucide-react';

interface IdentitySectionProps {
    identity: Identity;
}

export default function IdentitySection({ identity }: IdentitySectionProps) {
    if (!identity) return null;

    return (
        <section className="w-full">
            <div
                className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]"
                style={{ borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
            >
                <div className="p-10 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-100 bg-white">
                    <div className="flex items-center gap-4 mb-8">
                        <Target size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Institutional Vision</span>
                    </div>
                    <h2
                        className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Vision
                    </h2>
                    <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-500 leading-tight">
                        {identity.vision}
                    </p>
                </div>

                <div className="p-10 md:p-24 flex flex-col justify-center bg-zinc-50">
                    <div className="flex items-center gap-4 mb-8">
                        <Shield size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Institutional Mission</span>
                    </div>
                    <h2
                        className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Mission
                    </h2>
                    <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-800 leading-tight">
                        {identity.mission}
                    </p>
                </div>
            </div>

            {identity.values && identity.values.length > 0 && (
                <div className="w-full py-32 bg-black">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                        <div className="flex flex-col gap-16">
                            <div className="flex flex-col gap-4">
                                <span className="text-[11px] font-black uppercase tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Core Principles</span>
                                <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-none">
                                    Foundational<br />Values
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                                {identity.values.map((item, idx) => (
                                    <div key={item.id || idx} className="p-12 bg-black flex flex-col gap-10 group/val">
                                        <div className="flex items-center justify-between">
                                            <Heart size={20} className="text-zinc-800 group-hover/val:text-primary-500 transition-colors" />
                                            <span className="text-xs font-black tabular-nums text-zinc-700">ORD_{(idx + 1).toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-2xl font-black uppercase italic tracking-tight text-white group-hover/val:text-primary-400 transition-colors">
                                                {item.principleName || item.value}
                                            </h4>
                                            <p className="text-xs font-bold uppercase leading-relaxed text-zinc-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            <div className="flex items-center gap-4">
                                <Globe size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Corporate Stance</span>
                            </div>
                            <div className="space-y-8">
                                <p className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                                    {identity.sustainability?.stance}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {identity.sustainability?.initiativeNames?.map((init, idx) => (
                                        <div key={init.id || idx} className="p-6 border border-zinc-100 bg-zinc-50 space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">{init.name}</span>
                                            <p className="text-[10px] font-bold uppercase leading-tight text-zinc-400">{init.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 p-10 bg-black flex flex-col justify-between min-h-[400px]">
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <Radio size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Voice & Tone</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {identity.voice?.toneKeywords?.map((k, idx) => (
                                        <span key={k.id || idx} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[9px] font-black uppercase tracking-widest text-primary-500">
                                            {k.keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm font-black uppercase italic leading-snug text-zinc-400">
                                {identity.voice?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full py-32 bg-zinc-50 border-t border-zinc-100">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <div className="flex flex-col gap-16">
                        <div className="flex items-center gap-4">
                            <UserCheck size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                                Leadership Node
                            </h3>
                        </div>

                        <div className="flex flex-col gap-px bg-zinc-200 border border-zinc-200">
                            {identity.leadership?.map((leader, idx) => {
                                const l = leader as Leader;
                                const avatar = (l.assets?.avatar as Media)?.url || `https://picsum.photos/seed/leader-${l.id}/800/800`;

                                return (
                                    <div key={l.id} className="grid grid-cols-1 lg:grid-cols-12 bg-white group/leader overflow-hidden">
                                        <div className="lg:col-span-3 aspect-square lg:aspect-auto relative overflow-hidden bg-zinc-100">
                                            <img
                                                src={avatar}
                                                className="w-full h-full object-cover transition-all duration-700 group-hover/leader:grayscale-0 group-hover/leader:scale-105"
                                                alt={l.first_name}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2 py-1 bg-black text-white text-[9px] font-black uppercase">
                                                    {l.basics?.title || 'Executive'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 p-10 flex flex-col justify-between border-r border-zinc-100">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                        {l.alias ? `ALIAS: ${l.alias}` : `ID: ${l.id.toString().padStart(4, '0')}`}
                                                    </span>
                                                </div>
                                                <h4 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                                                    {l.first_name} {l.middle_name ? `${l.middle_name} ` : ''}{l.last_name}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {l.details?.designations?.map((d, dIdx) => (
                                                        <span key={dIdx} className="text-[9px] font-black uppercase tracking-tight px-2 py-1 border border-black">
                                                            {(d as Designation).name || 'Member'}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {l.details?.quote && (
                                                <div className="mt-8 p-6 bg-zinc-50 border-l-4 border-primary-500 italic">
                                                    <Quote size={16} className="mb-2 text-zinc-300" />
                                                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-600">
                                                        "{l.details.quote}"
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="lg:col-span-4 p-10 flex flex-col justify-between bg-zinc-50/50">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 opacity-30">
                                                        <Award size={12} />
                                                        <span className="text-[8px] font-black uppercase">Debut</span>
                                                    </div>
                                                    <span className="text-xs font-black uppercase italic">
                                                        {l.basics?.debut_date ? new Date(l.basics.debut_date).getFullYear() : 'Active'}
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 opacity-30">
                                                        <Zap size={12} />
                                                        <span className="text-[8px] font-black uppercase">Status</span>
                                                    </div>
                                                    <span className="text-xs font-black uppercase italic">
                                                        {l.basics?.retirement_date ? 'Retired' : 'In Office'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-10 space-y-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">Core Principles</span>
                                                <div className="space-y-2">
                                                    {l.details?.principles?.list?.slice(0, 2).map((p, pIdx) => (
                                                        <div key={pIdx} className="flex flex-col gap-1">
                                                            <span className="text-[10px] font-black uppercase tracking-tight">{p.name}</span>
                                                            <div className="h-[2px] w-full bg-zinc-200">
                                                                <div className="h-full bg-primary-500 w-1/2" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}