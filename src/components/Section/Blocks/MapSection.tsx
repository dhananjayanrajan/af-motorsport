"use client"
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
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Clock,
  Gauge,
  Loader2,
  MapPin,
  Navigation2,
  Route as RouteIcon,
  Target,
  X,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SectionHeader from '../Components/SectionHeader'

export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
  address?: string
  type?: 'primary' | 'satellite' | 'logistics'
}

interface RouteData {
  coordinates: [number, number][]
  duration: number
  distance: number
}

interface MapLabels {
  hqLabel: string
  intelLabel: string
  routeLabel: string
  timeLabel: string
  distLabel: string
  recordLabel: string
  filterLabels: {
    all: string
    primary: string
    satellite: string
    pathing: string
  }
}

interface MapSectionProps {
  id: string
  title: string
  subtitle: string
  locations: MapLocation[]
  labels: MapLabels
  hqCoords?: { lat: number, lng: number }
  zoom?: number
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  ctaLabel?: string
  ctaPath?: string
  background?: React.ReactNode
}

const formatDuration = (s: number) => {
  const mins = Math.round(s / 60)
  if (mins < 60) return `${mins} MIN`
  return `${Math.floor(mins / 60)}H ${mins % 60}M`
}

const MapSection: React.FC<MapSectionProps> = ({
  id,
  title,
  subtitle,
  locations = [],
  labels,
  hqCoords = { lat: 0, lng: 0 },
  zoom = 2.5,
  headerVariant = 1,
  footerVariant = 1,
  ctaLabel,
  ctaPath,
  background
}) => {
  const [activeLoc, setActiveLoc] = useState<MapLocation | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [route, setRoute] = useState<RouteData | null>(null)
  const [filter, setFilter] = useState<'all' | 'primary' | 'satellite'>('all')
  const [showRoutes, setShowRoutes] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [viewport, setViewport] = useState<MapViewport>({
    center: [hqCoords.lng, hqCoords.lat],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  })

  const filtered = useMemo(() =>
    locations.filter(l => filter === 'all' || l.type === filter),
    [locations, filter])

  const fetchRoute = useCallback(async (loc: MapLocation) => {
    if (!showRoutes) return
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${hqCoords.lng},${hqCoords.lat};${loc.lng},${loc.lat}?overview=full&geometries=geojson`
      )
      const data = await response.json()
      if (data.routes?.[0]) {
        setRoute({
          coordinates: data.routes[0].geometry.coordinates,
          duration: data.routes[0].duration,
          distance: data.routes[0].distance,
        })
      }
    } catch (e) {
      console.error("OSRM_FETCH_ERROR", e)
    } finally {
      setIsLoading(false)
    }
  }, [hqCoords.lng, hqCoords.lat, showRoutes])

  useEffect(() => {
    if (activeLoc) {
      fetchRoute(activeLoc)
    } else {
      setRoute(null)
    }
  }, [activeLoc, fetchRoute])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}
      <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(locations.length).padStart(2, '0')} />

      <div className="relative w-full h-[600px] md:h-[700px] border-b-2 border-black-pure bg-[#f0f0f0]">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light">
          <MapControls position="bottom-right" showZoom showCompass showLocate showFullscreen />

          <AnimatePresence>
            {showRoutes && route && (
              <MapRoute coordinates={route.coordinates} color="#00FF41" width={4} opacity={0.8} />
            )}
          </AnimatePresence>

          <MapMarker longitude={hqCoords.lng} latitude={hqCoords.lat}>
            <MarkerContent className="size-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary border-2 border-black-pure" />
              <Navigation2 className="size-5 text-black-pure relative z-10 fill-black-pure" />
            </MarkerContent>
            <MarkerLabel position="bottom" className="text-[8px] font-mono font-black px-2 py-1 mt-2 bg-black-pure text-white-pure uppercase">
              {labels.hqLabel}
            </MarkerLabel>
          </MapMarker>

          {filtered.map((loc) => {
            const isSelected = activeLoc?.id === loc.id
            return (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat} onClick={() => setActiveLoc(loc)}>
                <MarkerContent className="cursor-pointer">
                  <motion.div
                    animate={{ scale: isSelected ? 1.25 : 1 }}
                    className={`size-8 border-2 border-black-pure flex items-center justify-center transition-colors ${isSelected ? 'bg-primary z-50' : 'bg-white-pure shadow-[4px_4px_0px_0px_#000000]'}`}
                  >
                    <Target className="size-4 text-black-pure" />
                  </motion.div>
                </MarkerContent>
                <MarkerPopup closeButton={false} className="p-0 border-none shadow-none">
                  <div className="w-64 border-2 border-black-pure bg-white-pure p-0 shadow-[8px_8px_0px_0px_#000000]">
                    <div className="px-3 py-2 border-b-2 border-black-pure bg-black-pure flex justify-between items-center">
                      <span className="text-[8px] font-mono font-black text-white-pure uppercase tracking-widest">{labels.intelLabel}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-mono font-black uppercase mb-4 leading-tight">{loc.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLoc(loc);
                          setSidebarOpen(true);
                        }}
                        className="w-full py-3 bg-primary border-2 border-black-pure flex items-center justify-center gap-2 hover:bg-black-pure group transition-colors"
                      >
                        <span className="text-[10px] font-mono font-black text-black-pure group-hover:text-primary uppercase">{labels.recordLabel}</span>
                        <ArrowRight className="size-3 text-black-pure group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            )
          })}
        </Map>

        <AnimatePresence>
          {showRoutes && route && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute top-6 left-6 z-20 pointer-events-none">
              <div className="bg-white-pure border-2 border-black-pure p-5 shadow-[8px_8px_0px_0px_#00FF41]">
                <div className="flex items-center gap-3 mb-5 border-b-2 border-black-pure pb-2">
                  <Gauge className="size-4 text-black-pure" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest">{labels.routeLabel}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3 text-neutral-400" />
                      <span className="text-[8px] font-mono font-black text-neutral-400 uppercase">{labels.timeLabel}</span>
                    </div>
                    <span className="text-lg font-mono font-black tabular-nums">{formatDuration(route.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <RouteIcon className="size-3 text-neutral-400" />
                      <span className="text-[8px] font-mono font-black text-neutral-400 uppercase">{labels.distLabel}</span>
                    </div>
                    <span className="text-lg font-mono font-black tabular-nums">{(route.distance / 1000).toFixed(1)} KM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white-pure/60 backdrop-blur-[4px] z-[60]">
            <div className="bg-white-pure border-2 border-black-pure p-6 flex items-center gap-4 shadow-[6px_6px_0px_0px_#000000]">
              <Loader2 className="size-6 animate-spin text-primary" />
              <span className="text-xs font-mono font-black uppercase tracking-widest">Accessing Details</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-black-pure border-b-2 border-black-pure">
        {[
          { id: 'all', label: labels.filterLabels.all, val: locations.length, icon: Activity },
          { id: 'primary', label: labels.filterLabels.primary, val: locations.filter(l => l.type === 'primary').length, icon: Zap },
          { id: 'satellite', label: labels.filterLabels.satellite, val: locations.filter(l => l.type === 'satellite').length, icon: MapPin },
          { id: 'routes', label: labels.filterLabels.pathing, val: showRoutes ? 'ON' : 'OFF', icon: Navigation2 }
        ].map((btn) => {
          const isActive = btn.id === 'routes' ? showRoutes : filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => btn.id === 'routes' ? setShowRoutes(!showRoutes) : setFilter(btn.id as any)}
              className={`flex flex-col p-8 text-left transition-all group ${isActive ? 'bg-primary' : 'bg-white-pure hover:bg-neutral-50'}`}
            >
              <btn.icon className={`size-5 mb-6 ${isActive ? 'text-black-pure' : 'text-neutral-300 group-hover:text-black-pure'}`} />
              <span className="text-[9px] font-mono font-black uppercase text-neutral-500 mb-1">{btn.label}</span>
              <div className="text-4xl font-mono font-black uppercase leading-none tabular-nums tracking-tighter">{btn.val}</div>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {sidebarOpen && activeLoc && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black-pure/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full max-w-md z-[999] bg-white-pure border-l-2 border-black-pure p-10 md:p-14 flex flex-col shadow-[-10px_0px_30px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-3">
                  <div className="w-16 h-1.5 bg-primary border border-black-pure" />
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono font-black uppercase tracking-tighter leading-[0.9]">{activeLoc.name}</h3>
                  <div className="text-[10px] font-mono font-black text-neutral-400 uppercase bg-neutral-100 self-start px-2 py-0.5 border border-black-pure/10">ID: {activeLoc.id}</div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="size-12 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary transition-colors shadow-[4px_4px_0px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow space-y-10">
                <div className="p-8 border-2 border-black-pure bg-neutral-50 relative shadow-[8px_8px_0px_0px_#000000]">
                  <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.2em] block mb-4">Briefing</span>
                  <p className="text-xl font-mono font-black text-black-pure uppercase leading-tight tracking-tight">
                    {activeLoc.description || activeLoc.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 border-2 border-black-pure bg-white flex justify-between items-center">
                    <span className="text-[9px] font-mono font-black uppercase text-neutral-400">Lattitude</span>
                    <span className="text-lg font-mono font-black italic">{activeLoc.lat.toFixed(6)}</span>
                  </div>
                  <div className="p-5 border-2 border-black-pure bg-white flex justify-between items-center">
                    <span className="text-[9px] font-mono font-black uppercase text-neutral-400">Longitude</span>
                    <span className="text-lg font-mono font-black italic">{activeLoc.lng.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                {ctaLabel && ctaPath && (
                  <Link href={ctaPath} className="block group">
                    <div className="w-full bg-primary border-2 border-black-pure p-6 flex items-center justify-between shadow-[8px_8px_0px_0px_#000000] group-hover:bg-black-pure transition-colors active:shadow-none active:translate-x-1 active:translate-y-1">
                      <span className="text-2xl font-mono font-black uppercase group-hover:text-primary transition-colors">{ctaLabel}</span>
                      <ArrowRight className="size-6 text-black-pure group-hover:text-primary group-hover:translate-x-2 transition-all" />
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MapSection