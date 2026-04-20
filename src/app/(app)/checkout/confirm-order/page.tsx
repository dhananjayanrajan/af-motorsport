'use client'

import { ConfirmOrder } from '@/components/checkout/ConfirmOrder'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'

export default function ConfirmOrderPage() {
  return (
    <main className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Verification" subtitle="In progress" variant={3} />

      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-3xl">
          <div className="border border-black-pure bg-white-pure p-1">
            <div className="border border-black-pure p-10 md:p-16">
              <ConfirmOrder />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="size-2 bg-black-pure" />
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure opacity-40">
                Secure check active
              </span>
            </div>
            <div className="flex gap-1">
              <div className="h-4 w-1 bg-black-pure" />
              <div className="h-4 w-1 bg-black-pure opacity-40" />
              <div className="h-4 w-1 bg-black-pure opacity-10" />
            </div>
          </div>
        </div>
      </div>

      <SectionFooter variant={3} />
    </main>
  )
}