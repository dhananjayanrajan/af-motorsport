'use client'

import { Download, ShieldAlert } from 'lucide-react'

export function ChampionshipRegulations() {
    return (
        <section className="relative w-full py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <ShieldAlert className="size-12 mb-6 text-zinc-700" />
                    <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">REGULATORY_FRAMEWORK</h2>
                </div>

                <div className="space-y-2">
                    {DUMMY_REGS.map((reg, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-black border border-zinc-900 hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="text-zinc-800 font-mono text-sm">{reg.code}</div>
                                <div>
                                    <h4 className="text-lg font-black italic text-white uppercase leading-none">{reg.name}</h4>
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase">Effective: {reg.date}</span>
                                </div>
                            </div>
                            <button className="p-3 border border-zinc-800 hover:bg-white hover:text-black transition-all">
                                <Download size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const DUMMY_REGS = [
    { name: "Technical Chassis Spec v3", code: "REG_TC_01", date: "JAN 2026" },
    { name: "Sporting Code & Conduct", code: "REG_SC_04", date: "MAR 2026" },
    { name: "MGU-K Deployment Limits", code: "REG_POW_12", date: "FEB 2026" }
]