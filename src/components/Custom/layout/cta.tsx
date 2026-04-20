'use client'

import { Organization } from '@/payload-types'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface CTAProps {
  headline?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  organizations?: Organization[]
}

export function CTA({
  headline = 'JOIN THE TEAM',
  subtext = 'Enter the next phase of motorsport engineering.',
  buttonLabel = 'ENROLL NOW',
  buttonUrl = '/join',
  organizations = []
}: CTAProps) {
  return (
    <section className="relative w-full border-t-2 border-black-pure bg-white-pure overflow-hidden">
      <div className="flex flex-col lg:flex-row border-b-2 border-black-pure">
        <main className="flex-1 p-12 md:p-16 flex flex-col justify-center border-r-0 lg:border-r-2 border-black-pure">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-5 text-primary-500" />
              <span className="text-xs font-black text-black-pure tracking-widest uppercase">RECRUITMENT OPEN</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black-pure leading-tight">
              {headline}
            </h2>
            <p className="text-sm font-sans font-bold uppercase text-black-pure/60 max-w-md leading-relaxed">
              {subtext}
            </p>
            <div className="pt-2">
              <Link
                href={buttonUrl || '#'}
                className="group h-16 px-10 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300 inline-flex items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <span className="text-xs font-black uppercase tracking-widest">{buttonLabel}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-[400px] flex flex-col divide-y-2 divide-black-pure shrink-0 bg-white-100">
          <div className="p-10 bg-secondary-500 flex flex-col justify-between h-56 group hover:bg-black-pure transition-colors duration-500">
            <span className="text-xs font-black text-black-pure group-hover:text-white-pure tracking-widest uppercase">AVAILABILITY</span>
            <div className="space-y-2">
              <div className="flex justify-between items-end border-b-2 border-black-pure group-hover:border-white-pure pb-2">
                <span className="text-[10px] font-black text-black-pure/40 group-hover:text-white-pure/40">LEVEL</span>
                <span className="text-2xl font-black text-black-pure group-hover:text-white-pure">LIMITED</span>
              </div>
            </div>
            <div className="size-6 bg-black-pure group-hover:bg-primary-500 transition-all duration-500" />
          </div>

          <div className="flex-1 p-10 flex flex-col justify-between bg-white-pure">
            <span className="text-[10px] font-black text-black-pure tracking-widest uppercase mb-6">AFFILIATED GROUPS</span>
            <div className="grid grid-cols-1 gap-3">
              {organizations.slice(0, 3).map((org, i) => (
                <div key={org.id} className="flex items-center gap-4 group">
                  <span className="text-xs font-mono font-black text-primary-500">{i + 1}</span>
                  <span className="text-xs font-black uppercase text-black-pure group-hover:translate-x-1 transition-transform">
                    {org.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 h-1.5 flex gap-1">
              <div className="flex-1 bg-primary-500" />
              <div className="flex-1 bg-secondary-500" />
              <div className="flex-1 bg-tertiary-500" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}