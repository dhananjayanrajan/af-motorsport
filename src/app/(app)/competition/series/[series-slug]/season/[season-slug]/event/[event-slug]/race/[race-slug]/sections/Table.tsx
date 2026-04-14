'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Result } from '@/payload-types';

interface ClassificationTableProps {
    results: Result[];
}

export default function ClassificationTable({ results }: ClassificationTableProps) {
    return (
        <section className="w-full border-t" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400, width: '80px' }}>Pos</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Competitor</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Laps</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Time/Gap</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Avg Speed</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest border-b text-right" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id} className="group hover:bg-zinc-50 transition-colors duration-150">
                                <td className="p-6 border-b border-r font-black italic text-2xl tabular-nums" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                    {result.details?.overall || '--'}
                                </td>
                                <td className="p-6 border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase italic tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                            {result.name}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                                            {result.alias || 'Standard Entry'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6 border-b font-bold tabular-nums" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                                    {result.details?.laps || '--'}
                                </td>
                                <td className="p-6 border-b font-black italic tabular-nums" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                    {result.details?.time ? `${result.details.time}` : result.details?.gap ? `+${result.details.gap}` : '--'}
                                </td>
                                <td className="p-6 border-b font-bold tabular-nums" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                                    {result.details?.speed ? `${result.details.speed} km/h` : '--'}
                                </td>
                                <td className="p-6 border-b text-right" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                    <span className="inline-block px-3 py-1 text-[8px] font-black uppercase tracking-widest border"
                                        style={{
                                            color: result.details?.status === 'Official' ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_400,
                                            borderColor: result.details?.status === 'Official' ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200
                                        }}>
                                        {result.details?.status || 'Provisional'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}