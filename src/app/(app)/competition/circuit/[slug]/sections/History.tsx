'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Media } from '@/payload-types';
import { Award, Globe, Timer } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Fragment, useRef } from 'react';

interface TopographicHistoryProps {
    circuit: Circuit;
}

export default function TopographicHistory({ circuit }: TopographicHistoryProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const gallery = (circuit.assets?.gallery || []) as Media[];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.85, 0.95], [0, 1, 1, 0]);
    const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);
    const cardY = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);

    const smoothOpacity = useSpring(contentOpacity, { stiffness: 50, damping: 20 });

    const cardImageUrl = (circuit.assets?.cover as Media)?.url || (circuit.assets?.thumbnail as Media)?.url || "";
    const code = circuit.basics?.identifiers?.code || 'N/A';
    const abbr = circuit.basics?.identifiers?.abbreviation || 'N/A';

    const serialize = (node: any, index: number): React.ReactNode => {
        if (!node) return null;
        if (node.type === 'text') {
            let text = <span key={index}>{node.text}</span>;
            if (node.format & 1) text = <strong key={index} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{text}</strong>;
            if (node.format & 2) text = <em key={index} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} className="italic">{text}</em>;
            return text;
        }

        const children = node.children?.map((n: any, i: number) => serialize(n, i));

        switch (node.type) {
            case 'paragraph':
                const imgIndex = Math.floor(index / 3);
                const hasImage = index > 0 && index % 3 === 0 && gallery[imgIndex];

                return (
                    <Fragment key={index}>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[500] }}
                            className="mb-16 leading-[2.4] text-lg font-medium text-center max-w-2xl mx-auto"
                        >
                            {children}
                        </motion.p>
                        {hasImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="my-12 relative aspect-video overflow-hidden border-[14px] mx-auto max-w-4xl"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                    borderColor: DESIGN_SYSTEM.COLORS.WHITE[100]
                                }}
                            >
                                <img
                                    src={gallery[imgIndex].url || ''}
                                    alt="Site Evidence"
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                                />
                                <div className="absolute bottom-4 left-4 z-10">
                                    <span className="text-[9px] font-black uppercase bg-black text-white px-3 py-1 tracking-widest">
                                        Site Evidence // {gallery[imgIndex].filename}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </Fragment>
                );
            case 'heading':
                return (
                    <div key={index} className="flex flex-col items-center gap-8 mt-32">
                        <div className="w-px h-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                        <motion.h3
                            initial={{ opacity: 0, letterSpacing: "1em" }}
                            whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
                            transition={{ duration: 1.5 }}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            className="text-[10px] font-black uppercase text-center"
                        >
                            {children}
                        </motion.h3>
                    </div>
                );
            default:
                return <Fragment key={index}>{children}</Fragment>;
        }
    };

    return (
        <section ref={sectionRef} style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }} className="relative w-full py-12 md:py-16 overflow-hidden border-t">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-8"
                    >
                        <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }} className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}>
                            Site Archive // {circuit.basics?.identifiers?.code || circuit.id}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mb-4 text-center"
                    >
                        The <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Heritage</span> Narrative
                    </motion.h2>
                    <div className="w-8 h-px mt-8 mx-auto" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                </div>

                <div className="flex flex-col items-center mb-64">
                    <motion.div
                        style={{ scale: cardScale, y: cardY }}
                        className="relative"
                    >
                        <div
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                borderColor: DESIGN_SYSTEM.COLORS.BLACK[900]
                            }}
                            className="relative w-[320px] md:w-[500px] aspect-[2/3] border-[14px] shadow-[0_100px_150px_-30px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 z-0"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 2 }}
                            >
                                <img
                                    src={cardImageUrl}
                                    alt={circuit.name}
                                    className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-1000"
                                />
                            </motion.div>

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="absolute inset-x-12 bottom-16 z-20 flex flex-col items-center text-center">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                    className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter"
                                >
                                    {circuit.name}
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50], opacity: 0.3 }}
                                    className={`text-[9px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL} mt-6`}
                                >
                                    {circuit.basics?.tagline}
                                </motion.span>
                            </div>

                            <div className="absolute top-0 right-0 p-12 z-20">
                                <div style={{ borderColor: DESIGN_SYSTEM.COLORS.WHITE[50], opacity: 0.1 }} className="w-14 h-14 border flex items-center justify-center rotate-45">
                                    <div style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} className="w-2 h-2 shadow-[0_0_15px_#00FF41]" />
                                </div>
                            </div>
                        </div>
                        <div style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[50] }} className="absolute -inset-8 border -z-10 pointer-events-none" />
                    </motion.div>
                </div>

                <motion.div style={{ opacity: smoothOpacity }} className="max-w-4xl mx-auto">
                    <div style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[50] }} className="flex justify-center gap-16 md:gap-32 mb-32 border-b">
                        {[
                            { label: 'Code', val: code, icon: Timer },
                            { label: 'Abbreviation', val: abbr, icon: Award },
                            { label: 'Type', val: circuit.details?.type || 'Permanent', icon: Award },
                            { label: 'Grade', val: circuit.details?.fia_grade ? `Grade ${circuit.details.fia_grade}` : 'N/A', icon: Globe },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-5">
                                <item.icon size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <div className="text-center">
                                    <p style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} className={`text-[9px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT} mb-2`}>{item.label}</p>
                                    <p style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} className="text-[11px] font-black uppercase">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="history-narrative">
                        {circuit.details?.history?.root?.children?.map((node: any, i: number) => serialize(node, i))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}