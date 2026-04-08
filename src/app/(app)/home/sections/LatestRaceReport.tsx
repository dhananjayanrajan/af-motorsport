import { Circuit, Driver, Entry, Media, Race, Result } from '@/payload-types';

interface LatestRaceReportProps {
    race: Race;
    results: Result[];
    drivers: Driver[];
    circuits: Circuit[];
}

export default function LatestRaceReport({
    race,
    results,
    drivers,
    circuits,
}: LatestRaceReportProps) {
    const raceWinner = typeof race.details?.winner === 'object' ? race.details.winner : null;
    const circuit = typeof race.details?.circuit === 'object' ? race.details.circuit : null;

    const podiumResults = results
        .filter((r) => r.details?.overall && r.details.overall <= 3)
        .sort((a, b) => (a.details?.overall || 0) - (b.details?.overall || 0));

    const fastestLapEntry = typeof race.details?.fastest_lap === 'object' ? (race.details.fastest_lap as Entry) : null;
    const poleEntry = typeof race.details?.pole_position === 'object' ? (race.details.pole_position as Entry) : null;

    return (
        <section className="bg-black py-20 px-6 md:px-12 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px w-12 bg-red-600" />
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                        Immediate Post-Race Report
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="relative group overflow-hidden bg-[#0a0a0a] border border-white/5 p-8 md:p-12">
                            <div className="relative z-10">
                                <div className="flex flex-wrap items-center gap-6 mb-8">
                                    <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase skew-x-[-12deg]">
                                        <span className="inline-block skew-x-[12deg]">Winner</span>
                                    </span>
                                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                                        {raceWinner ? `${raceWinner.first_name} ${raceWinner.last_name}` : 'TBA'}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                    {podiumResults.map((result, idx) => (
                                        <div key={result.id} className="border-l border-white/10 pl-6">
                                            <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-2">
                                                P{idx + 1} Finish
                                            </span>
                                            <span className="text-white font-bold uppercase italic text-lg">
                                                {result.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-red-600 font-mono text-xs">01</span>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                                            {race.basics?.description || 'Race narrative pending official stewards review.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {race.assets?.cover && typeof race.assets.cover !== 'number' && (
                                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                                    <img
                                        src={(race.assets.cover as Media).url || ''}
                                        alt=""
                                        className="w-full h-full object-cover grayscale"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-1">
                        <div className="bg-white/5 p-8 flex flex-col justify-between group hover:bg-red-600 transition-colors duration-500">
                            <div>
                                <span className="block text-[9px] text-gray-400 group-hover:text-white/60 font-mono uppercase tracking-widest mb-4">
                                    Pole Position
                                </span>
                                <span className="text-2xl font-black text-white uppercase italic">
                                    {poleEntry?.name || 'Unconfirmed'}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] text-white/40 group-hover:text-white font-bold uppercase tracking-widest">
                                    Grid Leader
                                </span>
                                <div className="w-8 h-px bg-white/20 group-hover:bg-white" />
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 flex flex-col justify-between group hover:bg-white transition-colors duration-500">
                            <div>
                                <span className="block text-[9px] text-gray-400 group-hover:text-black/60 font-mono uppercase tracking-widest mb-4">
                                    Fastest Lap
                                </span>
                                <span className="text-2xl font-black text-white group-hover:text-black uppercase italic">
                                    {race.details?.fastest_lap_time || '--:--.---'}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] text-white/40 group-hover:text-black font-bold uppercase tracking-widest">
                                    {fastestLapEntry?.name || 'TBA'}
                                </span>
                                <div className="w-8 h-px bg-white/20 group-hover:bg-black" />
                            </div>
                        </div>

                        <div className="bg-[#0f0f0f] p-8 border border-white/5">
                            <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-4">
                                Location // Tech
                            </span>
                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="block text-white font-black uppercase italic text-xl">
                                        {circuit?.name || 'Neutral Venue'}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                        {race.details?.weather || 'Clear Skies'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-red-600 font-black text-2xl skew-x-[-12deg]">
                                        {race.details?.laps || '0'}
                                    </span>
                                    <span className="text-[9px] text-gray-600 font-mono uppercase">Laps Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}