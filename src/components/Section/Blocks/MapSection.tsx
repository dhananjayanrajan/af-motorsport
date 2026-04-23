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
  Gauge,
  MapPin,
  Navigation2,
  Target,
  X,
  Zap
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
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
  return mins < 60 ? `${mins} MIN` : `${Math.floor(mins / 60)}H ${mins % 60}M`
}

const MapSection: React.FC<MapSectionProps> = ({
  id,
  title,
  subtitle,
  locations = [],
  labels = {
    hqLabel: '',
    intelLabel: '',
    routeLabel: '',
    timeLabel: '',
    distLabel: '',
    recordLabel: '',
    filterLabels: {
      all: '',
      primary: '',
      satellite: '',
      pathing: ''
    }
  },
  hqCoords = { lat: 0, lng: 0 },
  zoom = 3,
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

  const [viewport, setViewport] = useState<MapViewport>({
    center: [hqCoords?.lng ?? 0, hqCoords?.lat ?? 0],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  })

  const filtered = locations.filter(l => filter === 'all' || l.type === filter)

  const handleLocClick = (loc: MapLocation) => {
    setActiveLoc(loc)
    setSidebarOpen(true)
    setViewport({ center: [loc.lng, loc.lat], zoom: 12, bearing: 0, pitch: 0 })
  }

  useEffect(() => {
    if (!activeLoc || !showRoutes || !hqCoords) {
      setRoute(null)
      return
    }
    async function fetchRoute() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${hqCoords.lng},${hqCoords.lat};${activeLoc?.lng},${activeLoc?.lat}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        if (data.routes?.length > 0) {
          setRoute({
            coordinates: data.routes[0].geometry.coordinates,
            duration: data.routes[0].duration,
            distance: data.routes[0].distance,
          })
        }
      } catch (e) { console.error("MAP_ROUTING_ERROR", e) }
    }
    fetchRoute()
  }, [activeLoc, showRoutes, hqCoords])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}
      <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(locations.length).padStart(2, '0')} />

      <div className="relative w-full h-[700px] border-b border-black-pure bg-slate-50">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light">
          <MapControls position="bottom-right" />

          {showRoutes && route && (
            <MapRoute coordinates={route.coordinates} color="#00FF41" width={3} opacity={0.6} />
          )}

          <MapMarker longitude={hqCoords?.lng ?? 0} latitude={hqCoords?.lat ?? 0}>
            <MarkerContent className="size-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-pulse scale-150 bg-primary-500/10" />
              <Navigation2 className="size-5 text-primary-500 fill-primary-500" />
            </MarkerContent>
            <MarkerLabel position="bottom" className="text-[7px] font-black px-2 py-1 mt-2 bg-black-pure text-white-pure uppercase">
              {labels?.hqLabel}
            </MarkerLabel>
          </MapMarker>

          {filtered.map((loc) => {
            const isSelected = activeLoc?.id === loc.id
            return (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat} onClick={() => handleLocClick(loc)}>
                <MarkerContent>
                  <motion.div
                    animate={{ scale: isSelected ? 1.2 : 1 }}
                    className={`size-6 rotate-45 border border-black-pure flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-500' : 'bg-white-pure'}`}
                  >
                    <Target className="-rotate-45 size-3" />
                  </motion.div>
                </MarkerContent>
                <MarkerPopup closeButton={false} className="p-0">
                  <div className="w-64 border border-black-pure bg-white-pure">
                    <div className="px-3 py-1 border-b border-black-pure bg-black-pure flex justify-between">
                      <span className="text-[8px] font-black text-white-pure uppercase tracking-widest">
                        {labels?.intelLabel}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-mono font-black uppercase italic leading-none mb-4">{loc.name}</h3>
                      <button className="w-full h-10 bg-black-pure flex items-center justify-center group">
                        <span className="text-[9px] font-black text-white-pure group-hover:text-primary-500 uppercase">
                          {labels?.recordLabel}
                        </span>
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
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute top-8 left-8 z-20">
              <div className="bg-white-pure border border-black-pure p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center gap-3 mb-6 border-b border-black-pure pb-4">
                  <Gauge className="size-4 text-primary-500" />
                  <span className="text-xs font-mono font-black uppercase italic">{labels?.routeLabel}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase opacity-40">{labels?.timeLabel}</span>
                    <span className="text-2xl font-mono font-black italic">{formatDuration(route.duration)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase opacity-40">{labels?.distLabel}</span>
                    <span className="text-2xl font-mono font-black italic">{(route.distance / 1000).toFixed(1)} KM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black-pure border-b border-black-pure">
        {[
          { id: 'all', label: labels?.filterLabels?.all, val: locations.length, icon: Activity },
          { id: 'primary', label: labels?.filterLabels?.primary, val: locations.filter(l => l.type === 'primary').length, icon: Zap },
          { id: 'satellite', label: labels?.filterLabels?.satellite, val: locations.filter(l => l.type === 'satellite').length, icon: MapPin },
          { id: 'routes', label: labels?.filterLabels?.pathing, val: showRoutes ? 'ON' : 'OFF', icon: Navigation2 }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => btn.id === 'routes' ? setShowRoutes(!showRoutes) : setFilter(btn.id as any)}
            className={`flex flex-col p-8 text-left transition-colors ${(filter === btn.id || (btn.id === 'routes' && showRoutes)) ? 'bg-primary-500' : 'bg-white-pure hover:bg-slate-50'}`}
          >
            <btn.icon className="size-4 mb-4" />
            <span className="text-[9px] font-black uppercase opacity-40 mb-1">{btn.label}</span>
            <div className="text-3xl font-mono font-black italic uppercase leading-none">{btn.val}</div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {sidebarOpen && activeLoc && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black-pure/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-xl z-[101] bg-white-pure border-l border-black-pure p-12 md:p-20 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-0.5 bg-primary-500" />
                    <h3 className="text-5xl font-mono font-black uppercase italic leading-[0.8] tracking-tighter">{activeLoc.name}</h3>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="size-10 border border-black-pure flex items-center justify-center hover:bg-black-pure hover:text-white-pure transition-all">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8 border border-black-pure bg-slate-50">
                  <p className="text-[11px] font-mono font-black text-black-pure/60 uppercase leading-relaxed">
                    {activeLoc.description || activeLoc.address}
                  </p>
                </div>
              </div>
              {ctaLabel && ctaPath && (
                <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" fullWidth />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default MapSection