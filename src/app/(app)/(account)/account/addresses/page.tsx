import { AddressListing } from '@/components/addresses/AddressListing'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function AddressesPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your account settings.')}`)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-12 pb-32 px-8 max-w-7xl mx-auto">
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-3 w-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
              <span className={cn("text-[10px] font-black uppercase leading-none", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Logistics Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
              Shipping <span className="text-zinc-800">/ Registry</span>
            </h1>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest leading-relaxed">
              Manage deployment locations and delivery coordinates.
            </p>
          </div>
        </div>

        <AddressListing />
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Manage your addresses.',
  openGraph: mergeOpenGraph({ title: 'Addresses', url: '/account/addresses' }),
  title: 'Addresses',
}