'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Individual, Interview, Media } from '@/payload-types'
import { Clock, FileText, Globe, Play, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function InterviewsSection({ data }: { data: Interview[] }) {
    const [activeInterview, setActiveInterview] = useState<Interview | null>(null)

    return (
        <section
            className="w-full py-20"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}
        >
            <div className="w-full px-6 md:px-12">
                <div className="mb-12 border-l-2 pl-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    <h2
                        className="text-3xl font-black uppercase italic tracking-tighter"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        Interviews
                    </h2>
                    <p className="text-sm font-bold uppercase text-zinc-500 mt-1">
                        Media Archive / {data.length} Entries
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onClick={() => setActiveInterview(interview)}
                        />
                    ))}
                </div>
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
    const thumbnail = (interview.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${interview.id}/600/800`
    const interviewee = interview.details.interviewee as Individual

    return (
        <motion.div
            layoutId={`card-${interview.id}`}
            onClick={onClick}
            className="group cursor-pointer border"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE,
                borderColor: DESIGN_SYSTEM.COLORS.ZINC_200
            }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <Image
                    src={thumbnail}
                    alt={interview.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div
                    className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform"
                    style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.8), transparent)' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                            {interview.details.format}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex flex-col gap-1">
                    <span
                        className="text-[9px] font-black uppercase"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                    >
                        {interview.basics?.identifiers?.code || 'MEDIA'}
                    </span>
                    <h4
                        className="text-lg font-black uppercase italic leading-none"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        {interviewee.first_name} {interviewee.last_name}
                    </h4>
                    <p
                        className="text-[10px] font-bold uppercase mt-2 line-clamp-1"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                    >
                        {interview.basics?.tagline || 'Exclusive Interview'}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

function InterviewModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
    const videoUrl = (interview.assets?.video as Media)?.url
    const coverUrl = (interview.assets?.cover as Media)?.url || (interview.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${interview.id}/1280/720`
    const interviewee = interview.details.interviewee as Individual

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-start justify-center p-4 md:p-8 pt-24 md:pt-32"
            style={{ backgroundColor: 'rgba(248, 249, 250, 0.98)' }}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-6xl bg-white border shadow-2xl overflow-hidden relative"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 z-50 flex items-center justify-center size-16 transition-colors hover:bg-zinc-100 border-l border-b"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, color: DESIGN_SYSTEM.COLORS.BLACK }}
                >
                    <X size={32} strokeWidth={2.5} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 bg-zinc-100 border-b lg:border-b-0 lg:border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        <div className="relative aspect-video w-full bg-black">
                            {videoUrl ? (
                                <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image src={coverUrl} alt={interview.name} fill className="object-cover opacity-40 grayscale" />
                                    <div className="relative z-10 flex flex-col items-center gap-4">
                                        <Play size={64} className="text-white opacity-50" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Media Preview Only</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Interview Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {interview.details.tags?.list?.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 text-[9px] font-black uppercase border"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-4 w-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                        {interview.alias || 'Direct Transmission'}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-[0.9] tracking-tighter mb-4" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                    {interviewee.first_name}<br />{interviewee.last_name}
                                </h2>
                                <p className="text-sm font-bold leading-relaxed text-zinc-600 uppercase">
                                    {interview.basics?.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
                                <DataField icon={<User size={14} />} label="Subject" value={`${interviewee.first_name} ${interviewee.last_name}`} />
                                <DataField icon={<Clock size={14} />} label="Duration" value={`${interview.details.duration} Minutes`} />
                                <DataField icon={<Globe size={14} />} label="Language" value={interview.details.language} />
                                <DataField icon={<FileText size={14} />} label="Format" value={interview.details.format} />
                            </div>

                            <div className="p-6 border-l-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                <span className="text-[9px] font-black text-zinc-400 uppercase block mb-2">Executive Summary</span>
                                <p className="text-xs font-bold text-zinc-700 leading-normal uppercase italic">
                                    {interview.basics?.summary}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                            <span className="text-[9px] font-black text-zinc-400 uppercase tabular-nums">
                                Published: {interview.details.published_date || interview.createdAt.split('T')[0]}
                            </span>
                            <span className="text-[9px] font-black text-zinc-400 uppercase">
                                Access: {interview.details.access}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function DataField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | null | undefined }) {
    return (
        <div className="p-4 bg-white flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
                <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</span>
                {label}
            </div>
            <span className="text-[11px] font-black uppercase truncate" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                {value || '---'}
            </span>
        </div>
    )
}