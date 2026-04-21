'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Individual, Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Fingerprint, Hash, Layers, Search, ShieldCheck, Tag as TagIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface IndividualsSectionProps {
    individuals: Individual[];
}

export default function IndividualsSection({ individuals }: IndividualsSectionProps) {
    const [selectedPerson, setSelectedPerson] = useState<Individual | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredIndividuals = useMemo(() => {
        return individuals.filter((person) => {
            const matchesFilter = filter === 'all' || person.basics?.type === filter;
            const searchTerm = searchQuery.toLowerCase();
            const matchesSearch =
                person.first_name.toLowerCase().includes(searchTerm) ||
                person.last_name.toLowerCase().includes(searchTerm) ||
                person.alias?.toLowerCase().includes(searchTerm) ||
                String(person.id).includes(searchTerm);

            return matchesFilter && matchesSearch;
        });
    }, [individuals, filter, searchQuery]);

    const types = ['all', 'mentor', 'trainee', 'intern', 'advisor', 'consultant', 'guest'];

    return (
        <section className="w-full py-20 md:py-40 bg-white border-t border-zinc-100">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-32">
                <div className="flex flex-col gap-12 md:gap-16">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-[2px] w-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400">
                                    Personnel Registry
                                </span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.8] text-black"
                            >
                                Active<br />
                                <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Operators</span>
                            </motion.h2>
                        </div>

                        <div className="flex flex-wrap gap-1 border-b border-zinc-100 pb-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className="px-4 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all relative"
                                    style={{
                                        color: filter === type ? DESIGN_SYSTEM.COLORS.PRIMARY[600] : DESIGN_SYSTEM.COLORS.ZINC[400]
                                    }}
                                >
                                    {type}
                                    {filter === type && (
                                        <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full max-w-2xl group">
                        <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-zinc-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="VERIFY_IDENTITY_OR_ALIAS..."
                            className="w-full bg-zinc-50 border-[2px] border-zinc-100 p-5 md:p-6 pl-16 text-[11px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-white focus:border-black transition-all duration-300 text-black shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 shadow-xl">
                    <AnimatePresence mode="popLayout">
                        {filteredIndividuals.map((person) => {
                            const avatarUrl = (person.assets?.avatar as Media)?.url ?? `https://picsum.photos/seed/avatar-${person.id}/600/800`;
                            return (
                                <motion.div
                                    key={person.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedPerson(person)}
                                    className="group relative bg-white p-8 md:p-12 flex flex-col justify-between min-h-[450px] md:min-h-[500px] cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.85,0,0.15,1] z-0" />

                                    <div className="relative z-10 flex flex-col gap-8 h-full">
                                        <div className="flex justify-between items-start">
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 border-[3px] border-black group-hover:border-primary-500 transition-colors duration-500 overflow-hidden bg-zinc-100 shadow-lg">
                                                <img
                                                    src={avatarUrl}
                                                    alt={person.first_name}
                                                    className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                                />
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <span className="text-[10px] md:text-[12px] font-black tabular-nums text-zinc-200 group-hover:text-primary-500/40 transition-colors duration-500">
                                                    ID_{String(person.id).padStart(4, '0')}
                                                </span>
                                                {person.basics?.is_contact && (
                                                    <div className="p-2 border-2 border-black bg-secondary-400 group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                                                        <ShieldCheck size={18} strokeWidth={3} className="text-black" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border-2 border-black text-black group-hover:border-primary-500 group-hover:text-primary-500 transition-colors duration-500">
                                                    {person.basics?.type || 'Personnel'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.85] text-black group-hover:text-white transition-colors duration-500 py-2">
                                                    {person.first_name}<br />{person.last_name}
                                                </h3>
                                                {person.alias && (
                                                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.3em] text-primary-600 group-hover:text-primary-400 transition-colors duration-500">
                                                        "{person.alias}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-8 border-t-[2px] border-zinc-100 group-hover:border-white/10 transition-colors duration-500">
                                            <p className="text-[12px] font-bold leading-tight uppercase italic text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500 line-clamp-3">
                                                {person.basics?.description || 'Data clearance pending for this identity profile. Classification: Restricted.'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedPerson && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPerson(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full md:h-auto md:max-w-5xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedPerson(null)}
                                className="absolute top-6 right-6 z-20 p-4 bg-black text-white hover:bg-primary-500 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-full md:w-[40%] bg-zinc-50 p-10 md:p-16 flex flex-col gap-10 border-b md:border-b-0 md:border-r border-zinc-200">
                                <div className="w-full aspect-[3/4] border-[4px] border-black shadow-[15px_15px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                                    <img
                                        src={(selectedPerson.assets?.avatar as Media)?.url ?? `https://picsum.photos/seed/modal-${selectedPerson.id}/600/800`}
                                        alt={selectedPerson.first_name}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-center gap-4">
                                        <Hash size={20} className="text-primary-500" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Identity UID</span>
                                            <span className="text-base font-black uppercase italic tracking-tighter text-black">REG-ID-{String(selectedPerson.id).padStart(4, '0')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Award size={20} className="text-primary-500" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Operational Tier</span>
                                            <span className="text-base font-black uppercase italic tracking-tighter text-black">{selectedPerson.basics?.type || 'Core'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-[60%] p-10 md:p-20 flex flex-col gap-12 bg-white overflow-y-auto">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-3 py-1 text-[11px] font-black uppercase tracking-tighter bg-black text-primary-500">
                                            Verified Operator
                                        </span>
                                        <span className="px-3 py-1 text-[11px] font-black uppercase tracking-tighter border-2 border-black text-black">
                                            {selectedPerson.basics?.gender || 'Undisclosed'}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-black">
                                        {selectedPerson.first_name}<br />{selectedPerson.last_name}
                                    </h2>
                                    {selectedPerson.alias && (
                                        <p className="text-3xl font-black uppercase italic text-primary-600 tracking-tight leading-none">
                                            "{selectedPerson.alias}"
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-[2px] w-12 bg-primary-500" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900">Intelligence Brief</span>
                                    </div>
                                    <p className="text-base md:text-lg font-bold text-zinc-500 leading-snug uppercase tracking-tight">
                                        {selectedPerson.basics?.description || 'This individual profile is currently under review. Behavioral history and operational telemetry are restricted to Level 4 clearance.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-zinc-100 pt-10">
                                    {selectedPerson.categories && selectedPerson.categories.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Layers size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Division Matrix</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPerson.categories.map((cat: any) => (
                                                    <span key={cat.id || cat} className="text-xs font-black uppercase italic text-black underline decoration-primary-500 decoration-2 underline-offset-4">
                                                        {cat.title || 'Unit'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedPerson.tags && selectedPerson.tags.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <TagIcon size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Core Capabilities</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPerson.tags.map((tag: any) => (
                                                    <span key={tag.id || tag} className="px-2 py-1 bg-zinc-100 text-[10px] font-black uppercase text-zinc-500 border border-zinc-200">
                                                        #{tag.title || 'Skill'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Registry Updated</span>
                                        <span className="text-xs font-black text-black uppercase tabular-nums">
                                            {new Date(selectedPerson.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-100 italic font-black text-[10px] uppercase text-zinc-400">
                                        <Fingerprint size={20} className="text-primary-500" />
                                        Identity Verified by Protocol
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}