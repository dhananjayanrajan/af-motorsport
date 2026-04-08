'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Leader } from '@/payload-types'
import { Shield, Target } from 'lucide-react'
import { motion } from 'motion/react'

interface VisionMissionSectionProps {
    leader: Leader
}

export default function VisionMissionSection({ leader }: VisionMissionSectionProps) {
    const cards = [
        {
            title: 'STRATEGIC_VISION',
            content: leader.details?.vision || 'THE_FUTURE_OF_PERFORMANCE_IS_LIMITLESS_ENGINEERING_SOVEREIGNTY.',
            icon: <Target size={16} />,
            id: '01'
        },
        {
            title: 'OPERATIONAL_MISSION',
            content: leader.details?.mission || 'TO_REDEFINE_COMPETITIVE_AERODYNAMICS_THROUGH_UNCOMPROMISING_PRECISION.',
            icon: <Shield size={16} />,
            id: '02'
        }
    ]

    return (
        <section className="w-full py-24 px-10 md:px-16 border-y border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-black p-12 md:p-16 space-y-12 group hover:bg-zinc-950 transition-colors duration-500"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                            {card.icon}
                                        </div>
                                        <span className="text-[8px] font-black text-white uppercase tracking-[0.5em]">
                                            {card.title}
                                        </span>
                                    </div>
                                    <div className="h-0.5 w-12 bg-zinc-800 group-hover:w-20 transition-all" style={{ backgroundColor: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                </div>
                                <span className="text-[7px] font-mono text-zinc-800">MANIFESTO_REF_{card.id}</span>
                            </div>

                            <p className="text-xl md:text-2xl font-black italic text-zinc-400 uppercase tracking-tighter leading-tight group-hover:text-white transition-colors">
                                "{card.content}"
                            </p>

                            <div className="pt-8 flex items-center gap-4">
                                <div className="size-1 rounded-full bg-zinc-800" />
                                <div className="size-1 rounded-full bg-zinc-800" />
                                <div className="size-1 rounded-full bg-zinc-800" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}