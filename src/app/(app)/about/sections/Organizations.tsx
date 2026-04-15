'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Organization } from '@/payload-types';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { ChevronRight, Fingerprint, Hash, Layers, Plus, TrendingUp, X, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface OrganizationsSectionProps {
    organizations: Organization[];
}

export default function OrganizationsSection({ organizations }: OrganizationsSectionProps) {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [isSliderPaused, setIsSliderPaused] = useState(false);
    const controls = useAnimationControls();

    const duplicatedOrgs = useMemo(() => {
        if (!organizations.length) return [];
        return [...organizations, ...organizations, ...organizations, ...organizations];
    }, [organizations]);

    const startAnimation = () => {
        controls.start({
            x: [0, -2800],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                },
            },
        });
    };

    useEffect(() => {
        startAnimation();
    }, [controls]);

    useEffect(() => {
        if (isSliderPaused || !!selectedOrg) {
            controls.stop();
        } else {
            startAnimation();
        }
    }, [isSliderPaused, selectedOrg, controls]);

    if (!organizations.length) return null;

    // Custom clip path for beveled edges
    const cardClipPath = "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

    return (
        <section
            className="w-full py-20 md:py-40 overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-32">
                <div className="flex flex-col gap-6 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 group/infra"
                    >
                        <div
                            className="h-[2px] w-10 transition-all duration-300 group-hover/infra:w-16"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span
                            className="text-[10px] font-black uppercase tracking-[0.6em] transition-colors duration-300"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            <span className="group-hover/infra:text-black">Corporate Infrastructure</span>
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.8]"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Global<br />
                        <span
                            className="transition-colors duration-500 hover:text-black"
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            Partners
                        </span>
                    </motion.h2>
                </div>
            </div>

            <div className="relative flex flex-col gap-12 md:gap-20">
                <div
                    className="flex overflow-hidden group/slider"
                    onMouseEnter={() => setIsSliderPaused(true)}
                    onMouseLeave={() => setIsSliderPaused(false)}
                >
                    <motion.div className="flex whitespace-nowrap" animate={controls}>
                        {duplicatedOrgs.map((org, idx) => {
                            const logoUrl = (org.assets?.logo as Media)?.url ?? `https://picsum.photos/seed/org-${org.id}/600/400`;
                            return (
                                <div
                                    key={`${org.id}-${idx}`}
                                    onClick={() => setSelectedOrg(org)}
                                    className="relative w-[320px] md:w-[480px] mx-3 flex-shrink-0 group/card cursor-pointer"
                                >
                                    {/* The Premium Beveled Card */}
                                    <div
                                        className="relative h-[280px] md:h-[320px] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 bg-white shadow-xl"
                                        style={{
                                            clipPath: cardClipPath,
                                            border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`,
                                        }}
                                    >
                                        {/* Hover Glitch Background & Color Reveal */}
                                        <div
                                            className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 scale-110 group-hover/card:scale-100 ease-out"
                                            style={{
                                                backgroundImage: `url(${logoUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                filter: 'contrast(120%) brightness(80%)',
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 bg-black/80 z-10 translate-x-full group-hover/card:translate-x-0 transition-transform duration-500 ease-[0.85,0,0.15,1]"
                                        />

                                        {/* Content Overlay */}
                                        <div className="relative z-20 flex flex-col h-full justify-between">
                                            <div className="flex justify-between items-start">
                                                {/* Premium Side-Tab Detail */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1 h-12 md:h-16 bg-black group-hover/card:bg-primary-500 transition-colors duration-300" />
                                                    <div
                                                        className="h-12 md:h-16 w-28 md:w-36 relative flex items-center justify-center px-4"
                                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[400] }}
                                                    >
                                                        <img
                                                            src={logoUrl}
                                                            alt={org.name}
                                                            className="max-h-full max-w-full object-contain grayscale group-hover/card:grayscale-0 transition-all duration-700 group-hover/card:scale-105"
                                                        />
                                                    </div>
                                                </div>

                                                <span
                                                    className="text-[10px] md:text-[12px] font-black tabular-nums transition-colors duration-500 italic mt-2"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
                                                >
                                                    <span className="group-hover/card:text-primary-400">REG_{String(org.id).padStart(4, '0')}</span>
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 group/tag">
                                                    <span
                                                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 transition-colors duration-300"
                                                        style={{
                                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                                            color: DESIGN_SYSTEM.COLORS.ZINC[100]
                                                        }}
                                                    >
                                                        <span className="group-hover/card:text-primary-400 group-hover/tag:text-primary-500">
                                                            {org.basics?.industry || 'Industrial'}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-end justify-between gap-4">
                                                    <h3
                                                        className="text-lg md:text-2xl font-black uppercase italic tracking-tighter leading-none transition-colors duration-500 max-w-[70%]"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                    >
                                                        <span className="group-hover/card:text-white">{org.name}</span>
                                                    </h3>
                                                    <ChevronRight className="w-6 h-6 text-black group-hover/card:text-primary-500 transition-colors duration-300" strokeWidth={3} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Corner Accent */}
                                        <div
                                            className="absolute bottom-0 right-0 w-8 h-8 group-hover/card:w-10 group-hover/card:h-10 transition-all duration-300"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                                clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                <div
                    className="flex overflow-hidden opacity-20 pointer-events-none py-4"
                    style={{
                        borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`,
                        borderBottom: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
                    }}
                >
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: [-2800, 0] }}
                        transition={{ repeat: Infinity, repeatType: "loop", duration: 80, ease: "linear" }}
                    >
                        {duplicatedOrgs.slice(0, 10).reverse().map((org, idx) => (
                            <div key={`rev-${org.id}-${idx}`} className="flex items-center gap-10 px-20 group/rev">
                                <span
                                    className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter transition-colors duration-300"
                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    <span className="group-hover/rev:text-primary-500">{org.alias || org.name}</span>
                                </span>
                                <Plus size={40} strokeWidth={4} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {selectedOrg && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrg(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full md:h-auto md:max-w-6xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-white"
                            style={{ clipPath: cardClipPath }} // Applying the premium bevel to modal too
                        >
                            <button
                                onClick={() => setSelectedOrg(null)}
                                className="absolute top-6 right-6 z-20 p-4 transition-colors group/close"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE, color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                            >
                                <X size={24} className="group-hover/close:text-primary-500 transition-colors" />
                            </button>

                            {/* Left Panel - Utility & Visuals */}
                            <div
                                className="w-full md:w-[35%] p-10 md:p-12 flex flex-col gap-10 border-b md:border-b-0 md:border-r"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[400], borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                            >
                                <div
                                    className="w-full aspect-square shadow-[15px_15px_0px_rgba(0,0,0,0.05)] overflow-hidden p-8 flex items-center justify-center group/logo bg-white"
                                    style={{ clipPath: cardClipPath, border: `2px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
                                >
                                    <img
                                        src={(selectedOrg.assets?.logo as Media)?.url ?? `https://picsum.photos/seed/org-modal-${selectedOrg.id}/600/400`}
                                        alt={selectedOrg.name}
                                        className="max-w-full max-h-full object-contain grayscale transition-all duration-700 group-hover/logo:grayscale-0 group-hover/logo:scale-110"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="p-3 bg-black rounded-sm group-hover/item:bg-primary-500/10 transition-colors">
                                            <Hash size={20} className="transition-transform duration-300 group-hover/item:rotate-12" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[9px] font-black uppercase tracking-widest transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                            >
                                                <span className="group-hover/item:text-primary-500">Registry UID</span>
                                            </span>
                                            <span
                                                className="text-base font-black uppercase italic tracking-tighter transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                <span className="group-hover/item:text-primary-600">{selectedOrg.basics?.identifiers?.code || `ORG-${selectedOrg.id}`}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="p-3 bg-black rounded-sm group-hover/item:bg-primary-500/10 transition-colors">
                                            <TrendingUp size={20} className="transition-transform duration-300 group-hover/item:-translate-y-1" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[9px] font-black uppercase tracking-widest transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                            >
                                                <span className="group-hover/item:text-primary-500">Global Impact</span>
                                            </span>
                                            <span
                                                className="text-base font-black uppercase italic tracking-tighter transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                <span className="group-hover/item:text-primary-600">{selectedOrg.details?.impact || 'Verified'}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Information */}
                            <div className="w-full md:w-[65%] p-10 md:p-16 flex flex-col gap-10 bg-white overflow-y-auto">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-3">
                                        <span
                                            className="px-3 py-1.5 text-[11px] font-black uppercase tracking-tighter transition-all duration-300 cursor-default"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE, color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                        >
                                            Partner Entity
                                        </span>
                                        <span
                                            className="px-3 py-1.5 text-[11px] font-black uppercase tracking-tighter border-2 transition-all duration-300 cursor-default hover:text-primary-500 hover:border-primary-500"
                                            style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE, color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {selectedOrg.basics?.industry || 'Industrial'}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-[0.85] transition-colors duration-500 group/title"
                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                    >
                                        <span className="group-hover/title:text-primary-600">{selectedOrg.name}</span>
                                    </h2>
                                    {selectedOrg.basics?.tagline && (
                                        <p
                                            className="text-xl font-black uppercase italic tracking-tight leading-none transition-colors duration-300 group/tagline"
                                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[600] }}
                                        >
                                            <span className="group-hover/tagline:text-black">"{selectedOrg.basics.tagline}"</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-6 group/brief border-l-4 pl-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                    <span
                                        className="text-[11px] font-black uppercase tracking-[0.4em] transition-colors"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[900] }}
                                    >
                                        <span className="group-hover/brief:text-primary-500">Infrastructure Brief</span>
                                    </span>
                                    <p
                                        className="text-base md:text-lg font-bold leading-snug uppercase tracking-tight transition-colors duration-300"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}
                                    >
                                        <span className="hover:text-black">{selectedOrg.basics?.description || 'Corporate operational data is currently being indexed.'}</span>
                                    </p>
                                </div>

                                {selectedOrg.details?.benefits?.list && selectedOrg.details.benefits.list.length > 0 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 group/provision">
                                            <Layers size={16} className="transition-colors group-hover/provision:text-primary-500" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                            <span
                                                className="text-[11px] font-black uppercase tracking-[0.4em] transition-colors"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[900] }}
                                            >
                                                <span className="group-hover/provision:text-primary-500">Provision Matrix</span>
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedOrg.details.benefits.list.map((benefit) => (
                                                <div
                                                    key={benefit.id}
                                                    className="p-5 border-2 transition-all duration-300 group/benefit hover:-translate-y-1 hover:shadow-lg bg-white"
                                                    style={{
                                                        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                                                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Zap size={14} className="transition-transform duration-300 group-hover/benefit:scale-125" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                        <span
                                                            className="text-[11px] font-black uppercase italic transition-colors"
                                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                        >
                                                            <span className="group-hover/benefit:text-primary-500">{benefit.name}</span>
                                                        </span>
                                                    </div>
                                                    <p
                                                        className="text-[10px] font-bold uppercase leading-tight transition-colors"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                                    >
                                                        <span className="group-hover/benefit:text-zinc-800">{benefit.description}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="mt-auto pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                                    style={{ borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
                                >
                                    <div className="flex flex-col group/footer">
                                        <span
                                            className="text-[9px] font-black uppercase tracking-widest transition-colors"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                        >
                                            <span className="group-hover/footer:text-primary-500">File Update</span>
                                        </span>
                                        <span
                                            className="text-xs font-black uppercase tabular-nums transition-colors"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            <span className="group-hover/footer:text-primary-600">
                                                {new Date(selectedOrg.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </span>
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-4 p-4 italic font-black text-[10px] uppercase transition-all duration-300 group/verify border"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                            borderColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                            color: DESIGN_SYSTEM.COLORS.ZINC[500],
                                            clipPath: cardClipPath.replaceAll('20px', '10px')
                                        }}
                                    >
                                        <Fingerprint size={20} className="transition-all duration-300 group-hover/verify:scale-110" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <span className="group-hover/verify:text-black">Corporate node verified</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}