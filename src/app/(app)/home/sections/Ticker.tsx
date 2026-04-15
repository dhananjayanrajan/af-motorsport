'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship } from '@/payload-types';
import { motion } from 'framer-motion';

interface ChampionshipTickerProps {
    championships: Championship[];
}

export default function ChampionshipTicker({ championships }: ChampionshipTickerProps) {
    const list = Array.isArray(championships) ? championships : [];
    const tickerItems = [...list, ...list, ...list, ...list];

    return (
        <section
            className="relative w-full overflow-hidden py-2 border-y-2"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        >
            <div className="flex flex-col gap-1">
                <div
                    className="py-3 flex overflow-hidden border-b"
                    style={{ borderColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}33` }}
                >
                    <motion.div
                        animate={{ x: [0, -1500] }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="flex whitespace-nowrap gap-16 items-center"
                    >
                        {tickerItems.map((champ, i) => (
                            <TickerRow key={`top-${i}`} championship={champ} reverse={false} />
                        ))}
                    </motion.div>
                </div>

                <div className="py-3 flex overflow-hidden">
                    <motion.div
                        animate={{ x: [-1500, 0] }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="flex whitespace-nowrap gap-16 items-center"
                    >
                        {tickerItems.map((champ, i) => (
                            <TickerRow key={`bottom-${i}`} championship={champ} reverse={true} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div
                className="absolute inset-y-0 left-0 w-32 z-20 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.WHITE.PURE}, transparent)` }}
            />
            <div
                className="absolute inset-y-0 right-0 w-32 z-20 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${DESIGN_SYSTEM.COLORS.WHITE.PURE}, transparent)` }}
            />
        </section>
    );
}

function TickerRow({ championship, reverse }: { championship: Championship; reverse: boolean }) {
    const code = championship.basics?.identifiers?.code || 'CHMP';
    const accentColor = reverse ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.PRIMARY[500];

    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <span
                    className="text-[10px] font-black px-2 py-0.5 border"
                    style={{
                        color: accentColor,
                        borderColor: accentColor,
                        fontFamily: 'monospace'
                    }}
                >
                    {code}
                </span>
                <span
                    className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter"
                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                >
                    {championship.name}
                </span>
            </div>

            <div className="flex items-center gap-1">
                <div
                    className="w-8 h-1 skew-x-[-20deg]"
                    style={{ backgroundColor: accentColor }}
                />
                <div
                    className="w-2 h-1 skew-x-[-20deg]"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }}
                />
            </div>

            {championship.basics?.tagline && (
                <span
                    className="text-[10px] font-bold uppercase italic opacity-60"
                    style={{
                        color: DESIGN_SYSTEM.COLORS.ZINC[500],
                        letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
                    }}
                >
                    {championship.basics.tagline}
                </span>
            )}

            <div
                className="size-1 rounded-full"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }}
            />
        </div>
    );
}