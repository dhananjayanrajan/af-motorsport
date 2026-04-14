'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Individual, Initiative, Leader, Organization } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Building2, Globe, Link as LinkIcon, Mail, Shield, User } from 'lucide-react'

interface InitiativeStakeholdersProps {
    initiative: Initiative
}

export default function InitiativeStakeholders({ initiative }: InitiativeStakeholdersProps) {
    const renderStakeholder = (
        item: Organization | Leader | Individual | number,
        type: 'organization' | 'leader' | 'individual'
    ) => {
        if (typeof item === 'number') return null

        let displayName = 'UNKNOWN_ENTITY'
        let subText = 'IDENTIFIER_MISSING'

        if ('name' in item) {
            displayName = item.name
            subText = (item as Organization).basics?.tagline || 'CORPORATE_BODY'
        } else if ('first_name' in item && 'last_name' in item) {
            displayName = `${item.first_name} ${item.last_name}`
            subText = type === 'leader' ? 'STRATEGIC_DIRECTOR' : 'OPERATIONAL_ASSET'
        }

        const icons = {
            organization: <Building2 size={12} />,
            leader: <Shield size={12} />,
            individual: <User size={12} />
        }

        return (
            <div key={item.id} className="group relative bg-zinc-950 border border-zinc-900 p-6 hover:bg-black hover:border-zinc-700 transition-all duration-500 overflow-hidden">
                <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                    {icons[type]}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 flex items-center justify-center bg-zinc-900 text-zinc-600 group-hover:text-primary transition-colors">
                            {icons[type]}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.2em]">{type}_NODE</span>
                            <span className="text-sm font-black text-zinc-200 uppercase italic tracking-tighter group-hover:text-white transition-colors">
                                {displayName}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-relaxed line-clamp-1">
                            {subText}
                        </p>
                        <div className="flex gap-2">
                            <div className="size-5 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 cursor-pointer">
                                <Globe size={10} className="text-zinc-800" />
                            </div>
                            <div className="size-5 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 cursor-pointer">
                                <Mail size={10} className="text-zinc-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const stakeholders = initiative.categories || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <LinkIcon size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">STAKEHOLDER_RELATION_MAP</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Involved<span className="text-zinc-900"> Parties</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stakeholders.length > 0 ? (
                        stakeholders.map((party: any) => {
                            // Logic to determine type based on object properties (Organization/Leader/Individual)
                            const type = 'name' in party ? 'organization' : 'first_name' in party ? 'leader' : 'individual'
                            return renderStakeholder(party, type)
                        })
                    ) : (
                        <div className="col-span-full py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4">
                            <Building2 size={24} className="text-zinc-900" />
                            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">NO_STAKEHOLDERS_LOGGED</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="size-2 border border-primary animate-pulse" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">AUTH_STATE: ENCRYPTED_STAKEHOLDER_MANIFEST</span>
                    </div>
                    <div className="flex gap-0.5">
                        {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} className={cn("h-1 w-2", i % 8 === 0 ? "bg-zinc-700" : "bg-zinc-950")} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}