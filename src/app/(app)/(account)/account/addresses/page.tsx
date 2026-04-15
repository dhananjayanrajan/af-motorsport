import { AddressListing } from '@/components/addresses/AddressListing'
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
    <div className="space-y-12">
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Delivery Management
              </span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">
              Saved <span className="text-zinc-300">Addresses</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight text-right max-w-[220px] leading-relaxed">
              Configure your primary shipping and billing locations for faster checkout.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-8 md:p-12 shadow-sm">
          <AddressListing />
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Manage your shipping and billing addresses.',
  openGraph: mergeOpenGraph({ title: 'Addresses', url: '/account/addresses' }),
  title: 'Addresses',
}