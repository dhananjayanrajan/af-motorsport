'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Individual, Leader, Meetup, Member, Organization } from '@/payload-types'
import { Briefcase, Building2, Shield, User, UserCheck, Users } from 'lucide-react'

interface HostsAttendeesSectionProps {
    meetup: Meetup
}

export default function HostsAttendeesSection({ meetup }: HostsAttendeesSectionProps) {
    const renderParticipant = (
        item: Organization | Leader | Individual | Driver | Member | number,
        type: 'org' | 'leader' | 'person' | 'driver' | 'member'
    ) => {
        if (typeof item === 'number') return null

        let displayName = 'UNKNOWN_ENTITY'
        if ('name' in item) displayName = item.name
        if ('first_name' in item && 'last_name' in item) displayName = `${item.first_name} ${item.last_name}`

        const icons = {
            org: <Building2 size={10} />,
            leader: <Shield size={10} />,
            person: <User size={10} />,
            driver: <UserCheck size={10} />,
            member: <Users size={10} />
        }

        return (
            <div key={item.id} className="group flex items-center gap-4 bg-zinc-950/50 border border-zinc-900 p-4 hover:border-zinc-700 transition-colors">
                <div className="size-8 flex items-center justify-center bg-zinc-900 text-zinc-600 group-hover:text-primary transition-colors">
                    {icons[type]}
                </div>
                <div className="flex flex-col">
                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">{type}_NODE</span>
                    <span className="text-xs font-black text-zinc-300 uppercase italic tracking-tighter group-hover:text-white transition-colors">
                        {displayName}
                    </span>
                </div>
            </div>
        )
    }

    const hosts = meetup.details.hosts
    const attendees = meetup.details.attendees

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Briefcase size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                            Host<span className="text-zinc-900"> Command</span>
                        </h3>
                        <div className="flex-grow h-px bg-zinc-900" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {hosts?.organizations?.map((org) => renderParticipant(org, 'org'))}
                        {hosts?.leaders?.map((leader) => renderParticipant(leader, 'leader'))}
                        {hosts?.individuals?.map((person) => renderParticipant(person, 'person'))}
                        {(!hosts?.organizations?.length && !hosts?.leaders?.length && !hosts?.individuals?.length) && (
                            <span className="text-[9px] font-black text-zinc-800 uppercase italic">NO_HOSTS_ASSIGNED</span>
                        )}
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Users size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                            Confirmed<span className="text-zinc-900"> Attendees</span>
                        </h3>
                        <div className="flex-grow h-px bg-zinc-900" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {attendees?.drivers?.map((driver) => renderParticipant(driver, 'driver'))}
                        {attendees?.members?.map((member) => renderParticipant(member, 'member'))}
                        {attendees?.leaders?.map((leader) => renderParticipant(leader, 'leader'))}
                        {attendees?.organizations?.map((org) => renderParticipant(org, 'org'))}
                        {attendees?.individuals?.map((person) => renderParticipant(person, 'person'))}
                        {(!attendees?.drivers?.length && !attendees?.members?.length && !attendees?.leaders?.length && !attendees?.organizations?.length && !attendees?.individuals?.length) && (
                            <span className="text-[9px] font-black text-zinc-800 uppercase italic">PENDING_MANIFEST_SYNC</span>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-zinc-900">
                    <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-4 w-1 bg-zinc-900" />
                        ))}
                    </div>
                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">PARTICIPANT_VERIFICATION_COMPLETE</span>
                </div>
            </div>
        </section>
    )
}