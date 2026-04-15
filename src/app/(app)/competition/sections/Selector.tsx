'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Season, Series } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Flag, Sparkles, Trophy, Zap } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

interface SeasonSelectorProps {
  seasons: Season[];
  series: Series[];
  activeSeason: Season;
}

export default function SeasonSelector({ seasons, series, activeSeason }: SeasonSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const [filterSeriesId, setFilterSeriesId] = useState<number | 'ALL'>(
    searchParams.get('series') ? Number(searchParams.get('series')) : 'ALL'
  );

  const handleSeriesToggle = (id: number | 'ALL') => {
    setFilterSeriesId(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id !== 'ALL') {
      params.set('series', id.toString());
    } else {
      params.delete('series');
    }
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleSeasonSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('season', slug);
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const filteredSeasons = seasons.filter(s =>
    filterSeriesId === 'ALL' || (typeof s.details.series === 'number' ? s.details.series === filterSeriesId : s.details.series?.id === filterSeriesId)
  );

  if (filteredSeasons.length === 0) {
    return (
      <section className="w-full py-32" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}10` }}>
            <Trophy className="w-8 h-8" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
            NO SEASONS AVAILABLE
          </p>
        </div>
      </section>
    );
  }

  const uniqueYears = Array.from(new Set(filteredSeasons.map(s => s.name?.match(/\d{4}/)?.[0] || '2026')))
    .sort((a, b) => Number(b) - Number(a));

  const shouldLoop = uniqueYears.length > 6;
  const displayYears = shouldLoop ? [...uniqueYears, ...uniqueYears, ...uniqueYears] : uniqueYears;
  const activeYear = activeSeason?.name?.match(/\d{4}/)?.[0] || uniqueYears[0] || '2026';

  // Helper function to get race count safely
  const getRaceCount = (season: Season): number => {
    const races = season.details?.races;
    if (Array.isArray(races)) {
      return races.length;
    }
    return 0;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !shouldLoop) return;

    const scrollWidth = container.scrollWidth / 3;
    container.scrollLeft = scrollWidth;

    let animationFrameId: number;
    let speed = 0.5;
    let targetSpeed = 0.5;

    const scroll = () => {
      speed += (targetSpeed - speed) * 0.02;
      container.scrollLeft += speed;
      if (container.scrollLeft >= scrollWidth * 2) {
        container.scrollLeft = scrollWidth;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { targetSpeed = 0.1; };
    const handleMouseLeave = () => { targetSpeed = 0.5; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [filterSeriesId, shouldLoop]);

  return (
    <section className="w-full relative overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
      {/* Abstract background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-[80px]" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}08` }} />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.SECONDARY[500]}05` }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.02 }}>
          <defs>
            <pattern id="season-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#season-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative py-16">
        {/* Header with visual flair */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
              CHAMPIONSHIP ARCHIVE
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
            Select Your Season
          </h2>
          <div className="w-12 h-[2px] mx-auto mt-4" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
        </motion.div>

        {/* Series filter - pill style with icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSeriesToggle('ALL')}
            className="relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden group"
            style={{
              backgroundColor: filterSeriesId === 'ALL' ? DESIGN_SYSTEM.COLORS.BLACK[600] : 'transparent',
              color: filterSeriesId === 'ALL' ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[500],
              border: `1px solid ${filterSeriesId === 'ALL' ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200]}`
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Flag className="w-3 h-3" />
              ALL SERIES
            </span>
            {filterSeriesId === 'ALL' && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 -z-0"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>

          {series.map((s) => (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSeriesToggle(s.id)}
              className="relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden group"
              style={{
                backgroundColor: filterSeriesId === s.id ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : 'transparent',
                color: filterSeriesId === s.id ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.ZINC[500],
                border: `1px solid ${filterSeriesId === s.id ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200]}`
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                {s.basics?.identifiers?.abbreviation || s.name}
              </span>
              {filterSeriesId === s.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 -z-0"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Year carousel - dramatic and engaging */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="relative z-10 flex gap-12 md:gap-20 items-center overflow-x-auto px-[10vw] md:px-[15vw] py-12 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {displayYears.map((year, idx) => {
              const seasonForYear = filteredSeasons.find((s) => s.name?.includes(year));
              const isActive = activeYear === year;
              const isHovered = hoveredYear === year;
              const raceCount = seasonForYear ? getRaceCount(seasonForYear) : 0;

              return (
                <motion.div
                  key={`${year}-${idx}`}
                  onHoverStart={() => setHoveredYear(year)}
                  onHoverEnd={() => setHoveredYear(null)}
                  className="relative flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Glow orb behind active year */}
                  {isActive && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full -z-10"
                      style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}08` }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                    />
                  )}

                  <button
                    onClick={() => seasonForYear && handleSeasonSelect(seasonForYear.slug || '')}
                    disabled={isPending}
                    className="relative outline-none"
                  >
                    <motion.span
                      className="text-6xl md:text-7xl font-black italic tracking-tighter block"
                      style={{
                        color: isActive ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.ZINC[200],
                        textShadow: isActive ? `0 0 20px ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}20` : 'none'
                      }}
                      animate={{
                        scale: isHovered && !isActive ? 1.1 : 1,
                        color: isHovered && !isActive ? DESIGN_SYSTEM.COLORS.ZINC[400] : undefined
                      }}
                    >
                      {year}
                    </motion.span>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 h-[2px] -translate-x-1/2"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                      animate={{
                        width: isActive ? '80%' : (isHovered ? '40%' : '0%'),
                        opacity: isActive ? 1 : (isHovered ? 0.5 : 0)
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  {/* Active season badge */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                        className="absolute -top-12 px-3 py-1.5 flex items-center gap-2 whitespace-nowrap"
                        style={{
                          backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                          borderLeft: `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                        }}
                      >
                        <Sparkles className="w-3 h-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                          {isPending ? 'LOADING' : 'CURRENT SEASON'}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Season count indicator */}
                  {raceCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute -bottom-8 text-[8px] font-black uppercase tracking-[0.15em] whitespace-nowrap"
                      style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                      {raceCount} RACE{raceCount !== 1 ? 'S' : ''}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Gradient fades with subtle blur */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none z-20" style={{ background: `linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.WHITE[50]}, transparent)` }} />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none z-20" style={{ background: `linear-gradient(to left, ${DESIGN_SYSTEM.COLORS.WHITE[50]}, transparent)` }} />

          {/* Decorative scroll hint */}
          {shouldLoop && (
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-[0.3em]"
              style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
            >
              ← SCROLL →
            </motion.div>
          )}
        </div>

        {/* Footer stat line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-8 text-center border-t"
          style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
        >
          <div className="flex items-center justify-center gap-8 text-[9px] font-mono">
            <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
              {filteredSeasons.length} SEASONS
            </span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
            <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
              {uniqueYears.length} YEARS
            </span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
            <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
              {series.length} SERIES
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}