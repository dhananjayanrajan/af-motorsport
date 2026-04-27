// MapSection.tsx
"use client"
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  type MapViewport
} from '@/components/ui/map'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Crosshair,
  Loader2,
  MapPin,
  Navigation2,
  Terminal,
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
  slug?: string
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
      console.error(e)
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
      <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(locations.length).padStart(2, '0')} />

      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] border-b-2 border-black-pure bg-[#f0f0f0]">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light">
          <MapControls position="bottom-right" showZoom showCompass showLocate showFullscreen />

          <AnimatePresence>
            {showRoutes && route && (
              <MapRoute coordinates={route.coordinates} color="#000000" width={3} opacity={0.6} />
            )}
          </AnimatePresence>

          <MapMarker longitude={hqCoords.lng} latitude={hqCoords.lat}>
            <MarkerContent className="size-8 sm:size-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-500 border-2 border-black-pure rotate-45" />
              <Navigation2 className="size-4 sm:size-5 text-black-pure relative z-10 fill-black-pure" />
            </MarkerContent>
            <MarkerLabel position="bottom" className="text-[8px] sm:text-[9px] font-mono font-black px-2 py-1 mt-3 bg-black-pure text-white-pure uppercase tracking-tighter">
              {labels.hqLabel}
            </MarkerLabel>
          </MapMarker>

          {filtered.map((loc) => {
            const isSelected = activeLoc?.id === loc.id
            return (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat} onClick={() => { setActiveLoc(loc); setSidebarOpen(true); }}>
                <MarkerContent className="cursor-pointer">
                  <div className={`relative flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125' : 'hover:scale-110'}`}>
                    <div className={`size-5 sm:size-6 border-2 border-black-pure rotate-45 transition-colors ${isSelected ? 'bg-black-pure' : 'bg-white-pure'}`} />
                    <div className={`absolute size-1 sm:size-1.5 rounded-full ${isSelected ? 'bg-primary-500' : 'bg-black-pure'}`} />
                  </div>
                </MarkerContent>
              </MapMarker>
            )
          })}
        </Map>

        <AnimatePresence>
          {showRoutes && route && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 z-20">
              <div className="bg-black-pure text-white-pure px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-4 sm:gap-8 border-2 border-black-pure">
                <div className="flex flex-col">
                  <span className="text-[7px] sm:text-[8px] font-mono text-white-pure/40 uppercase">Total Distance</span>
                  <span className="text-xs sm:text-sm font-black italic">{(route.distance / 1000).toFixed(1)} KM</span>
                </div>
                <div className="w-px h-6 bg-white-pure/10" />
                <div className="flex flex-col">
                  <span className="text-[7px] sm:text-[8px] font-mono text-white-pure/40 uppercase">Estimated Time</span>
                  <span className="text-xs sm:text-sm font-black italic">{formatDuration(route.duration)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white-pure/40 backdrop-blur-[2px] z-[60]">
            <Loader2 className="size-6 sm:size-8 animate-spin text-black-pure" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-black-pure divide-x-2 divide-black-pure">
        {[
          { id: 'all', label: labels.filterLabels.all, icon: Activity },
          { id: 'primary', label: labels.filterLabels.primary, icon: Zap },
          { id: 'satellite', label: labels.filterLabels.satellite, icon: MapPin },
          { id: 'routes', label: 'Route Display', icon: Navigation2 }
        ].map((btn) => {
          const isActive = btn.id === 'routes' ? showRoutes : filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => btn.id === 'routes' ? setShowRoutes(!showRoutes) : setFilter(btn.id as any)}
              className={`flex items-center gap-3 sm:gap-4 px-4 py-4 sm:px-8 sm:py-6 transition-all ${isActive ? 'bg-black-pure text-white-pure' : 'bg-white-pure hover:bg-neutral-50'}`}
            >
              <btn.icon className="size-3.5 sm:size-4 shrink-0" />
              <span className="text-[9px] sm:text-[11px] font-mono font-black uppercase tracking-widest truncate">{btn.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {sidebarOpen && activeLoc && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black-pure/20 backdrop-blur-[2px]" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl z-[999] bg-white-pure border-l-2 border-black-pure flex flex-col"
            >
              <div className="p-5 sm:p-6 border-b border-black-pure/10 flex justify-between items-center bg-neutral-50 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="size-3.5 text-black-pure shrink-0" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-black text-black-pure uppercase tracking-widest truncate">Detailed Overview</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="hover:rotate-90 transition-transform duration-300 p-1">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-10 no-scrollbar">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-1.5 py-0.5 bg-primary-500 border border-black-pure">
                    <span className="text-[7px] sm:text-[8px] font-mono font-black uppercase text-black-pure">Ref: {activeLoc.id}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.95] text-black-pure break-words">
                    {activeLoc.name}
                  </h3>
                </div>

                <div className="relative p-4 sm:p-6 border border-black-pure/10 bg-neutral-50/50">
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-black-pure" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-black-pure" />
                  <span className="text-[7px] sm:text-[8px] font-mono font-black text-neutral-400 uppercase tracking-widest block mb-3">Location Summary</span>
                  <p className="text-[11px] sm:text-xs md:text-sm font-bold text-black-pure/80 leading-snug uppercase break-words">
                    {activeLoc.description || activeLoc.address}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[7px] sm:text-[8px] font-mono font-black text-neutral-400 uppercase tracking-widest block">Geographic Data</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-0.5 border-l border-black-pure pl-3">
                      <span className="text-[7px] font-mono font-black text-neutral-400 uppercase">Latitude</span>
                      <span className="text-xs sm:text-sm font-mono font-bold">{activeLoc.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-l border-black-pure pl-3">
                      <span className="text-[7px] font-mono font-black text-neutral-400 uppercase">Longitude</span>
                      <span className="text-xs sm:text-sm font-mono font-bold">{activeLoc.lng.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={activeLoc.slug ? (activeLoc.slug.startsWith('/') ? activeLoc.slug : `/${activeLoc.slug}`) : `/${activeLoc.id}`}
                className="group relative h-16 sm:h-20 bg-black-pure text-white-pure flex items-center justify-between px-6 sm:px-8 overflow-hidden transition-colors hover:bg-primary-500 shrink-0"
              >
                <div className="flex flex-col relative z-10 truncate pr-4">
                  <span className="text-[7px] sm:text-[8px] font-mono font-black uppercase group-hover:text-black-pure transition-colors">Information Portal</span>
                  <span className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tighter group-hover:text-black-pure transition-colors truncate">Open Location Profile</span>
                </div>
                <div className="size-8 sm:size-10 border border-white-pure shrink-0 flex items-center justify-center group-hover:border-black-pure transition-colors">
                  <ArrowRight className="size-4 sm:size-5 group-hover:text-black-pure transition-transform group-hover:translate-x-1" />
                </div>
                <Crosshair className="absolute -bottom-4 -right-4 size-16 sm:size-20 opacity-5 text-white-pure group-hover:text-black-pure transition-colors" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MapSection