'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Season, Series } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
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
    filterSeriesId === 'ALL' || (typeof s.details.series === 'number' ? s.details.series === filterSeriesId : s.details.series.id === filterSeriesId)
  );

  const uniqueYears = Array.from(new Set(filteredSeasons.map(s => s.name.match(/\d{4}/)?.[0] || '2026')))
    .sort((a, b) => Number(b) - Number(a));

  const shouldLoop = uniqueYears.length > 6;
  const displayYears = shouldLoop ? [...uniqueYears, ...uniqueYears, ...uniqueYears] : uniqueYears;
  const activeYear = activeSeason.name.match(/\d{4}/)?.[0] || '2026';

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !shouldLoop) return;

    const scrollWidth = container.scrollWidth / 3;
    container.scrollLeft = scrollWidth;

    let animationFrameId: number;
    const scroll = () => {
      container.scrollLeft += 0.5;
      if (container.scrollLeft >= scrollWidth * 2) {
        container.scrollLeft = scrollWidth;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [filterSeriesId, shouldLoop]);

  return (
    <section className="bg-white border-b border-[#e4e4e7] select-none w-full">
      <div className="flex border-b border-[#f4f4f5] overflow-x-auto no-scrollbar bg-[#fafafa]">
        <button
          onClick={() => handleSeriesToggle('ALL')}
          className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-200 border-r border-[#e4e4e7] shrink-0 ${filterSeriesId === 'ALL' ? 'bg-[#111111] text-[#FFFFFF]' : 'text-[#71717a] hover:text-[#111111] hover:bg-[#f4f4f5]'
            }`}
        >
          ALL SERIES
        </button>
        {series.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSeriesToggle(s.id)}
            className={`px-8 py-5 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-200 border-r border-[#e4e4e7] shrink-0 ${filterSeriesId === s.id ? 'text-[#111111]' : 'text-[#71717a] hover:text-[#111111] hover:bg-[#f4f4f5]'
              }`}
            style={{ backgroundColor: filterSeriesId === s.id ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
          >
            {s.basics?.identifiers?.abbreviation || s.name}
          </button>
        ))}
      </div>

      <div className="relative h-64 flex items-center justify-center overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className={`relative z-10 flex gap-20 items-center overflow-x-auto px-[15vw] h-full no-scrollbar ${shouldLoop ? 'cursor-default' : 'justify-center'
            }`}
          style={{ scrollbarWidth: 'none' }}
        >
          {displayYears.map((year, idx) => {
            const seasonForYear = filteredSeasons.find((s) => s.name.includes(year));
            const isActive = activeYear === year;

            return (
              <div key={`${year}-${idx}`} className="relative flex flex-col items-center justify-center min-w-[120px]">
                <button
                  onClick={() => seasonForYear && handleSeasonSelect(seasonForYear.slug || '')}
                  disabled={isPending}
                  className={`text-6xl font-black italic tracking-tighter transition-all duration-500 outline-none transform ${isActive ? 'text-[#111111] scale-105' : 'text-[#e4e4e7] hover:text-[#a1a1aa] scale-100'
                    }`}
                >
                  {year}
                </button>

                <div
                  className="absolute -bottom-4 h-[3px] transition-all duration-500 ease-in-out"
                  style={{
                    width: isActive ? '100%' : '0%',
                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                  }}
                />

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-8 px-3 py-1 bg-[#111111] text-[#00FF41] text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                      {isPending ? 'LOADING' : 'ACTIVE'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}