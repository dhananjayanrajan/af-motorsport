'use client';

import { Championship, Media } from '@/payload-types';
import { ArrowDown, Award, Globe, Timer } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Fragment, useRef } from 'react';

interface ChampionshipHistoryProps {
    championship: Championship;
}

export default function ChampionshipHistory({ championship }: ChampionshipHistoryProps) {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.85, 0.95], [0, 1, 1, 0]);
    const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);
    const cardY = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);

    const smoothOpacity = useSpring(contentOpacity, { stiffness: 50, damping: 20 });

    const cardImageUrl = (championship.assets?.cover as Media)?.url || (championship.assets?.trophy as Media)?.url || `https://picsum.photos/seed/${championship.id}/800/1200`;
    const entryDate = championship.details?.start_date ? new Date(championship.details.start_date).getFullYear() : '2026';

    const scrollToNext = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    const serialize = (node: any, index: number): React.ReactNode => {
        if (!node) return null;
        if (node.type === 'text') {
            let text = <span key={index}>{node.text}</span>;
            if (node.format & 1) text = <strong key={index} className="text-black-pure font-black">{text}</strong>;
            if (node.format & 2) text = <em key={index} className="italic text-black-pure/50">{text}</em>;
            return text;
        }

        const children = node.children?.map((n: any, i: number) => serialize(n, i));

        switch (node.type) {
            case 'paragraph':
                return (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="mb-8 md:mb-10 leading-relaxed text-[13px] md:text-sm font-medium text-center max-w-2xl mx-auto text-black-pure/60"
                    >
                        {children}
                    </motion.p>
                );
            case 'heading':
                const headingText = children?.toString() || '';
                return (
                    <div key={index} className="flex flex-col items-center gap-5 md:gap-6 mt-14 md:mt-20">
                        <div className="w-px h-8 md:h-10 bg-black-pure/15" />
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-px bg-primary-500" />
                            <motion.h3
                                initial={{ opacity: 0, letterSpacing: "0.3em" }}
                                whileInView={{ opacity: 1, letterSpacing: "0.15em" }}
                                transition={{ duration: 1.2 }}
                                className="text-[9px] md:text-[10px] font-black uppercase text-black-pure/40"
                            >
                                {headingText}
                            </motion.h3>
                            <div className="w-4 h-px bg-primary-500" />
                        </div>
                    </div>
                );
            default:
                return <Fragment key={index}>{children}</Fragment>;
        }
    };

    const historyChildren = championship.details?.history?.root?.children;
    const hasHistoryContent = historyChildren && historyChildren.length > 0;

    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden bg-white-pure border-t border-b border-black-pure">
            <div className="absolute inset-0 pointer-events-none opacity-8">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-0 w-1/4 h-full border-r border-black-pure/10" />
                    <div className="absolute top-0 left-1/2 w-1/4 h-full border-r border-black-pure/10" />
                    <div className="absolute top-0 left-3/4 w-1/4 h-full border-r border-black-pure/10" />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-black-pure/10" />
                    <div className="absolute top-2/3 left-0 w-full h-px bg-black-pure/10" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-14 md:mb-18 lg:mb-22">
                    <div className="relative mb-5 md:mb-6">
                        <div className="absolute -left-6 top-1/2 w-5 h-px bg-primary-500" />
                        <div className="absolute -right-6 top-1/2 w-5 h-px bg-primary-500" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-1.5 h-1.5 bg-primary-500 rotate-45 mx-auto"
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-3 md:mb-4"
                    >
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/40">
                            ARCHIVE RECORD // {championship.id}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="text-3xl md:text-4xl lg:text-5xl font-race font-black uppercase italic leading-none tracking-tighter mb-3 text-black-pure"
                    >
                        The <span className="text-primary-500">Heritage</span> Narrative
                    </motion.h2>
                    <div className="w-10 h-px mt-4 bg-black-pure/20" />
                    <div className="w-5 h-px mt-1 bg-primary-500" />
                </div>

                <div className="flex flex-col items-center mb-28 md:mb-36 lg:mb-44">
                    <motion.div
                        style={{ scale: cardScale, y: cardY }}
                        className="relative group cursor-pointer"
                        onClick={scrollToNext}
                    >
                        <div className="absolute -top-5 -left-5 w-10 h-10 border-t-2 border-l-2 border-primary-500 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-2 border-r-2 border-secondary-500 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute -top-5 -right-5 w-10 h-10 border-t-2 border-r-2 border-tertiary-500 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute -bottom-5 -left-5 w-10 h-10 border-b-2 border-l-2 border-black-pure transition-all duration-300 group-hover:w-12 group-hover:h-12" />

                        <div className="relative w-[280px] md:w-[360px] lg:w-[420px] aspect-[2/3] border border-black-pure shadow-xl overflow-hidden bg-black-pure">
                            <motion.div
                                className="absolute inset-0 z-0"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 2 }}
                            >
                                <img
                                    src={cardImageUrl}
                                    alt={championship.name}
                                    className="w-full h-full object-cover brightness-75 transition-all duration-1000"
                                />
                            </motion.div>

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black-pure via-black-pure/40 to-transparent opacity-70" />

                            <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-primary-500 z-20" />
                            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-secondary-500 z-20" />

                            <div className="absolute inset-x-5 md:inset-x-7 bottom-7 md:bottom-9 z-20 flex flex-col items-center text-center">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="text-lg md:text-xl lg:text-2xl font-race font-black uppercase italic tracking-tighter text-white-pure"
                                >
                                    {championship.name}
                                </motion.span>
                                <div className="w-6 h-px bg-primary-500 my-2 md:my-3" />
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-white-pure/40"
                                >
                                    {championship.basics?.tagline || 'CHAMPIONSHIP RECORD'}
                                </motion.span>
                            </div>

                            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-6 h-6 border border-white/30 flex items-center justify-center rotate-45">
                                    <ArrowDown size={10} className="text-white/60 -rotate-45" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div style={{ opacity: smoothOpacity }} className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-14 pb-6 border-b border-black-pure/20">
                        {[
                            { label: 'ESTABLISHED', val: entryDate, icon: Timer, color: 'bg-primary-500' },
                            { label: 'CLASS', val: championship.basics?.identifiers?.abbreviation || 'PREMIER', icon: Award, color: 'bg-secondary-500' },
                            { label: 'RULES', val: championship.details?.standings_scope || 'STANDARD', icon: Globe, color: 'bg-tertiary-500' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={scrollToNext}>
                                <div className={`p-1.5 ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    <item.icon size={12} className="md:size-3.5 text-black-pure" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-black-pure/40 mb-0.5">{item.label}</p>
                                    <p className="text-[10px] md:text-[11px] font-race font-black uppercase tracking-tighter text-black-pure group-hover:text-primary-500 transition-colors">
                                        {item.val}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {hasHistoryContent ? (
                        <div className="history-content space-y-6 md:space-y-8 px-2">
                            {historyChildren.map((node: any, i: number) => serialize(node, i))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[11px] md:text-xs text-black-pure/40 font-medium">
                                Heritage documentation coming soon.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-0.5 flex">
                <div className="w-1/4 h-full bg-primary-500" />
                <div className="w-1/4 h-full bg-secondary-500" />
                <div className="w-1/4 h-full bg-tertiary-500" />
                <div className="w-1/4 h-full bg-black-pure" />
            </div>
        </section>
    );
}