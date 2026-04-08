'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Initiative, Plan } from '@/payload-types'
import { AlertCircle, BarChart3, ChevronRight, Clock, LayoutGrid, Target } from 'lucide-react'
import { motion } from 'motion/react'

interface InitiativeDashboardProps {
    initiatives: Initiative[]
    plans: Plan[]
}

export default function InitiativeDashboard({ initiatives, plans }: InitiativeDashboardProps) {
    const calculateProgress = (plan: Plan) => {
        if (plan.details?.status === 'completed') return 100
        if (plan.details?.status === 'draft') return 0
        const milestones = plan.traits?.milestones?.list || []
        if (milestones.length === 0) return 15
        return 45
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'completed': return '#10b981'
            case 'in_progress': return DESIGN_SYSTEM.COLORS.PRIMARY
            case 'on_hold': return '#f59e0b'
            case 'cancelled': return '#ef4444'
            case 'approved': return '#3b82f6'
            default: return '#27272a'
        }
    }

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <LayoutGrid size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">STRATEGIC_OPERATIONS_DASHBOARD</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Initiative<span className="text-zinc-900"> Dashboard</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {initiatives.map((initiative, idx) => {
                        const relatedPlans = plans.filter(p =>
                            p.categories?.some((cat: any) =>
                                typeof cat === 'object' ? cat.id === initiative.id : cat === initiative.id
                            )
                        )

                        return (
                            <motion.div
                                key={initiative.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-zinc-950 border border-zinc-900 p-10 flex flex-col gap-10 group hover:border-zinc-700 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Target size={120} />
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">INITIATIVE_NAME</span>
                                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                                                {initiative.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">LIFECYCLE</span>
                                            <div className="text-[10px] font-black text-zinc-400 italic mt-1">
                                                {initiative.details?.start_date ? new Date(initiative.details.start_date).getFullYear() : 'TBD'}
                                                {' > '}
                                                {initiative.details?.end_date ? new Date(initiative.details.end_date).getFullYear() : 'CONT.'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">MISSION_STATEMENT</span>
                                        <p className="text-[11px] font-bold text-zinc-500 uppercase italic leading-relaxed">
                                            {initiative.basics?.mission || 'MISSION_PARAMETERS_NOT_DEFINED.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8 relative z-10 mt-auto">
                                    {relatedPlans.map((plan) => {
                                        const progress = calculateProgress(plan)
                                        return (
                                            <div key={plan.id} className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-1.5 rotate-45" style={{ backgroundColor: getStatusColor(plan.details?.status || '') }} />
                                                        <span className="text-[9px] font-black text-white uppercase italic tracking-tight">{plan.name}</span>
                                                    </div>
                                                    <span className="text-[9px] font-mono font-black text-zinc-500">{progress}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-zinc-900 overflow-hidden flex">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${progress}%` }}
                                                        transition={{ duration: 1, ease: "circOut" }}
                                                        className="h-full"
                                                        style={{ backgroundColor: getStatusColor(plan.details?.status || '') }}
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={8} className="text-zinc-800" />
                                                            <span className="text-[7px] font-black text-zinc-700 uppercase">{plan.details?.status || 'DRAFT'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <AlertCircle size={8} className="text-zinc-800" />
                                                            <span className="text-[7px] font-black text-zinc-700 uppercase">{plan.details?.priority || 'NORMAL'}_PRIORITY</span>
                                                        </div>
                                                    </div>
                                                    <a href={`/operations/plans/${plan.slug}`} className="text-[8px] font-black text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                                                        PLAN_ACCESS <ChevronRight size={8} />
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {!relatedPlans.length && (
                                        <div className="py-6 border-t border-zinc-900 flex items-center gap-4 text-zinc-800">
                                            <BarChart3 size={14} />
                                            <span className="text-[8px] font-black uppercase tracking-widest">NO_LINKED_PLANS_FOUND</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-1 mt-4">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <div key={i} className="h-1 w-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}