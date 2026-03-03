import { AccountForm } from '@/components/forms/AccountForm'
import { OrderItem } from '@/components/OrderItem'
import { Order } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { ChevronRight, History, Settings } from 'lucide-react'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function AccountPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your account.')}`)
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
      where: { customer: { equals: user?.id } },
    })
    orders = ordersResult?.docs || []
  } catch (error) { }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 px-8 max-w-7xl mx-auto space-y-48">

      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Settings className="h-3 w-3 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 leading-none">Identity Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
              Account <span className="text-zinc-800">/ Profile</span>
            </h1>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest leading-relaxed">
              Verify your designation and active communication channels.
            </p>
          </div>
        </div>
        <AccountForm />
      </section>

      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <History className="h-3 w-3 text-zinc-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 leading-none">Mission History</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white leading-none">
              Recent <span className="text-zinc-800">/ Orders</span>
            </h2>
          </div>
          <Link href="/orders" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-red-600 transition-colors mb-2">
            Archive Access <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-900">
          {(!orders || orders.length === 0) ? (
            <div className="py-24 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-900 italic">No mission data available</span>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="py-6 transition-colors hover:bg-zinc-950/50">
                <OrderItem order={order} />
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  )
}

export const metadata: Metadata = {
  description: 'Manage your AF Motorsport profile.',
  openGraph: mergeOpenGraph({ title: 'Account', url: '/account' }),
  title: 'Account',
}