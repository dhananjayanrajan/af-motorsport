'use client'

import { Organization } from '@/payload-types'
import Link from 'next/link'

interface CTAProps {
  headline?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  organizations?: Organization[]
}

export function CTA({
  headline = 'JOIN THE GRID',
  subtext = 'Enter the next phase of motorsport engineering.',
  buttonLabel = 'ENROLL NOW',
  buttonUrl = '/join',
  organizations = []
}: CTAProps) {
  const currentYear = new Date().getFullYear()

  return (
    <section className="relative w-full bg-white-50 flex flex-col border-t-2 border-black-pure overflow-hidden">

      <div className="h-16 bg-white-200 flex items-center px-8 border-b-2 border-black-pure justify-between">
        <span className="text-black-pure font-mono text-xs font-black tracking-[0.4em] uppercase">
          RECRUITMENT PORTAL
        </span>
        <div className="flex items-center gap-4">
          <div className="size-2 bg-primary animate-pulse" />
          <span className="text-[10px] font-mono font-black text-black-pure uppercase opacity-40">
            ACTIVE
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full border-b-2 border-black-pure">

        <main className="flex-1 flex flex-col bg-white-pure border-r-0 lg:border-r-2 border-black-pure">
          <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <div className="max-w-3xl space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-12 bg-primary" />
                <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
                  PHASE ONE
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black-pure leading-none">
                {headline}
              </h2>

              <p className="text-base md:text-lg font-sans font-bold uppercase leading-tight text-black-pure opacity-70 max-w-lg">
                {subtext}
              </p>

              <div className="pt-6">
                <Link
                  href={buttonUrl || '#'}
                  className="inline-flex items-center px-8 h-14 bg-black-pure text-white-pure hover:bg-primary hover:text-black-pure transition-colors duration-300 group"
                >
                  <span className="text-xs font-mono font-black uppercase tracking-widest">
                    {buttonLabel}
                  </span>
                  <div className="ml-4 w-6 h-px bg-white-pure group-hover:bg-black-pure transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-[480px] bg-white-50 flex flex-col shrink-0 divide-y-2 divide-black-pure">

          <div className="p-10 bg-secondary flex flex-col justify-between aspect-square lg:aspect-auto lg:h-1/2 group">
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
              OVERVIEW
            </span>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b-2 border-black-pure pb-2">
                <span className="text-[10px] font-mono font-black text-black-pure opacity-40">YEAR</span>
                <span className="text-xl font-black text-black-pure">{currentYear}</span>
              </div>
              <div className="flex justify-between items-end border-b-2 border-black-pure pb-2">
                <span className="text-[10px] font-mono font-black text-black-pure opacity-40">AVAILABILITY</span>
                <span className="text-xl font-black text-black-pure">LIMITED</span>
              </div>
            </div>
            <div className="size-6 bg-black-pure group-hover:rotate-90 transition-transform duration-500" />
          </div>

          <div className="flex-1 p-10 flex flex-col justify-between bg-white-100">
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest mb-6">
              PARTNERS
            </span>
            <div className="grid grid-cols-1 gap-3">
              {organizations.slice(0, 3).map((org, i) => (
                <div key={org.id} className="flex items-center gap-4 group">
                  <span className="text-[10px] font-mono font-black text-black-pure opacity-20 group-hover:text-primary">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-black uppercase text-black-pure">
                    {org.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 h-10 grid grid-cols-4 gap-0.5">
              <div className="bg-primary" />
              <div className="bg-white-pure" />
              <div className="bg-secondary" />
              <div className="bg-tertiary-500" />
            </div>
          </div>

        </aside>
      </div>

      <footer className="h-12 bg-black-pure flex items-center px-8 justify-between">
        <span className="text-white-pure font-mono text-[9px] font-black tracking-[0.4em] uppercase">
          GRID PROTOCOL {currentYear}
        </span>
        <div className="flex gap-4 items-center">
          <div className="h-1 w-20 bg-white-pure opacity-10 relative">
            <div className="absolute inset-y-0 left-0 w-2/3 bg-primary" />
          </div>
        </div>
      </footer>

    </section>
  )
}