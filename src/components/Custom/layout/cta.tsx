'use client'

import { Organization } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
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
}: CTAProps) {
  return (
    <section className="relative w-full bg-white-pure">
      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto">
        <div className="border-2 border-black-pure bg-white-pure flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary-500" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black-pure">
                {headline}
              </h2>
            </div>
            <p className="text-[10px] md:text-xs font-bold uppercase leading-tight text-black-pure max-w-md">
              {subtext}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="hidden lg:flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="size-1.5 bg-black-pure" />
              ))}
            </div>

            <Link
              href={buttonUrl || '#'}
              className="group flex-1 md:flex-none h-12 px-6 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-200 flex items-center justify-center gap-4 outline-none border-2 border-black-pure"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                {buttonLabel}
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}