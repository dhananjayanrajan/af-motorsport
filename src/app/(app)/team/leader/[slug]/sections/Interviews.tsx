// sections/Interviews.tsx
'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Interview, Leader, Media } from '@/payload-types'
import { Clock, FileSearch, FileText, Globe, Play, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function InterviewsSection({ data }: { data: Interview[] }) {
    const [activeInterview, setActiveInterview] = useState<Interview | null>(null)

    return (
        <section
            className="w-full py-24"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}
        >
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-16 border-l-4 pl-8" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    <h2
                        className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        Interviews
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mt-2">
                        Media_Archive_Protocol / {data.length.toString().padStart(2, '0')} Entries
                    </p>
                </div>

                {data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                interview={interview}
                                onClick={() => setActiveInterview(interview)}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="w-full py-32 flex flex-col items-center justify-center border border-dashed"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED, backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}
                    >
                        <div className="relative mb-6">
                            <FileSearch size={48} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} strokeWidth={1.5} />
                            <div className="absolute -top-1 -right-1 size-3 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-black mb-2">
                            No Interview Archives Located
                        </h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            The media repository for this subject is currently empty.
                        </p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {activeInterview && (
                    <InterviewModal
                        interview={activeInterview}
                        onClose={() => setActiveInterview(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

function InterviewCard({ interview, onClick }: { interview: Interview; onClick: () => void }) {
    const thumbnail = (interview.assets?.thumbnail as Media)?.url || (interview.assets?.cover as Media)?.url || `https://picsum.photos/seed/${interview.id}/600/800`
    const interviewee = interview.details.interviewee as Leader

    return (
        <motion.div
            layoutId={`card-${interview.id}`}
            onClick={onClick}
            className="group cursor-pointer border flex flex-col transition-all duration-300 hover:shadow-xl"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE,
                borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED
            }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                <Image
                    src={thumbnail}
                    alt={interview.name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                <div
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform"
                    style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.9), transparent)' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                            {interview.details.format || 'Standard'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <span
                        className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: DESIGN_SYSTEM.COLORS.NEUTRAL_600 }}
                    >
                        {interview.basics?.identifiers?.code || `INT-REF-${interview.id}`}
                    </span>
                    <h4
                        className="text-2xl font-black uppercase italic leading-none tracking-tighter"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        {interviewee.first_name} {interviewee.last_name}
                    </h4>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                    <p
                        className="text-[10px] font-black uppercase tracking-tight line-clamp-2"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        {interview.basics?.tagline || 'Technical Transmission / Session Entry'}
                    </p>
                </div>
            </div>

            <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
        </motion.div>
    )
}

function InterviewModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
    const videoUrl = (interview.assets?.video as Media)?.url
    const coverUrl = (interview.assets?.cover as Media)?.url || (interview.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${interview.id}/1280/720`
    const interviewee = interview.details.interviewee as Leader

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-white/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-7xl bg-white border overflow-hidden relative"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 z-50 flex items-center justify-center size-16 transition-colors hover:bg-zinc-100 border-l border-b"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED, color: DESIGN_SYSTEM.COLORS.BLACK }}
                >
                    <X size={32} strokeWidth={3} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 bg-zinc-50 border-b lg:border-b-0 lg:border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                        <div className="relative aspect-video w-full bg-black">
                            {videoUrl ? (
                                <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image src={coverUrl} alt={interview.name} fill className="object-cover opacity-40 grayscale" />
                                    <div className="relative z-10 flex flex-col items-center gap-4">
                                        <Play size={64} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Encrypted_Stream_Preview</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-10">
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Database size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                Unit_Metadata_Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {interview.details.tags?.list?.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-4 py-1.5 text-[9px] font-black uppercase border"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED, color: DESIGN_SYSTEM.COLORS.BLACK }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-10 md:p-14 flex flex-col justify-between">
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-[2px] w-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                        {interview.alias || 'Direct_Archive'}
                                    </span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-black">
                                    {interviewee.first_name}<br />{interviewee.last_name}
                                </h2>
                                <p className="text-sm font-bold leading-relaxed text-zinc-600 uppercase border-l-2 pl-6 italic" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                                    {interview.basics?.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-zinc-100 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                                <DataField icon={<User size={14} />} label="Subject" value={`${interviewee.first_name} ${interviewee.last_name}`} />
                                <DataField icon={<Clock size={14} />} label="Duration" value={`${interview.details.duration} Min`} />
                                <DataField icon={<Globe size={14} />} label="Language" value={interview.details.language} />
                                <DataField icon={<FileText size={14} />} label="Format" value={interview.details.format} />
                            </div>

                            <div className="p-8 border-l-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND, borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                <span className="text-[9px] font-black text-zinc-400 uppercase block mb-3 tracking-widest">Protocol_Summary</span>
                                <p className="text-xs font-black text-black leading-relaxed uppercase">
                                    {interview.basics?.summary || 'No operational summary provided for this transmission.'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 flex items-center justify-between border-t pt-8" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Date_Logged</span>
                                <span className="text-[10px] font-black text-black uppercase tabular-nums">
                                    {interview.details.published_date || interview.createdAt.split('T')[0]}
                                </span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Access_Clearance</span>
                                <span className="text-[10px] font-black text-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                    {interview.details.access || 'LEVEL_01'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function DataField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | null | undefined }) {
    return (
        <div className="p-5 bg-white flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</span>
                {label}
            </div>
            <span className="text-[11px] font-black uppercase truncate text-black">
                {value || '---'}
            </span>
        </div>
    )
}

function Database(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    )
}