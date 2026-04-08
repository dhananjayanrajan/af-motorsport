import { Championship, Media, Season, Series } from '@/payload-types';

interface FeaturedChampionshipsProps {
    championships: Championship[];
    series: Series[];
    seasons: Season[];
}

export default function FeaturedChampionships({
    championships,
    series,
    seasons,
}: FeaturedChampionshipsProps) {
    return (
        <section className="bg-black py-24 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-white text-xs font-mono tracking-[0.4em] uppercase opacity-50 mb-4">
                            Active // Competitions
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                            Featured Championships
                        </h3>
                    </div>
                    <div className="h-px flex-grow bg-white/10 mx-8 hidden lg:block mb-4" />
                    <button className="text-white text-sm font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                        View All Series
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 p-px">
                    {championships.map((champ) => {
                        const seriesId = typeof champ.details?.series === 'object'
                            ? champ.details.series?.id
                            : champ.details?.series;

                        const associatedSeries = series.find((s) => s.id === seriesId);

                        const latestSeason = seasons.find((s) => {
                            const champIdFromSeason = typeof s.details?.series === 'object'
                                ? (s.details.series as any)?.championship?.id
                                : null;
                            return champIdFromSeason === champ.id;
                        });

                        return (
                            <div
                                key={champ.id}
                                className="group relative bg-[#0a0a0a] overflow-hidden transition-all duration-500"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    {champ.assets?.thumbnail && typeof champ.assets.thumbnail !== 'number' ? (
                                        <img
                                            src={(champ.assets.thumbnail as Media).url || ''}
                                            alt={champ.name}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                                            <div className="w-12 h-px bg-white/10" />
                                        </div>
                                    )}

                                    <div className="absolute top-0 left-0">
                                        <div className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-2 tracking-widest skew-x-[-12deg] -translate-x-2">
                                            <span className="inline-block skew-x-[12deg]">
                                                {associatedSeries?.basics?.identifiers?.code || 'PRO'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 relative">
                                    <div className="absolute top-0 right-8 w-px h-12 bg-gradient-to-b from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <h4 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight group-hover:text-red-600 transition-colors">
                                        {champ.name}
                                    </h4>

                                    {champ.basics?.tagline && (
                                        <p className="text-gray-500 text-[11px] font-bold mb-8 uppercase tracking-widest leading-tight">
                                            {champ.basics.tagline}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 relative">
                                        <div className="before:absolute before:top-0 before:left-0 before:w-4 before:h-px before:bg-red-600">
                                            <span className="block text-[9px] text-gray-600 uppercase font-mono tracking-widest mb-1">
                                                Active Season
                                            </span>
                                            <span className="text-white text-sm font-black uppercase italic">
                                                {latestSeason?.name || 'TBA'}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[9px] text-gray-600 uppercase font-mono tracking-widest mb-1">
                                                Status
                                            </span>
                                            <span className="text-white text-sm font-black uppercase italic">
                                                {associatedSeries?.details?.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>

                                    <a
                                        href={`/championships/${champ.alias || champ.id}`}
                                        className="mt-8 flex items-center justify-between w-full group/btn border border-white/5 p-4 hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                                            Standings Hub
                                        </span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="group-hover:translate-x-1 transition-transform"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}