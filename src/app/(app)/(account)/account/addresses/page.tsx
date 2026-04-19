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
    <div className="space-y-16">
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black-pure pb-12 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-3 bg-primary-500 border-2 border-black-pure" />
              <MapPin className="h-4 w-4 text-black-pure" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-black-pure">
                DELIVERY LOGISTICS
              </span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-black-pure leading-none">
              SAVED <span className="text-secondary-500">LOCATIONS</span>
            </h1>
          </div>

          <div className="flex items-start gap-4 max-w-xs border-l-4 border-black-pure pl-8">
            <p className="text-xs font-black uppercase tracking-tight text-black-pure leading-tight">
              CONFIGURE PRIMARY SHIPPING AND BILLING INFRASTRUCTURE FOR ACCELERATED TRANSACTION PROCESSING.
            </p>
          </div>

          <div className="absolute -bottom-1 left-0 flex gap-1">
            <div className="h-1 w-20 bg-primary-500" />
            <div className="h-1 w-10 bg-secondary-500" />
            <div className="h-1 w-5 bg-tertiary-500" />
          </div>
        </div>

        <div className="bg-white-pure border-4 border-black-pure p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <MapPin className="size-32 text-black-pure" />
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