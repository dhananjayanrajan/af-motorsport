'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Trophy } from 'lucide-react'

export function ChampionshipWinners() {
    return (
        <section className="relative w-full py-32 bg-black border-t border-zinc-900">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                <h2 className="text-center text-8xl font-black italic text-white uppercase tracking-tighter mb-24 opacity-20">HALL_OF_FAME</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {DUMMY_WINNERS.map((win, i) => (
                        <div key={i} className="relative group text-center">
                            <div className="size-48 mx-auto mb-12 border-2 border-zinc-900 group-hover:border-primary transition-colors p-2 rotate-45 overflow-hidden bg-zinc-950">
                                <div className="-rotate-45 w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <Trophy size={64} className="text-zinc-800 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                {win.season} CHAMPION
                            </span>
                            <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-2">{win.driver}</h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{win.team}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const DUMMY_WINNERS = [
    { driver: "Marcus Vance", team: "AF MOTORSPORT CORE", season: "2025" },
    { driver: "Elena Rossi", team: "V-CORP RACING", season: "2024" },
    { driver: "Julian Chen", team: "APEX INTELLIGENCE", season: "2023" }
]