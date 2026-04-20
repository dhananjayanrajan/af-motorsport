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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black-pure pb-10 relative">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="size-2.5 bg-primary-500 border-2 border-black-pure" />
              <MapPin className="h-3.5 w-3.5 text-black-pure" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black-pure">
                DELIVERY LOGISTICS
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-black-pure leading-none">
              SAVED <span className="text-secondary-500">LOCATIONS</span>
            </h1>
          </div>

          <div className="flex items-start gap-3 max-w-xs border-l-4 border-black-pure pl-6">
            <p className="text-[10px] font-black uppercase tracking-tight text-black-pure leading-tight">
              CONFIGURE PRIMARY SHIPPING AND BILLING INFRASTRUCTURE FOR ACCELERATED TRANSACTION PROCESSING.
            </p>
          </div>

          <div className="absolute -bottom-1 left-0 flex gap-1">
            <div className="h-1 w-16 bg-primary-500" />
            <div className="h-1 w-8 bg-secondary-500" />
            <div className="h-1 w-4 bg-tertiary-500" />
          </div>
        </div>

        <div className="bg-white-pure border-4 border-black-pure p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <MapPin className="size-24 text-black-pure" />
          </div>
          <div className="relative z-10">
            <AddressListing />
          </div>
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