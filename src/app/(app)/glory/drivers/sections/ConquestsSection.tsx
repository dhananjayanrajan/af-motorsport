'use client'

import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  type MapViewport,
} from '@/components/ui/map'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { Clock, Gauge, Info, Loader2, Navigation2, Route as RouteIcon, Target, Trophy, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface Circuit {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  result: string
  year: string
  details: string
  category: 'STREET' | 'PERMANENT' | 'HIGH_SPEED'
}

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

const RACING_CIRCUITS: Circuit[] = [
  {
    id: 'monaco',
    name: 'CIRCUIT DE MONACO',
    location: 'MONTE CARLO',
    lat: 43.7347,
    lng: 7.4206,
    result: 'P1',
    year: '2025',
    category: 'STREET',
    details: 'Mastered the tightest turn in racing with a 0.2s gap over P2.'
  },
  {
    id: 'silverstone',
    name: 'SILVERSTONE CIRCUIT',
    location: 'NORTHAMPTONSHIRE',
    lat: 52.0733,
    lng: -1.0146,
    result: 'P1',
    year: '2025',
    category: 'HIGH_SPEED',
    details: 'Flat out through Copse and Maggots. Highest average speed of the season.'
  },
  {
    id: 'suzuka',
    name: 'SUZUKA INTERNATIONAL',
    location: 'MIE PREFECTURE',
    lat: 34.8431,
    lng: 136.541,
    result: 'P1',
    year: '2025',
    category: 'PERMANENT',
    details: 'The figure-eight layout rewards technical balance. Pole to win conversion.'
  },
  {
    id: 'interlagos',
    name: 'AUTÓDROMO DE INTERLAGOS',
    location: 'SÃO PAULO',
    lat: -23.7036,
    lng: -46.6997,
    result: 'P3',
    year: '2024',
    category: 'PERMANENT',
    details: 'Final lap overtake in the Senna S secured the podium finish.'
  },
  {
    id: 'spa',
    name: 'CIRCUIT DE SPA',
    location: 'STAVELOT',
    lat: 50.4372,
    lng: 5.9714,
    result: 'P2',
    year: '2025',
    category: 'HIGH_SPEED',
    details: 'Overtook on the Kemmel Straight at 325 km/h during a light drizzle.'
  }
]

const HQ = { lng: 6.9583, lat: 50.9413, name: 'BASE_OPERATIONS' }

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} MIN`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}H ${remainingMins}M`;
}

