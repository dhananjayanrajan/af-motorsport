'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormItem } from '@/components/forms/FormItem'
import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  type MapViewport,
} from '@/components/ui/map'
import {
  Clock,
  Mail,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type ContactFormData = {
  name: string
  email: string
  subject: string
  phone: string
  message: string
}

const GLOBAL_NODES = [
  {
    id: 'node_01',
    city: 'New York',
    point: [-74.0060, 40.7128] as [number, number],
    view: { center: [-74.0060, 40.7128], zoom: 11, bearing: 0, pitch: 0 } as MapViewport
  },
  {
    id: 'node_02',
    city: 'Lisbon',
    point: [-9.1393, 38.7223] as [number, number],
    view: { center: [-9.1393, 38.7223], zoom: 11, bearing: 0, pitch: 0 } as MapViewport
  }
]

export default function ContactUsSection() {
  const [mounted, setMounted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { formState: { isLoading }, handleSubmit, register, reset } = useForm<ContactFormData>()

  const onSubmit = useCallback(async (data: ContactFormData) => {
    await new Promise(r => setTimeout(r, 1500))
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 4000)
  }, [reset])

  if (!mounted) return null

  return (
    <section className="w-full bg-white-pure flex flex-col border-b border-black-pure">
      <SectionHeader
        variant={2}
        title="Contact"
        subtitle="Global Support"
        officialLabel="Active"
        championships={[]}
      />

      <div className="flex flex-col lg:flex-row border-b border-black-pure">
        <div className="w-full lg:w-1/2 flex flex-col border-r border-black-pure">
          <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-4 md:gap-5 bg-black-pure border-b border-black-pure">
            <SectionMainTitle
              variant={1}
              label="Reach Out"
              lineOne="Send"
              lineTwo="Message"
              highlight="Today"
            />
            <SectionDescription
              variant={1}
              text="Direct access to our teams for partnerships, support, and facility inquiries worldwide."
            />
          </div>

          <div className="grid grid-cols-2">
            <button className="p-5 md:p-6 lg:p-7 border-r border-b border-black-pure hover:bg-primary-500 transition-all group text-left focus:outline-none">
              <Mail size={16} className="text-primary-500 group-hover:text-black-pure mb-3" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 group-hover:text-black-pure block mb-0.5">Email</span>
              <span className="text-sm font-race font-black italic uppercase text-primary-500 group-hover:text-black-pure tracking-tighter">Write Us</span>
            </button>
            <button className="p-5 md:p-6 lg:p-7 border-b border-black-pure hover:bg-secondary-500 transition-all group text-left focus:outline-none">
              <Phone size={16} className="text-secondary-500 group-hover:text-white-pure mb-3" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 group-hover:text-white-pure block mb-0.5">Phone</span>
              <span className="text-sm font-race font-black italic uppercase text-secondary-500 group-hover:text-white-pure tracking-tighter">Call Us</span>
            </button>
            <div className="p-5 md:p-6 lg:p-7 border-r border-black-pure bg-secondary-500/5 flex flex-col">
              <Clock size={16} className="text-tertiary-500 mb-3" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 block mb-0.5">Hours</span>
              <span className="text-sm font-race font-black italic uppercase text-tertiary-500 tracking-tighter">24/7 Access</span>
            </div>
            <div className="p-5 md:p-6 lg:p-7 bg-primary-500/5 flex flex-col">
              <Zap size={16} className="text-primary-500 mb-3" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 block mb-0.5">Status</span>
              <span className="text-sm font-race font-black italic uppercase text-primary-500 tracking-tighter">Live Support</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 bg-white-100 flex flex-col justify-center border-l border-black-pure">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <FormItem>
                <ClippedInput
                  label="Name"
                  placeholder="Enter your name"
                  {...register('name', { required: true })}
                />
              </FormItem>
              <FormItem>
                <ClippedInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { required: true })}
                />
              </FormItem>
            </div>

            <FormItem>
              <ClippedInput
                label="Subject"
                placeholder="What is this regarding?"
                {...register('subject')}
              />
            </FormItem>

            <FormItem>
              <ClippedInput
                label="Message"
                placeholder="How can we help?"
                {...register('message', { required: true })}
              />
            </FormItem>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full h-14 flex items-center justify-between px-6 bg-black-pure text-white-pure hover:bg-primary-500 transition-all duration-500 group focus:outline-none"
            >
              <span className="text-sm font-race font-black italic uppercase tracking-tighter">
                {isLoading ? 'Sending' : isSuccess ? 'Sent' : 'Send Message'}
              </span>
              <div className="flex items-center gap-4">
                {isSuccess ? <ShieldCheck size={18} className="text-white-pure" /> : <Send size={18} className="group-hover:translate-x-1 transition-transform text-white-pure" />}
              </div>
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {GLOBAL_NODES.map((node) => (
          <div key={node.id} className="flex flex-col border-r border-black-pure last:border-r-0">
            <div className="h-[320px] relative border-b border-black-pure">
              <Map viewport={node.view} theme="light" interactive={false}>
                <MapMarker longitude={node.point[0]} latitude={node.point[1]}>
                  <MarkerContent>
                    <div className="w-6 h-6 bg-primary-500 flex items-center justify-center border-2 border-black-pure shadow-lg" />
                  </MarkerContent>
                  <MarkerLabel position="bottom" className="mt-2">
                    <div className="bg-black-pure text-white-pure px-3 py-1 text-[8px] font-black uppercase tracking-[0.3em]">
                      {node.city}
                    </div>
                  </MarkerLabel>
                </MapMarker>
              </Map>
            </div>

            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${node.point[1]},${node.point[0]}`, '_blank')}
              className="p-6 md:p-7 lg:p-8 flex items-center justify-between group hover:bg-secondary-500 transition-all duration-500 focus:outline-none"
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation size={14} className="text-secondary-500 group-hover:text-white-pure transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 group-hover:text-white-pure transition-colors">Our Location</span>
                </div>
                <span className="text-xl md:text-2xl font-race font-black italic uppercase text-black-pure group-hover:text-white-pure tracking-tighter transition-colors">
                  {node.city}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-black-pure">
        {['Instagram', 'LinkedIn', 'X', 'GitHub'].map((social) => (
          <button
            key={social}
            className="p-6 md:p-7 lg:p-8 border-r border-black-pure last:border-r-0 hover:bg-tertiary-500 group transition-all duration-500 text-left focus:outline-none"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black-pure/60 group-hover:text-white-pure block mb-1">Social</span>
            <span className="text-base md:text-lg font-race font-black italic uppercase text-tertiary-500 group-hover:text-white-pure tracking-tighter transition-colors">{social}</span>
          </button>
        ))}
      </div>

      <SectionFooter
        variant={1}
        navigateLabel="Network"
        entryPointsLabel="Contact"
        championships={[]}
      />
    </section>
  )
}