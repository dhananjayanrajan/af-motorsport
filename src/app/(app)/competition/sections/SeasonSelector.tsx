'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Season, Series } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface SeasonSelectorProps {
  seasons: Season[];
  series: Series[];
  activeSeason: Season;
}

export default function SeasonSelector({ seasons, series, activeSeason }: SeasonSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filterSeriesId, setFilterSeriesId] = useState<number | 'ALL'>(
    searchParams.get('series') ? Number(searchParams.get('series')) : 'ALL'
  );

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSeriesToggle = (id: number | 'ALL') => {
    setFilterSeriesId(id);
    if (id !== 'ALL') {
      updateParams('series', id.toString());
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('series');
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  const handleSeasonSelect = (slug: string) => {
    updateParams('season', slug);
  };

  const filteredSeasons = seasons.filter(s =>
    filterSeriesId === 'ALL' || (s.details.series as Series).id === filterSeriesId
  );

  const uniqueYears = Array.from(new Set(filteredSeasons.map(s => s.name.match(/\d{4}/)?.[0] || '0000')))
    .sort((a, b) => Number(b) - Number(a));

  const shouldLoop = uniqueYears.length > 6;
  const displayYears = shouldLoop ? [...uniqueYears, ...uniqueYears, ...uniqueYears] : uniqueYears;
  const activeYear = activeSeason.name.match(/\d{4}/)?.[0] || '0000';

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !shouldLoop) return;

    const scrollWidth = container.scrollWidth / 3;
    container.scrollLeft = scrollWidth;

    let animationFrameId: number;
    const scroll = () => {
      container.scrollLeft += 0.8;
      if (container.scrollLeft >= scrollWidth * 2) {
        container.scrollLeft = scrollWidth;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [filterSeriesId, shouldLoop]);

  return (
    <section className="bg-white border-b border-zinc-200 select-none">
      <div className="flex border-b border-zinc-100 overflow-x-auto no-scrollbar bg-zinc-50">
        <button
          onClick={() => handleSeriesToggle('ALL')}
          className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.5em] transition-colors border-r border-zinc-200 shrink-0 ${filterSeriesId === 'ALL' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
            }`}
        >
          REGISTRY_ALL
        </button>
        {series.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSeriesToggle(s.id)}
            className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.5em] transition-colors border-r border-zinc-200 shrink-0 ${filterSeriesId === s.id ? 'text-black' : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`}
            style={{ backgroundColor: filterSeriesId === s.id ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
          >
            {s.basics?.identifiers?.abbreviation || s.name}
          </button>
        ))}
      </div>

      <div className="relative h-80 flex items-center justify-center overflow-hidden bg-white">
        <div
          ref={scrollRef}
          className={`relative z-10 flex gap-24 items-center overflow-x-auto px-[20vw] h-full no-scrollbar ${shouldLoop ? 'cursor-default' : 'justify-center'
            }`}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {displayYears.map((year, idx) => {
            const seasonForYear = filteredSeasons.find((s) => s.name.includes(year));
            const isActive = activeYear === year;

            return (
              <div key={`${year}-${idx}`} className="relative flex flex-col items-center justify-center min-w-fit h-48">
                <button
                  onClick={() => seasonForYear && handleSeasonSelect(seasonForYear.slug!)}
                  className={`text-8xl font-black italic tracking-tighter transition-all duration-500 outline-none transform ${isActive ? 'text-black scale-110' : 'text-zinc-200 hover:text-zinc-500 scale-100'
                    }`}
                >
                  {year}
                </button>

                <div
                  className="absolute bottom-2 h-[4px] transition-all duration-500 ease-in-out"
                  style={{
                    width: isActive ? '100%' : '0%',
                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                  }}
                />

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-2 w-2 h-2 rotate-45"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}