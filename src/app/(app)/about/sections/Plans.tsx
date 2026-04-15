'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Plan } from '@/payload-types';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, ChevronRight, Clock, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface PlansSectionProps {
    plans: Plan[];
}

export default function PlansSection({ plans }: PlansSectionProps) {
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const bevelClip = "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)";
    const miniBevel = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

    const statuses = [
        { key: 'approved', label: 'Strategic Roadmap', color: DESIGN_SYSTEM.COLORS.PRIMARY[500] },
        { key: 'in_progress', label: 'Active Execution', color: DESIGN_SYSTEM.COLORS.BLACK[600] },
        { key: 'completed', label: 'Archived Success', color: DESIGN_SYSTEM.COLORS.ZINC[400] }
    ];

    const filteredPlans = activeFilter === 'all'
        ? plans
        : plans.filter(p => p.details?.status === activeFilter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return DESIGN_SYSTEM.COLORS.PRIMARY[500];
            case 'in_progress': return DESIGN_SYSTEM.COLORS.BLACK[600];
            case 'completed': return DESIGN_SYSTEM.COLORS.ZINC[400];
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
                <div className="flex flex-col gap-6 mb-12 md:mb-20">
                    <div className="flex items-center gap-4 group/head">
                        <div
                            className="h-[2px] w-12 transition-all duration-500 group-hover/head:w-20"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span
                            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] transition-colors"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Future Trajectory
                        </span>
                    </div>
                    <h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic leading-[1.1]"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                    >
                        Operational<br />
                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Plans</span>
                    </h2>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-12 pb-6" style={{ borderBottom: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}>
                    <Filter size={14} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                    <span className="text-[9px] font-black uppercase tracking-wider mr-2" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Filter:</span>
                    <button
                        onClick={() => setActiveFilter('all')}
                        className="px-4 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-200"
                        style={{
                            backgroundColor: activeFilter === 'all' ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : 'transparent',
                            color: activeFilter === 'all' ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.ZINC[500],
                            border: `1px solid ${activeFilter === 'all' ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200]}`
                        }}
                    >
                        All Plans
                    </button>
                    {statuses.map(status => (
                        <button
                            key={status.key}
                            onClick={() => setActiveFilter(status.key)}
                            className="px-4 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-200"
                            style={{
                                backgroundColor: activeFilter === status.key ? status.color : 'transparent',
                                color: activeFilter === status.key ? (status.key === 'approved' ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.WHITE[50]) : DESIGN_SYSTEM.COLORS.ZINC[500],
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

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredPlans.map((plan, idx) => {
                        const statusColor = getStatusColor(plan.details?.status || '');
                        const isCritical = plan.details?.priority === 'critical';

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="group relative transition-all duration-500 hover:shadow-2xl cursor-pointer"
                                style={{
                                    clipPath: bevelClip,
                                    border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`,
                                    backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50]
                                }}
                                onClick={() => setSelectedPlan(plan)}
                            >
                                {/* Hover Accent Background */}
                                <div
                                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.85,0,0.15,1] z-0"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                />

                                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div
                                            className="px-3 py-1 text-[9px] font-black uppercase tracking-tighter"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                                color: DESIGN_SYSTEM.COLORS.ZINC[500],
                                                clipPath: miniBevel
                                            }}
                                        >
                                            <span className="group-hover:text-white transition-colors">
                                                {plan.basics?.identifiers?.code || 'PLN_DATA'}
                                            </span>
                                        </div>
                                        {isCritical && (
                                            <div className="flex items-center gap-2 px-2 py-1 animate-pulse" style={{ backgroundColor: '#dc2626', clipPath: miniBevel }}>
                                                <AlertTriangle size={10} style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }} />
                                                <span className="text-[8px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>Critical</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <div className="mb-4">
                                        <span
                                            className="inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-wider"
                                            style={{
                                                backgroundColor: `${statusColor}15`,
                                                color: statusColor,
                                                borderLeft: `2px solid ${statusColor}`
                                            }}
                                        >
                                            {plan.details?.status?.replace('_', ' ') || 'Draft'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4
                                        className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-tight mb-4 transition-colors duration-300"
                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                    >
                                        <span className="group-hover:text-white">{plan.name}</span>
                                    </h4>

                                    {/* Description */}
                                    <p
                                        className="text-[10px] md:text-[11px] font-bold leading-relaxed uppercase tracking-tight mb-6 transition-colors duration-300 line-clamp-3"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                    >
                                        <span className="group-hover:text-zinc-300">
                                            {plan.basics?.tagline || 'Operational parameters pending full disclosure.'}
                                        </span>
                                    </p>

                                    {/* Metrics */}
                                    <div
                                        className="grid grid-cols-2 gap-4 pt-6 mt-auto border-t transition-colors duration-300"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5">
                                                <BarChart3 size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>KPI Target</span>
                                            </div>
                                            <span
                                                className="text-[10px] md:text-xs font-black uppercase tabular-nums transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                            >
                                                <span className="group-hover:text-primary-400">
                                                    {plan.traits?.kpis?.list?.[0]?.target || '75.0%'}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Deadline</span>
                                            </div>
                                            <span
                                                className="text-[10px] md:text-xs font-black uppercase tabular-nums transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                            >
                                                <span className="group-hover:text-primary-400">
                                                    {plan.details?.end_date ? new Date(plan.details.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Continuous'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-4 flex items-center justify-between transition-all duration-300 group-hover:opacity-100">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full border-2 transition-all group-hover:translate-x-0.5"
                                                    style={{
                                                        borderColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                                                        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200]
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 transition-all duration-300 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 opacity-0">
                                            <span className="text-[8px] font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>View Details</span>
                                            <div
                                                className="p-1.5 transition-transform hover:scale-110"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], clipPath: miniBevel }}
                                            >
                                                <ChevronRight size={12} strokeWidth={3} style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Side Glint */}
                                <div
                                    className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-700"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredPlans.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-sm font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            No plans found for this filter
                        </p>
                    </div>
                )}
            </div>

            {/* Modal - Simple for now, can be expanded */}
            <AnimatePresence>
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}E6`, backdropFilter: 'blur(8px)' }}
                        onClick={() => setSelectedPlan(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-2xl w-full p-8"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], clipPath: bevelClip }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPlan(null)}
                                className="absolute top-4 right-4 p-2 transition-all hover:rotate-90"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                <X size={18} />
                            </button>

                            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                {selectedPlan.name}
                            </h3>

                            <p className="text-sm mb-6" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                {selectedPlan.basics?.tagline || 'No additional details available.'}
                            </p>

                            <div className="pt-6" style={{ borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}>
                                <button
                                    onClick={() => setSelectedPlan(null)}
                                    className="px-6 py-2 text-[10px] font-black uppercase tracking-wider transition-all hover:translate-x-1"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600], color: DESIGN_SYSTEM.COLORS.WHITE[50] }}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// Import AnimatePresence
import { AnimatePresence } from 'framer-motion';