function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} KM`;
}

export function ConquestsSection() {
  const [activeCircuit, setActiveCircuit] = useState<Circuit | null>(null)
  const [routes, setRoutes] = useState<RouteData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'ALL' | 'STREET' | 'PERMANENT' | 'HIGH_SPEED'>('ALL')
  const [showRoutes, setShowRoutes] = useState(true)

  const [viewport, setViewport] = useState<MapViewport>({
    center: [15.0, 40.0],
    zoom: 2.5,
    bearing: 0,
    pitch: 0,
  });

  const filteredCircuits = RACING_CIRCUITS.filter(c => filter === 'ALL' || c.category === filter)

  useEffect(() => {
    if (!activeCircuit || !showRoutes) {
      setRoutes([])
      return
    }

    async function fetchConquestPath() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${HQ.lng},${HQ.lat};${activeCircuit?.lng},${activeCircuit?.lat}?overview=full&geometries=geojson&alternatives=false`
        )
        const resData = await response.json()
        if (resData.routes?.length > 0) {
          const routeData: RouteData[] = resData.routes.map((route: any) => ({
            coordinates: route.geometry.coordinates,
            duration: route.duration,
            distance: route.distance,
          }))
          setRoutes(routeData)
        }
      } catch (error) {
        console.error("TELEMETRY_LINK_ERROR", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConquestPath()
  }, [activeCircuit, showRoutes])

  return (
    <section className="relative w-full bg-black py-16 px-4 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-8 gap-6">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="flex items-center gap-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                className="h-[1px]"
              />
              <span className={cn("text-[8px] md:text-[10px] font-black italic text-zinc-500 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Tactical Overview</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-[0.8]"
            >
              CONQUEST<br />
              <motion.span
                initial={{ color: "#fff" }}
                whileInView={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                PATHS
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-zinc-950 border border-white/5 p-6 flex items-center gap-10"
          >
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-600 uppercase mb-2">System_State</span>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live_Feed
              </span>
            </div>
            <div className="flex flex-col border-l border-zinc-800 pl-10">
              <span className="text-[8px] font-mono text-zinc-600 uppercase mb-1">Data_Points</span>
              <span className="text-3xl font-black text-white italic leading-none">{filteredCircuits.length}</span>
            </div>
          </motion.div>
        </div>

        <div className="relative w-full h-[500px] md:h-[650px] bg-zinc-950 border border-white/10 rounded-sm overflow-hidden group md:mb-6 shadow-[0_0_50px_rgba(0,0,0,1)]">
          <Map
            viewport={viewport}
            onViewportChange={setViewport}
            theme="dark"
          >
            <MapControls
              position="bottom-right"
              showZoom
              showCompass
              showLocate
              showFullscreen
            />

            <AnimatePresence>
              {showRoutes && routes.map((route, idx) => (
                <MapRoute
                  key={`route-${idx}`}
                  coordinates={route.coordinates}
                  color={DESIGN_SYSTEM.COLORS.PRIMARY}
                  width={3}
                  opacity={0.6}
                />
              ))}
            </AnimatePresence>

            <MapMarker longitude={HQ.lng} latitude={HQ.lat}>
              <MarkerContent className="size-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full animate-pulse scale-150"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY_GLOW, opacity: 0.2 }}
                />
                <Navigation2
                  className="size-5"
                  style={{
                    color: DESIGN_SYSTEM.COLORS.PRIMARY,
                    fill: DESIGN_SYSTEM.COLORS.PRIMARY,
                    filter: `drop-shadow(0 0 8px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW})`
                  }}
                />
              </MarkerContent>
              <MarkerLabel
                position="bottom"
                className="text-[7px] font-black text-white px-2 py-1 mt-2 tracking-tighter bg-red-600"
              >
                BASE_STATION
              </MarkerLabel>
            </MapMarker>

            {filteredCircuits.map((circuit) => (
              <MapMarker
                key={circuit.id}
                longitude={circuit.lng}
                latitude={circuit.lat}
                onClick={() => setActiveCircuit(circuit)}
              >
                <MarkerContent className="cursor-pointer">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: activeCircuit?.id === circuit.id ? 1.3 : 1,
                      borderColor: activeCircuit?.id === circuit.id ? "#ffffff" : DESIGN_SYSTEM.COLORS.PRIMARY,
                      backgroundColor: activeCircuit?.id === circuit.id ? DESIGN_SYSTEM.COLORS.PRIMARY : "#000000"
                    }}
                    whileHover={{ scale: 1.2 }}
                    className={cn(
                      "size-7 rounded-none rotate-45 border-2 flex items-center justify-center transition-all duration-300 relative",
                      activeCircuit?.id === circuit.id && "z-50"
                    )}
                  >
                    {activeCircuit?.id !== circuit.id && (
                      <span
                        className="absolute inset-0 border animate-[ping_2s_infinite] scale-150 rounded-none"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY, opacity: 0.3 }}
                      />
                    )}
                    <Trophy
                      className="-rotate-45 size-3.5"
                      style={{ color: activeCircuit?.id === circuit.id ? '#ffffff' : DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                  </motion.div>
                </MarkerContent>

                <MarkerPopup closeButton={false} className="p-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-[300px] bg-black border-2 border-white/10 p-0 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
                  >
                    <div className="bg-zinc-900 px-4 py-2 flex justify-between items-center border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[8px] font-black text-white tracking-widest uppercase">CONQUEST_INTEL</span>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-500">REF_{circuit.id.toUpperCase()}</span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="max-w-[70%]">
                          <h3 className="text-xl font-black italic text-white uppercase tracking-tighter leading-none">{circuit.name}</h3>
                          <span className="text-[8px] font-bold text-zinc-500 uppercase mt-1.5 block tracking-widest">{circuit.location}</span>
                        </div>
                        <div
                          className="text-4xl font-black italic leading-none"
                          style={{
                            color: DESIGN_SYSTEM.COLORS.PRIMARY,
                            filter: `drop-shadow(0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW})`
                          }}
                        >
                          {circuit.result}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="bg-zinc-900/50 p-2.5 border border-white/5">
                          <span className="text-[6px] text-zinc-600 block mb-1 uppercase font-black tracking-[0.2em]">Deployment</span>
                          <span className="text-[10px] text-white font-black">{circuit.year}</span>
                        </div>
                        <div className="bg-zinc-900/50 p-2.5 border border-white/5">
                          <span className="text-[6px] text-zinc-600 block mb-1 uppercase font-black tracking-[0.2em]">Environment</span>
                          <span className="text-[10px] text-white font-black">{circuit.category}</span>
                        </div>
                      </div>

                      <p
                        className="text-[10px] font-bold text-zinc-300 uppercase leading-relaxed italic border-l-2 pl-4 py-1"
                        style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                      >
                        {circuit.details}
                      </p>
                    </div>
                  </motion.div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>

          <AnimatePresence>
            {showRoutes && routes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute top-4 left-4 z-20 flex flex-col gap-2"
              >
                <div
                  className="bg-black/80 backdrop-blur-md border p-4 space-y-4 min-w-[200px]"
                  style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <Gauge className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[10px] font-black text-white italic tracking-widest uppercase">Live Telemetry</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="size-3 text-zinc-500" />
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Est. Time</span>
                      </div>
                      <span className="text-xs font-black text-white italic">{formatDuration(routes[0].duration)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <RouteIcon className="size-3 text-zinc-500" />
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Distance</span>
                      </div>
                      <span className="text-xs font-black text-white italic">{formatDistance(routes[0].distance)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <Zap className="size-3 text-zinc-500" />
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Status</span>
                      </div>
                      <span className="text-[9px] font-black italic animate-pulse" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>OPTIMIZED</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-950/80 backdrop-blur border border-white/10 p-3 space-y-1 font-mono text-[9px] min-w-[200px]">
                  <div className="flex justify-between text-zinc-500">
                    <span>LNG: {viewport.center[0].toFixed(3)}</span>
                    <span>LAT: {viewport.center[1].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>ZOOM: {viewport.zoom.toFixed(1)}</span>
                    <span>PITCH: {viewport.pitch.toFixed(1)}°</span>
                  </div>
                  <div className="text-zinc-500">BEARING: {viewport.bearing.toFixed(1)}°</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <Loader2 className="size-10 animate-spin" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <span className="text-[9px] font-black text-white italic tracking-[0.5em] animate-pulse">Establishing_Link...</span>
              </motion.div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4">
          {[
            { id: 'ALL', label: 'ALL_CONQUESTS', value: RACING_CIRCUITS.length, icon: Target },
            { id: 'STREET', label: 'STREET_CIRCUITS', value: RACING_CIRCUITS.filter(c => c.category === 'STREET').length, icon: Info },
            { id: 'HIGH_SPEED', label: 'POWER_TRACKS', value: RACING_CIRCUITS.filter(c => c.category === 'HIGH_SPEED').length, icon: Zap },
            { id: 'ROUTES', label: 'TOGGLE_PATH_LINK', value: showRoutes ? 'ON' : 'OFF', icon: Navigation2 }
          ].map((stat, i) => (
            <motion.button
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), ease: "circOut" }}
              onClick={() => {
                if (stat.id === 'ROUTES') setShowRoutes(!showRoutes)
                else setFilter(stat.id as any)
              }}
              className={cn(
                "flex flex-col p-8 border-t-2 transition-all duration-500 text-left group relative overflow-hidden",
                (filter === stat.id || (stat.id === 'ROUTES' && showRoutes))
                  ? 'bg-zinc-950'
                  : 'border-zinc-900 hover:border-zinc-700 bg-black'
              )}
              style={{
                borderTopColor: (filter === stat.id || (stat.id === 'ROUTES' && showRoutes)) ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined
              }}
            >
              <div className="flex items-center justify-between mb-6 relative z-10">
                <stat.icon
                  className="size-4 transition-colors duration-500"
                  style={{
                    color: (filter === stat.id || (stat.id === 'ROUTES' && showRoutes)) ? DESIGN_SYSTEM.COLORS.PRIMARY : '#3f3f46'
                  }}
                />
                <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Module_0{i + 1}</span>
              </div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-white transition-colors relative z-10">
                {stat.label}
              </span>
              <div className={cn(
                "text-4xl font-black italic tracking-tighter transition-colors duration-500 relative z-10",
                (filter === stat.id || (stat.id === 'ROUTES' && showRoutes)) ? 'text-white' : 'text-zinc-800'
              )}>
                {stat.value}
              </div>
              {(filter === stat.id || (stat.id === 'ROUTES' && showRoutes)) && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY_GLOW, opacity: 0.05 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}