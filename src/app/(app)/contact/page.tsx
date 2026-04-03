'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  type MapViewport,
} from '@/components/ui/map'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { motion } from 'motion/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type ContactFormData = {
  name: string
  email: string
  subject: string
  phone: string
  message: string
}

const GLOBAL_GARAGES = [
  {
    id: 'ny_deploy',
    city: 'New York',
    coord: [-74.0060, 40.7128] as [number, number],
    label: 'NODE_NY',
    details: 'US Deployment Hub',
    viewport: { center: [-74.0060, 40.7128], zoom: 12, bearing: 0, pitch: 0 } as MapViewport
  },
  {
    id: 'portugal_deploy',
    city: 'Portugal',
    coord: [-8.2245, 39.3999] as [number, number],
    label: 'NODE_EU',
    details: 'European R&D Node',
    viewport: { center: [-8.2245, 39.3999], zoom: 11, bearing: 0, pitch: 0 } as MapViewport
  }
]

export default function ContactUsSection() {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset
  } = useForm<ContactFormData>()

  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error("SUBMISSION_ERROR", error)
    }
  }, [reset])

  return (
    <section className="relative w-full bg-black py-16 px-4 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-12 gap-6">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[8px] md:text-[10px] font-black italic text-zinc-500 uppercase tracking-[0.4em]">Direct Uplink</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.8]"
            >
              SECURE<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>CHANNEL</span>
            </motion.h2>
          </div>

          <div className="hidden md:flex flex-col text-right">
            <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-2">Technical Inquiry</span>
            <span className="text-[8px] font-mono text-zinc-600 uppercase">Response_Protocol_Active</span>
          </div>
        </div>

        {/* Main Grid: Form & Contact Info */}
        <div className="relative w-full bg-zinc-950 border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 mb-12">
          <div className="lg:col-span-7 bg-black p-8 md:p-12 lg:p-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormItem className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic px-2">Operator Name</label>
                  <ClippedInput
                    placeholder="NAME"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <FormError message={errors.name.message} className="text-[8px] uppercase font-bold mt-2 text-primary" />}
                </FormItem>

                <FormItem className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic px-2">Return Email</label>
                  <ClippedInput
                    type="email"
                    placeholder="EMAIL"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <FormError message={errors.email.message} className="text-[8px] uppercase font-bold mt-2 text-primary" />}
                </FormItem>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormItem className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic px-2">Subject</label>
                  <ClippedInput
                    placeholder="INQUIRY"
                    {...register('subject')}
                  />
                </FormItem>

                <FormItem className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic px-2">Phone</label>
                  <ClippedInput
                    placeholder="+91 [REDACTED]"
                    {...register('phone')}
                  />
                </FormItem>
              </div>

              <FormItem className="space-y-3">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic px-2">Message Body</label>
                <textarea
                  {...register('message', { required: 'Please enter a message' })}
                  rows={6}
                  placeholder="START TYPING..."
                  className="w-full bg-zinc-950 border border-zinc-900 p-6 text-white font-bold text-[10px] uppercase italic focus:outline-none focus:border-primary transition-colors resize-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
                />
                {errors.message && <FormError message={errors.message.message} className="text-[8px] uppercase font-bold mt-2 text-primary" />}
              </FormItem>

              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="group relative flex items-center gap-6 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="size-14 bg-white text-black flex items-center justify-center group-hover:bg-primary transition-colors" style={{ backgroundColor: isSuccess ? DESIGN_SYSTEM.COLORS.PRIMARY : '#FFFFFF' }}>
                  {isLoading ? <Zap className="animate-spin" size={18} /> : isSuccess ? <ShieldCheck size={18} /> : <Send size={18} />}
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white">
                    {isLoading ? 'TRANSMITTING...' : isSuccess ? 'DATA RECEIVED' : 'SEND MESSAGE'}
                  </span>
                  <span className="block text-[8px] font-bold text-zinc-600 uppercase">
                    {isSuccess ? 'Response protocol active' : 'End-to-end encrypted'}
                  </span>
                </div>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-[#080808] p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div className="space-y-12">
              <ContactDetail icon={<Mail size={16} />} label="EMAIL" value="GENERAL@AFMOTORSPORT.COM" sub="Official Inquiry" />
              <ContactDetail icon={<Phone size={16} />} label="PHONE" value="[TEMPORARILY HIDDEN]" sub="Mon - Fri, 9am - 6pm" />
            </div>

            <div className="space-y-8 mt-16 pb-12">
              <h5 className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em] border-b border-zinc-900 pb-4 italic">Personnel_Nodes</h5>
              <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                <SocialLink label="INSTAGRAM" value="@af_motorsport" />
                <SocialLink label="LINKEDIN" value="/company/afms" />
                <SocialLink label="X" value="@af_ms" />
                <SocialLink label="GITHUB" value="/af-motorsport" />
              </div>
            </div>
          </div>
        </div>

        {/* Global Garage Locations - Static Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-white/10 mb-12">
          {GLOBAL_GARAGES.map((loc) => (
            <div key={loc.id} className="relative w-full h-[400px] bg-black overflow-hidden group">
              <Map
                viewport={loc.viewport}
                theme="dark"
                interactive={false} // Static view
              >
                <MapControls position="bottom-right" showZoom />
                <MapMarker longitude={loc.coord[0]} latitude={loc.coord[1]}>
                  <MarkerContent className="flex flex-col items-center">
                    <div className="size-4 rotate-45 border border-white bg-black flex items-center justify-center">
                      <div className="size-2 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    </div>
                  </MarkerContent>
                  <MarkerLabel position="bottom" className="bg-black border border-zinc-800 text-[7px] font-black text-white px-2 py-0.5 mt-2 tracking-widest uppercase">
                    {loc.label}
                  </MarkerLabel>
                </MapMarker>
              </Map>

              <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-sm border border-zinc-800 p-4 min-w-[180px]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <Globe className="size-3 text-primary animate-pulse" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <h4 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">{loc.city}</h4>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${loc.coord[1]},${loc.coord[0]}`} target="_blank" rel="noopener noreferrer" className="size-8 bg-black border border-zinc-900 flex items-center justify-center text-zinc-700 group-hover:text-white group-hover:bg-primary transition-all hover:border-white">
                    <ArrowRight size={14} className="-rotate-45" />
                  </a>
                </div>
                <div className="pt-2 border-t border-zinc-900 flex flex-col gap-1">
                  <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">{loc.details}</span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight">{`${loc.coord[1].toFixed(4)}° N, ${loc.coord[0].toFixed(4)}° E`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bar */}
        <div className="w-full h-24 bg-zinc-950 border border-zinc-900 flex items-center justify-between px-12 relative overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}>
          <div className="flex flex-col gap-2">
            <span className="text-[40px] md:text-[50px] font-black italic text-zinc-900 leading-none tracking-tighter uppercase select-none">
              AF MOTORSPORT
            </span>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

function ContactDetail({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="size-12 bg-black border border-zinc-900 flex items-center justify-center text-zinc-700 group-hover:text-primary transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="block text-[7px] font-black text-zinc-800 uppercase tracking-widest">{label}</span>
        <span className="block text-xl font-black text-white uppercase italic tracking-tighter leading-none">{value}</span>
        <span className="block text-[9px] font-bold text-zinc-700 uppercase italic">{sub}</span>
      </div>
    </div>
  )
}

function SocialLink({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black p-6 hover:bg-zinc-950 transition-colors group cursor-pointer">
      <span className="block text-[7px] font-black text-zinc-800 uppercase mb-1 tracking-widest">{label}</span>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tight group-hover:text-white transition-colors">{value}</span>
        <ArrowRight size={10} className="text-zinc-900 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  )
}