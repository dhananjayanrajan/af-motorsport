'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
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
import {
  ArrowRight,
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck
} from 'lucide-react'
import { useCallback, useState } from 'react'
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
    details: 'North American Operations Hub',
    address: 'Brooklyn Navy Yard, NY',
    viewport: { center: [-74.0060, 40.7128], zoom: 12, bearing: 0, pitch: 0 } as MapViewport
  },
  {
    id: 'portugal_deploy',
    city: 'Lisbon',
    coord: [-9.1393, 38.7223] as [number, number],
    label: 'NODE_EU',
    details: 'European R&D Center',
    address: 'Parque das Nações, Lisbon',
    viewport: { center: [-9.1393, 38.7223], zoom: 12, bearing: 0, pitch: 0 } as MapViewport
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
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("SUBMISSION_ERROR", error)
    }
  }, [reset])

  return (
    <section className="relative w-full bg-white py-24 md:py-32 border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                Direct Uplink
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
              Secure<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Channel</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
              Response Protocol • Active
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-100 bg-white">
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                        Full Name
                      </label>
                      <ClippedInput
                        placeholder="Enter your name"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && <FormError message={errors.name.message} className="text-[9px] mt-1" />}
                    </FormItem>

                    <FormItem className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                        Email
                      </label>
                      <ClippedInput
                        type="email"
                        placeholder="your@email.com"
                        {...register('email', { required: 'Email is required' })}
                      />
                      {errors.email && <FormError message={errors.email.message} className="text-[9px] mt-1" />}
                    </FormItem>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                        Subject
                      </label>
                      <ClippedInput
                        placeholder="Inquiry type"
                        {...register('subject')}
                      />
                    </FormItem>

                    <FormItem className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                        Phone (Optional)
                      </label>
                      <ClippedInput
                        placeholder="Contact number"
                        {...register('phone')}
                      />
                    </FormItem>
                  </div>

                  <FormItem className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                      Message
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full bg-zinc-50 border border-zinc-100 p-4 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                    {errors.message && <FormError message={errors.message.message} className="text-[9px] mt-1" />}
                  </FormItem>

                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="flex items-center gap-3 px-8 py-4 bg-black text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                      {isLoading ? 'Sending...' : isSuccess ? 'Message Sent' : 'Send Message'}
                    </span>
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSuccess ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <div className="border border-zinc-100 bg-white h-full">
              <div className="p-8 md:p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                  Contact Information
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 shrink-0">
                      <Mail size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Email</p>
                      <a href="mailto:general@afmotorsport.com" className="text-sm font-black uppercase tracking-tight hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        general@afmotorsport.com
                      </a>
                      <p className="text-[9px] mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Primary contact for inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 shrink-0">
                      <Phone size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Phone</p>
                      <p className="text-sm font-black uppercase tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>+351 21 123 4567</p>
                      <p className="text-[9px] mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Mon-Fri, 9am - 6pm WET</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 shrink-0">
                      <Clock size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-wider mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Response Time</p>
                      <p className="text-sm font-black uppercase tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>Within 24 Hours</p>
                      <p className="text-[9px] mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Business days excluding holidays</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-zinc-100">
                  <p className="text-[9px] font-black uppercase tracking-wider mb-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Digital Network</p>
                  <div className="flex gap-3">
                    {['Instagram', 'LinkedIn', 'X', 'GitHub'].map((social, i) => (
                      <div key={i} className="text-[11px] font-black uppercase tracking-wide hover:text-primary-500 transition-colors cursor-pointer" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                        {social}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
              Global Facilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GLOBAL_GARAGES.map((loc) => (
              <div key={loc.id} className="border border-zinc-100 bg-white overflow-hidden">
                <div className="relative h-[280px] bg-zinc-50">
                  <Map viewport={loc.viewport} theme="light" interactive={false}>
                    <MapControls position="bottom-right" showZoom />
                    <MapMarker longitude={loc.coord[0]} latitude={loc.coord[1]}>
                      <MarkerContent className="flex flex-col items-center">
                        <div className="w-3 h-3 rotate-45 border-2 border-primary-500 bg-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </div>
                      </MarkerContent>
                      <MarkerLabel position="bottom" className="text-[8px] font-black px-2 py-1 mt-2 tracking-wider bg-black text-white">
                        {loc.label}
                      </MarkerLabel>
                    </MapMarker>
                  </Map>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{loc.city}</h4>
                      <p className="text-[9px] font-black uppercase tracking-wider mt-1" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{loc.details}</p>
                    </div>
                    <Building2 size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                  </div>

                  <div className="flex items-center gap-2 text-[10px]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                    <MapPin size={12} />
                    <span>{loc.address}</span>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.coord[1]},${loc.coord[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[9px] font-black uppercase tracking-wider hover:gap-3 transition-all"
                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                  >
                    Get Directions <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100">
          <div className="bg-white p-6 text-center">
            <p className="text-2xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>50+</p>
            <p className="text-[8px] font-black uppercase tracking-wider mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Team Members</p>
          </div>
          <div className="bg-white p-6 text-center">
            <p className="text-2xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>12+</p>
            <p className="text-[8px] font-black uppercase tracking-wider mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Global Locations</p>
          </div>
          <div className="bg-white p-6 text-center">
            <p className="text-2xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>100%</p>
            <p className="text-[8px] font-black uppercase tracking-wider mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Commitment</p>
          </div>
          <div className="bg-white p-6 text-center">
            <p className="text-2xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>24/7</p>
            <p className="text-[8px] font-black uppercase tracking-wider mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}