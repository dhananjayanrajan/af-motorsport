'use client'

import { cn } from '@/utilities/cn'
import { Activity, Layers, Play, Settings2, Target } from 'lucide-react'
import { useState } from 'react'
import type { Event, Session } from 'src/payload-types'

interface Stint {
  compound: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTER' | 'WET'
  startLap: number
  endLap: number
  id: string
}

interface WarEntry {
  id: string
  name: string
  carNumber: string
  stints: Stint[]
  currentLap: number
}

const DUMMY_DATA: WarEntry[] = [
  {
    id: 'e1',
    name: "VOSS_UNIT_01",
    carNumber: "44",
    currentLap: 52,
    stints: [
      { id: 's1', compound: 'MEDIUM', startLap: 1, endLap: 18 },
      { id: 's2', compound: 'HARD', startLap: 18, endLap: 40 },
      { id: 's3', compound: 'SOFT', startLap: 40, endLap: 52 },
    ]
  },
  {
    id: 'e2',
    name: "KANE_TACTICAL",
    carNumber: "07",
    currentLap: 52,
    stints: [
      { id: 's4', compound: 'SOFT', startLap: 1, endLap: 12 },
      { id: 's5', compound: 'MEDIUM', startLap: 12, endLap: 35 },
      { id: 's6', compound: 'MEDIUM', startLap: 35, endLap: 52 },
    ]
  }
]

const COMPOUND_COLORS = {
  SOFT: 'bg-red-600',
  MEDIUM: 'bg-yellow-500',
  HARD: 'bg-zinc-100',
  INTER: 'bg-green-500',
  WET: 'bg-blue-600'
}

const diamondClip = 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'

export function StrategyWarSection({
  event,
  session,
  data = DUMMY_DATA
}: {
  event?: Event,
  session?: Session,
  data?: WarEntry[]
}) {
  const [selectedStint, setSelectedStint] = useState<Stint | null>(null)
  const [hoveredLap, setHoveredLap] = useState<number | null>(null)

  const totalLaps = 52
  const lapWidth = 32

  return (
    <section className="relative w-full bg-black py-12 border-y border-zinc-900 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6">

        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
              STRATEGY_MAP
            </h2>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <div className="flex gap-4">
              {Object.keys(COMPOUND_COLORS).map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <div className={cn("size-2", COMPOUND_COLORS[c as keyof typeof COMPOUND_COLORS])} style={{ clipPath: diamondClip }} />
                  <span className="text-[9px] font-black text-zinc-500 uppercase">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-3 bg-zinc-900 border border-zinc-800 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all">
              <Play className="size-4 fill-current" />
            </button>
            <button className="p-3 bg-zinc-900 border border-zinc-800 text-white hover:bg-white hover:text-black transition-all">
              <Settings2 className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative border border-zinc-900 bg-zinc-950 overflow-hidden">
          <div className="flex border-b border-zinc-900 bg-black">
            <div className="w-64 flex-shrink-0 border-r border-zinc-800 p-4">
              <span className="text-[10px] font-black text-zinc-600 uppercase">Entry_List</span>
            </div>
            <div className="flex-1 overflow-x-auto scrollbar-hide flex relative">
              {[...Array(totalLaps)].map((_, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredLap(i + 1)}
                  className={cn(
                    "flex-shrink-0 border-r border-zinc-900/30 flex flex-col justify-end pb-2 transition-colors",
                    hoveredLap === i + 1 ? "bg-[#00FF41]/5" : ""
                  )}
                  style={{ width: `${lapWidth}px` }}
                >
                  <span className={cn(
                    "text-[8px] font-mono pl-1 transition-colors",
                    hoveredLap === i + 1 ? "text-[#00FF41]" : "text-zinc-700"
                  )}>
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {data.map((item) => (
              <div key={item.id} className="flex border-b border-zinc-900 group">
                <div className="w-64 flex-shrink-0 border-r border-zinc-800 p-4 bg-black group-hover:bg-zinc-900 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black italic text-white tracking-tighter">
                      #{item.carNumber} {item.name}
                    </span>
                    <Target className="size-3 text-zinc-800 group-hover:text-[#00FF41]" />
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto scrollbar-hide py-8 relative bg-black/20">
                  <div className="flex items-center h-10 relative" style={{ width: `${totalLaps * lapWidth}px` }}>
                    {item.stints.map((stint) => (
                      <button
                        key={stint.id}
                        onClick={() => setSelectedStint(stint)}
                        className={cn(
                          "absolute h-8 transition-all duration-200 hover:scale-y-110 z-10",
                          COMPOUND_COLORS[stint.compound],
                          selectedStint?.id === stint.id ? "ring-2 ring-[#00FF41] ring-offset-2 ring-offset-black" : ""
                        )}
                        style={{
                          left: `${(stint.startLap - 1) * lapWidth}px`,
                          width: `${(stint.endLap - stint.startLap + 1) * lapWidth - 2}px`,
                          clipPath: diamondClip
                        }}
                      />
                    ))}

                    {[...Array(totalLaps)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "absolute h-full w-[1px] transition-colors",
                          hoveredLap === i + 1 ? "bg-[#00FF41]/40 z-20" : "bg-zinc-900"
                        )}
                        style={{ left: `${i * lapWidth}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#00FF41]">
              <Layers className="size-4" />
              <span className="text-[10px] font-black uppercase">Stint_Details</span>
            </div>
            {selectedStint ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black italic text-white uppercase">{selectedStint.compound}</span>
                  <span className="text-zinc-500 font-mono text-sm">LAP {selectedStint.startLap} — {selectedStint.endLap}</span>
                </div>
                <div className="h-1 bg-zinc-900 w-full">
                  <div
                    className={cn("h-full", COMPOUND_COLORS[selectedStint.compound])}
                    style={{ width: `${((selectedStint.endLap - selectedStint.startLap + 1) / totalLaps) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-zinc-700 text-[10px] uppercase font-bold italic">Select a stint to analyze life-cycle</span>
            )}
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <Activity className="size-4" />
              <span className="text-[10px] font-black uppercase">Lap_Focus</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-5xl font-black italic text-white">
                {hoveredLap ? hoveredLap.toString().padStart(2, '0') : '--'}
              </span>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Relative_Track_Position</span>
                <span className="text-xs font-black text-[#00FF41] uppercase italic">Sector_Analysis_Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 border border-zinc-900 bg-zinc-950 group cursor-pointer hover:bg-[#00FF41] transition-colors">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">
              EXECUTE_SIMULATION
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}