// sections/OrganizationsSection.tsx
'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Organization } from '@/payload-types';
import { Activity, ArrowUpRight, Calendar, Globe, Hash, Shield, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface OrganizationsSectionProps {
    organizations: Organization[];
}

export default function OrganizationsSection({ organizations }: OrganizationsSectionProps) {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    if (!organizations || organizations.length === 0) return null;

    const displayOrgs = [...organizations, ...organizations, ...organizations];

    const getImageUrl = (org: Organization) => {
        const url = (org.assets?.logo as Media)?.url;
        return url || `https://picsum.photos/seed/${org.id}/400/200`;
    };

    return (
        <section className="relative py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden select-none">
            <div className="relative z-10 mb-16 px-6 md:px-20">
                <div className="flex flex-col gap-2 border-l-2 border-zinc-800 pl-8">
                    <div className="flex items-center gap-3">
                        <Activity className="size-3 text-zinc-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">
                            Global_Consortium
                        </span>
                    </div>
                    <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
                        The <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Network</span>
                    </h2>
                </div>
            </div>

            <div
                className="relative flex overflow-hidden py-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex items-center gap-20 md:gap-40 whitespace-nowrap"
                    animate={{ x: isPaused ? undefined : [0, -3000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 45,
                            ease: "linear",
                        },
                    }}
                >
                    {displayOrgs.map((org, idx) => (
                        <button
                            key={`${org.id}-${idx}`}
                            onClick={() => setSelectedOrg(org)}
                            className="relative group outline-none"
                        >
                            <div className="relative h-12 w-40 grayscale brightness-200 opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={getImageUrl(org)}
                                    alt={org.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </button>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedOrg && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrg(null)}
                            className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] bg-white z-[101] flex flex-col md:flex-row shadow-2xl overflow-hidden"
                        >
                            <div className="w-full md:w-[45%] h-64 md:h-full bg-zinc-100 relative border-b md:border-b-0 md:border-r border-zinc-200 p-12 flex items-center justify-center">
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <div className="size-1.5 rounded-full bg-zinc-900" />
                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Visual_Asset_01</span>
                                </div>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={getImageUrl(selectedOrg)}
                                        alt={selectedOrg.name}
                                        fill
                                        className="object-contain mix-blend-multiply"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-14 bg-white relative">
                                <button
                                    onClick={() => setSelectedOrg(null)}
                                    className="absolute top-8 right-8 size-10 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 group transition-all"
                                >
                                    <X className="size-4 text-zinc-900 group-hover:text-white" />
                                </button>

                                <div className="flex flex-col h-full">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="px-2 py-1 bg-zinc-900 text-[8px] font-black text-white uppercase italic">
                                                {selectedOrg.basics?.type || 'Entity'}
                                            </span>
                                            <div className="h-px w-8 bg-zinc-200" />
                                            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                                {selectedOrg.basics?.industry || 'Standard Sector'}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-4xl md:text-5xl font-black italic uppercase text-zinc-900 tracking-tighter leading-[0.9]">
                                                {selectedOrg.name}
                                            </h3>
                                            <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.1em]">
                                                {selectedOrg.basics?.tagline || 'Technical Operations Division'}
                                            </p>
                                        </div>

                                        <div className="py-6 border-y border-zinc-100">
                                            <p className="text-xs md:text-sm font-bold text-zinc-600 uppercase italic leading-relaxed">
                                                {selectedOrg.basics?.description || 'Corporate profile data synchronized. Access restricted to tier-1 personnel.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <OrgDataPoint label="Origin_Code" value={selectedOrg.basics?.identifiers?.code || 'N/A'} icon={Hash} />
                                        <OrgDataPoint label="Founded" value={selectedOrg.details?.founded || 'N/A'} icon={Calendar} />
                                        <OrgDataPoint label="Impact_Rating" value={selectedOrg.details?.impact || 'Medium'} icon={Shield} />
                                        <OrgDataPoint label="Access_Node" value={selectedOrg.details?.websites?.list?.[0]?.path?.replace(/https?:\/\//, '') || 'internal.v-corp'} icon={Globe} />
                                    </div>

                                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-zinc-100">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">Archive_Status</span>
                                            <span className="text-lg font-black text-zinc-900 italic uppercase tracking-tighter">Nominal_Active</span>
                                        </div>
                                        <ArrowUpRight className="size-6 text-zinc-200" />
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

function OrgDataPoint({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100">
            <Icon className="size-3 text-zinc-300" />
            <div className="flex flex-col min-w-0">
                <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
                <span className="text-[10px] font-bold text-zinc-900 uppercase italic truncate">{value}</span>
            </div>
        </div>
    );
}