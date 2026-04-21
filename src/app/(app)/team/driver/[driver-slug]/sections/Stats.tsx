'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { cn } from '@/utilities/cn';
import { Activity, Timer, Trophy } from 'lucide-react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface StatSectionProps {
    driver: any;
}

interface StatItem {
    id: string;
    label: string;
    value: string;
    suffix: string;
    icon: any;
    description: string;
    specs: { label: string; value: string }[];
}

export default function StatSection({ driver }: StatSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.01 });

    const totalPoints = typeof driver.details?.points === 'number'
        ? driver.details.points.toString()
        : (driver.details?.points?.total || driver.points || '0').toString();

    const totalResults = Array.isArray(driver.details?.results)
        ? driver.details.results.length.toString()
        : '0';

    const racingNumber = (driver.basics?.racing_number || driver.number || '00').toString();
    const nationality = typeof driver.basics?.nationality === 'object'
        ? driver.basics.nationality?.name
        : (driver.basics?.nationality || driver.nationality || 'INTL');

    const callsign = driver.basics?.callsign || driver.alias || 'PILOT';

    const driverStats: StatItem[] = [
        {
            id: '01',
            label: 'CHAMPIONSHIP_TOTAL',
            value: totalPoints,
            suffix: 'PTS',
            icon: Trophy,
            description: `${driver.first_name?.toUpperCase() || ''} ${driver.last_name?.toUpperCase() || ''} ACCUMULATED SCORING DATA ACROSS ACTIVE SESSIONS.`,
            specs: [
                { label: 'ENTRIES', value: totalResults },
                { label: 'RANKING', value: (driver.details?.rank || driver.rank || 'VERIFIED').toString() }
            ]
        },
        {
            id: '02',
            label: 'REGISTRATION_DATA',
            value: racingNumber,
            suffix: 'UNIT',
            icon: Activity,
            description: `ACTIVE IDENTIFICATION ASSIGNED TO ${callsign.toUpperCase()} FOR COMPETITIVE DEPLOYMENT.`,
            specs: [
                { label: 'ORIGIN', value: nationality.toUpperCase() },
                { label: 'GENDER', value: driver.basics?.gender?.toUpperCase() || 'N/A' }
            ]
        },
        {
            id: '03',
            label: 'OPERATIONAL_AGE',
            value: driver.basics?.birth_date ? (new Date().getFullYear() - new Date(driver.basics.birth_date).getFullYear()).toString() : '0',
            suffix: 'YEARS',
            icon: Timer,
            description: `CHRONOLOGICAL TRACKING OF UNIT FROM INITIAL BIOLOGICAL ACTIVATION.`,
            specs: [
                { label: 'DEBUT', value: driver.basics?.debut_date?.split('-')[0] || 'N/A' },
                { label: 'SYSTEM', value: 'STABLE' }
            ]
        }
    ];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="fixed top-1/2 right-4 md:right-12 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-none hidden sm:flex"
            >
                {driverStats.map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <span className={`text-[10px] font-black transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE}`} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>0{i + 1}</span>
                        <div className="w-[4px] h-20 rounded-full overflow-hidden border" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}1A`, borderColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}33` }}>
                            <motion.div
                                className="w-full origin-top"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                    height: useTransform(
                                        scrollYProgress,
                                        [i / driverStats.length, (i + 1) / driverStats.length],
                                        ["0%", "100%"]
                                    )
                                }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="w-full relative z-10">
                {driverStats.map((stat, index) => (
                    <StatSlide key={stat.id} stat={stat} index={index} driver={driver} />
                ))}
            </div>

            <motion.div
                style={{
                    scaleX,
                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                    opacity: isInView ? 1 : 0,
                    borderTopColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                }}
                className="fixed bottom-0 left-0 right-0 h-2 origin-left z-50 transition-opacity duration-300 shadow-[0_-4px_15px_rgba(0,0,0,0.3)] border-t"
            />
        </div>
    );
}

function StatSlide({ stat, index, driver }: { stat: StatItem; index: number; driver: any }) {
    const slideRef = useRef(null);
    const coverUrl = driver.assets?.cover?.url || `https://picsum.photos/seed/${stat.id}${driver.id}/1920/1080`;
    const parsedEase = [0.87, 0, 0.13, 1] as [number, number, number, number];

    return (
        <section
            ref={slideRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden sticky top-0 border-b py-20"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderBottomColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}33` }}
        >
            <div className="absolute inset-0 z-0">
                <img src={coverUrl} className="w-full h-full object-cover opacity-15 contrast-125" alt="" />
                <div className="absolute inset-0" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}B3` }} />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <span className="text-[30vw] font-black select-none leading-none" style={{ color: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}0D` }}>
                        {stat.id}
                    </span>
                </div>
            </div>

            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

                    <div className="md:col-span-7 flex flex-col gap-6 md:gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-4 md:gap-6 group pointer-events-auto"
                        >
                            <div className="p-3 transition-colors duration-200 group-hover:bg-primary-600" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                <stat.icon className="size-6 md:size-7" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn("text-xs md:text-sm font-black uppercase italic leading-none transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL)} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                    {stat.label}
                                </span>
                                <div className="h-1 w-full mt-1 transition-all group-hover:h-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: parsedEase }}
                            className="flex flex-wrap items-baseline gap-4 md:gap-6 group pointer-events-auto"
                        >
                            <h2 className={`text-6xl sm:text-8xl md:text-[11rem] font-black italic leading-none tracking-tighter transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-primary-500`} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {stat.value}
                            </h2>
                            <span className={`text-2xl sm:text-4xl md:text-6xl font-black italic uppercase transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-secondary-500`} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                {stat.suffix}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full md:max-w-xl p-6 md:p-10 border-l-8 relative shadow-xl h-auto group pointer-events-auto transition-all"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            <div className="absolute -top-[1px] right-0 w-12 h-[1px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                            <p className={cn("text-sm sm:text-base md:text-lg font-black uppercase italic leading-tight transition-colors group-hover:text-primary-600", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {stat.description}
                            </p>
                        </motion.div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
                        {stat.specs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-6 md:p-8 flex flex-col gap-2 transition-all duration-500 border-l-4 shadow-lg h-auto group pointer-events-auto hover:translate-x-2"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-colors group-hover:text-primary-500" style={{ color: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}99` }}>{spec.label}</span>
                                <span className="text-2xl sm:text-3xl md:text-5xl font-black italic break-words transition-colors group-hover:text-secondary-600" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}