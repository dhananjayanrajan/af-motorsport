'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, useMemo } from 'react'

type EventTab = 'MEETUPS' | 'TRAININGS' | 'CELEBRATIONS'

export function BehindTheScenesSection({
  meetups = DUMMY_MEETUPS,
  trainings = DUMMY_TRAININGS,
  celebrations = DUMMY_CELEBRATIONS
}: {
  meetups?: any[]
  trainings?: any[]
  celebrations?: any[]
}) {
  const [activeTab, setActiveTab] = useState<EventTab>('MEETUPS')
  const [activeId, setActiveId] = useState(meetups[0]?.id)

  const collection = useMemo(() => {
    if (activeTab === 'MEETUPS') return meetups
    if (activeTab === 'TRAININGS') return trainings
    return celebrations
  }, [activeTab, meetups, trainings, celebrations])

  const data = useMemo(() =>
    collection.find(item => item.id === activeId) || collection[0]
    , [collection, activeId])

  const switchTab = (tab: EventTab) => {
    setActiveTab(tab)
    const firstId = tab === 'MEETUPS' ? meetups[0]?.id : tab === 'TRAININGS' ? trainings[0]?.id : celebrations[0]?.id
    setActiveId(firstId)
  }

  return (
    <section className="relative w-full h-screen bg-[#050505] flex flex-col font-sans overflow-hidden border-y border-zinc-900">
      <header className="shrink-0 h-24 border-b border-zinc-900 flex items-center justify-between px-10 bg-black z-30">
        <div className="flex items-center gap-16">
          <div className="space-y-1">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Behind_The_Scenes</h2>
            <p className="text-[10px] font-bold text-zinc-600 uppercase">Operational Logs & Internal Culture</p>
          </div>

          <nav className="flex gap-10">
            {(['MEETUPS', 'TRAININGS', 'CELEBRATIONS'] as EventTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer relative py-2",
                  activeTab === tab ? "text-white" : "text-zinc-700 hover:text-zinc-500"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="active_line"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-80 md:w-[450px] border-r border-zinc-900 bg-black overflow-y-auto no-scrollbar shrink-0">
          <div className="flex flex-col">
            {collection.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "p-10 text-left border-b border-zinc-900 transition-all cursor-pointer group flex flex-col gap-4 relative",
                  activeId === item.id ? "bg-zinc-900/40" : "hover:bg-zinc-900/20"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Ref_{item.id}</span>
                  {activeId === item.id && <Zap size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
                </div>
                <h4 className={cn(
                  "text-lg font-black uppercase italic transition-colors leading-none tracking-tighter",
                  activeId === item.id ? "text-white" : "text-zinc-700 group-hover:text-zinc-500"
                )}>
                  {item.name}
                </h4>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#080808] p-12 md:p-20 lg:p-24 no-scrollbar relative">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <span className="text-[12rem] font-black italic leading-none text-white select-none">
              {activeIdxFromId(collection, activeId) + 1}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${data.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-5xl space-y-20 relative z-10"
            >
              <div className="space-y-10">
                <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
                  {data.name.replace(/_/g, ' ')}
                </h3>
                <p className="text-xl md:text-2xl font-bold text-zinc-400 uppercase italic leading-tight max-w-3xl border-l-4 pl-10" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  {data.basics?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <h5 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-4">Log_Data</h5>
                  <div className="space-y-8">
                    {activeTab === 'MEETUPS' && (
                      <>
                        <Metric label="Timeline" value={data.basics?.date} icon={<Calendar size={16} />} />
                        <Metric label="Location" value={data.basics?.location} icon={<MapPin size={16} />} />
                        <Metric label="Status" value={data.traits?.access} icon={<Zap size={16} />} />
                      </>
                    )}
                    {activeTab === 'TRAININGS' && (
                      <>
                        <Metric label="Intensity" value={data.traits?.intensity} icon={<Clock size={16} />} />
                        <Metric label="Format" value={data.traits?.format} icon={<Zap size={16} />} />
                      </>
                    )}
                    {activeTab === 'CELEBRATIONS' && (
                      <>
                        <Metric label="Prestige" value={data.details?.prestige} icon={<Trophy size={16} />} />
                        <Metric label="Audience" value={data.details?.exclusivity} icon={<Users size={16} />} />
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-12">
                  <h5 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-4">Personnel_Impact</h5>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(data.contexts?.attendees || data.contexts?.connections || data.contexts?.beneficiaries || {}).map(([key, val]: any) => (
                      <div key={key} className="flex justify-between items-center p-6 bg-zinc-900/30 border border-zinc-900">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{key}</span>
                        <span className="text-3xl font-black text-white italic">{(val?.length || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </section>
  )
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <div className="size-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
        {icon}
      </div>
      <div>
        <span className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</span>
        <span className="block text-lg font-black text-white uppercase italic leading-none">{value || '---'}</span>
      </div>
    </div>
  )
}

function activeIdxFromId(collection: any[], id: any) {
  return collection.findIndex(item => item.id === id)
}

const DUMMY_MEETUPS = [
  { id: 401, name: "ZURICH_AERO_SUMMIT", basics: { date: "2026.05.12", location: "Zurich_HQ", description: "STRATEGIC ALIGNMENT ON NEXT-GEN AERODYNAMIC INTEGRATION AND POWERTRAIN EVOLUTION." }, traits: { format: "In-Person", access: "Invite_Only" }, contexts: { attendees: { members: [1, 2, 3, 4, 5, 6], leaders: [1, 2] } } },
  { id: 402, name: "VIRTUAL_PIT_SYNC", basics: { date: "2026.06.01", location: "Digital_Hub", description: "GLOBAL COORDINATION SESSION FOR TELEMETRY ANALYSIS AND OPERATIONAL EFFICIENCY." }, traits: { format: "Virtual", access: "Team_Only" }, contexts: { attendees: { members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], leaders: [1] } } },
  { id: 403, name: "SILVERSTONE_BRIEF", basics: { date: "2026.06.18", location: "North_Circuit", description: "TECHNICAL DEBRIEF ON CHASSIS PERFORMANCE FOLLOWING WET-WEATHER TESTING SESSIONS." }, traits: { format: "In-Person", access: "Exclusive" }, contexts: { attendees: { members: [1, 2, 3, 4], leaders: [1] } } },
  { id: 404, name: "PARTNER_EXPO_26", basics: { date: "2026.07.05", location: "Munich", description: "SHOWCASING INNOVATION PATHWAYS TO TECHNICAL PARTNERS AND ALLIANCE STAKEHOLDERS." }, traits: { format: "Hybrid", access: "Invite_Only" }, contexts: { attendees: { members: [1, 2, 3], leaders: [1, 2, 3, 4, 5] } } }
]

const DUMMY_TRAININGS = [
  { id: 501, name: "G_FORCE_RETENTION", basics: { description: "EXTREME CENTRIFUGE DRILLS FOCUSED ON COGNITIVE CLARITY UNDER SUSTAINED 6G LOADS." }, traits: { intensity: "Extreme", format: "Simulated" }, contexts: { connections: { drivers: [1, 2], members: [1, 2] } } },
  { id: 502, name: "REFLEX_CALIBRATION", basics: { description: "NEURO-LINKED SIMULATOR TRAINING FOR SUB-100MS REACTION TIMES IN EMERGENCY SCENARIOS." }, traits: { intensity: "High", format: "Hands-On" }, contexts: { connections: { drivers: [1, 2, 3], members: [] } } },
  { id: 503, name: "DATA_STRESS_TEST", basics: { description: "ENGINEERING WORKSHOP ON REAL-TIME DECODING OF COMPLEX SENSOR DATA ARRAYS." }, traits: { intensity: "Medium", format: "Lecture" }, contexts: { connections: { drivers: [], members: [1, 2, 3, 4, 5] } } }
]

const DUMMY_CELEBRATIONS = [
  { id: 601, name: "MONACO_PODIUM_GALA", basics: { description: "COMMEMORATING THE HISTORIC PODIUM LOCKOUT AND CONSTRUCTOR CHAMPIONSHIP LEAD." }, details: { prestige: "Iconic", exclusivity: "Invite_Only" }, contexts: { beneficiaries: { members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], leaders: [1, 2, 3] } } },
  { id: 602, name: "FOUNDERS_HERITAGE", basics: { description: "INTERNAL RECOGNITION OF THE CORE TEAM RESPONSIBLE FOR THE INITIAL CHASSIS BREAKTHROUGH." }, details: { prestige: "Prestigious", exclusivity: "Team_Only" }, contexts: { beneficiaries: { members: [1, 2, 3, 4], leaders: [1, 2] } } },
  { id: 603, name: "INNOVATION_AWARDS", basics: { description: "CELEBRATING THE FILING OF THREE CORE PATENTS FOR ACTIVE COOLING TECHNOLOGIES." }, details: { prestige: "Notable", exclusivity: "Private" }, contexts: { beneficiaries: { members: [1, 2, 3, 4, 5], leaders: [1] } } }
]