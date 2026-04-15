'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Program } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock, Filter, ShieldCheck, Target, X } from 'lucide-react';
import { useState } from 'react';

interface ProgramsSectionProps {
    programs: Program[];
}

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    const statuses = [
        { key: 'all', label: 'All Programs', color: DESIGN_SYSTEM.COLORS.PRIMARY[500] },
        { key: 'active', label: 'Active', color: DESIGN_SYSTEM.COLORS.PRIMARY[500] },
        { key: 'approved', label: 'Approved', color: DESIGN_SYSTEM.COLORS.BLACK[600] },
        { key: 'proposed', label: 'Proposed', color: DESIGN_SYSTEM.COLORS.ZINC[400] },
        { key: 'completed', label: 'Completed', color: DESIGN_SYSTEM.COLORS.ZINC[400] }
    ];

    const filteredPrograms = activeFilter === 'all'
        ? programs
        : programs.filter(p => p.details?.status === activeFilter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return DESIGN_SYSTEM.COLORS.PRIMARY[500];
            case 'approved': return DESIGN_SYSTEM.COLORS.BLACK[600];
            case 'proposed': return DESIGN_SYSTEM.COLORS.ZINC[500];
            case 'completed': return DESIGN_SYSTEM.COLORS.ZINC[400];
            default: return DESIGN_SYSTEM.COLORS.ZINC[400];
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'development': return DESIGN_SYSTEM.COLORS.PRIMARY[500];
            case 'training': return DESIGN_SYSTEM.COLORS.SECONDARY[500];
            case 'competitive': return DESIGN_SYSTEM.COLORS.TERTIARY[500];
            default: return DESIGN_SYSTEM.COLORS.ZINC[400];
        }
    };

    return (
        <section
            className="w-full py-16 md:py-24 lg:py-32 overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
            }}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 md:mb-20">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 group/label">
                            <span
                                className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]"
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                Performance Systems
                            </span>
                            <div className="h-px w-16 bg-zinc-100 group-hover/label:w-24 transition-all duration-700" />
                        </div>
                        <h2
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                        >
                            Active<br />Programs
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-xs font-bold uppercase tracking-widest max-w-[240px] leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Systematic deployment of operational frameworks across global nodes.
                        </p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-12 pb-6" style={{ borderBottom: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}>
                    <Filter size={14} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                    <span className="text-[9px] font-black uppercase tracking-wider mr-2" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Filter:</span>
                    {statuses.map((status) => (
                        <button
                            key={status.key}
                            onClick={() => setActiveFilter(status.key)}
                            className="px-4 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-200"
                            style={{
                                backgroundColor: activeFilter === status.key ? status.color : 'transparent',
                                color: activeFilter === status.key ? (status.key === 'active' || status.key === 'all' ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.WHITE[50]) : DESIGN_SYSTEM.COLORS.ZINC[500],
                                border: `1px solid ${activeFilter === status.key ? status.color : DESIGN_SYSTEM.COLORS.ZINC[200]}`
                            }}
                        >
                            {status.label}
                        </button>
                    ))}
                    {activeFilter !== 'all' && (
                        <button
                            onClick={() => setActiveFilter('all')}
                            className="ml-2 p-1.5 transition-all hover:rotate-90"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrograms.map((program, index) => {
                        const coverImage = (program.assets?.cover as Media)?.url || `https://picsum.photos/seed/${program.id}/800/1000`;
                        const statusColor = getStatusColor(program.details?.status || '');
                        const typeColor = getTypeColor(program.details?.type || '');

                        return (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="group relative cursor-pointer overflow-hidden"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                                    border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
                                }}
                                onClick={() => setSelectedProgram(program)}
                            >
                                {/* Image Section */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={coverImage}
                                        alt={program.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div
                                                className="px-3 py-1.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-sm"
                                                style={{
                                                    backgroundColor: `${typeColor}20`,
                                                    border: `1px solid ${typeColor}`,
                                                    color: typeColor
                                                }}
                                            >
                                                {program.details?.type || 'Standard'}
                                            </div>
                                            <div className="w-10 h-10 flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                <ArrowRight size={18} style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                            </div>
                                        </div>

                                        <div className="space-y-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                                    {program.details?.status?.toUpperCase() || 'PROTOCOL ACTIVE'}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                                {program.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col gap-5 transition-colors duration-500 group-hover:bg-zinc-50">
                                    <p
                                        className="text-[11px] font-bold leading-relaxed uppercase tracking-tight line-clamp-2 transition-colors duration-300"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                    >
                                        <span className="group-hover:text-black">
                                            {program.basics?.tagline || 'System protocol details are restricted to authorized personnel.'}
                                        </span>
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={10} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                                <span className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Duration</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                {program.details?.duration || 'Ongoing'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck size={10} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                                <span className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Security</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                {program.basics?.identifiers?.code || 'LVL_01'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Details Indicator */}
                                    <div className="mt-2 flex items-center justify-end gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                        <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>View Details</span>
                                        <ArrowRight size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </div>
                                </div>

                                {/* Side Accent */}
                                <div
                                    className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-700"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredPrograms.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-sm font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            No programs found for this filter
                        </p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProgram && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}E6`, backdropFilter: 'blur(8px)' }}
                        onClick={() => setSelectedProgram(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Image */}
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <img
                                    src={(selectedProgram.assets?.cover as Media)?.url || `https://picsum.photos/seed/${selectedProgram.id}/1200/600`}
                                    alt={selectedProgram.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                <button
                                    onClick={() => setSelectedProgram(null)}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all hover:rotate-90 z-10"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                >
                                    <X size={18} style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }} />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span
                                            className="px-3 py-1 text-[9px] font-black uppercase tracking-wider"
                                            style={{
                                                backgroundColor: getTypeColor(selectedProgram.details?.type || ''),
                                                color: DESIGN_SYSTEM.COLORS.BLACK[600]
                                            }}
                                        >
                                            {selectedProgram.details?.type || 'Program'}
                                        </span>
                                        <span
                                            className="px-3 py-1 text-[9px] font-black uppercase tracking-wider"
                                            style={{
                                                backgroundColor: getStatusColor(selectedProgram.details?.status || ''),
                                                color: selectedProgram.details?.status === 'active' ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.WHITE[50]
                                            }}
                                        >
                                            {selectedProgram.details?.status || 'Draft'}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                        {selectedProgram.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-10">
                                {/* Tagline */}
                                {selectedProgram.basics?.tagline && (
                                    <div className="mb-8 pb-6" style={{ borderBottom: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}>
                                        <p className="text-base md:text-lg font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                            "{selectedProgram.basics.tagline}"
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Overview</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                        {selectedProgram.basics?.description || selectedProgram.details?.objective || 'No detailed description available for this program.'}
                                    </p>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50] }}>
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Duration</p>
                                        <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{selectedProgram.details?.duration || 'Ongoing'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Start Date</p>
                                        <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {selectedProgram.details?.start_date ? new Date(selectedProgram.details.start_date).toLocaleDateString() : 'TBD'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>End Date</p>
                                        <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {selectedProgram.details?.end_date ? new Date(selectedProgram.details.end_date).toLocaleDateString() : 'Continuous'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Budget</p>
                                        <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {selectedProgram.details?.budget ? `$${selectedProgram.details.budget.toLocaleString()}` : 'Classified'}
                                        </p>
                                    </div>
                                </div>

                                {/* Outcomes */}
                                {selectedProgram.details?.outcomes && (
                                    <div className="mb-8">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                            <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            Expected Outcomes
                                        </h4>
                                        <p className="text-sm leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                            {selectedProgram.details.outcomes}
                                        </p>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}>
                                    <p className="text-[8px] uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                        Last Updated • {new Date(selectedProgram.updatedAt).toLocaleDateString()}
                                    </p>
                                    <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}