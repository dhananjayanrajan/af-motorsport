import { AccountForm } from '@/components/forms/AccountForm'
import { OrderItem } from '@/components/OrderItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Order } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { ChevronRight, History } from 'lucide-react'
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
    <div className="space-y-32">
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="h-1 w-6"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Member Profile
              </span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">
              Account <span className="text-zinc-300">Settings</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight text-right max-w-[200px]">
              Manage your personal information and contact preferences.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-8 md:p-12 shadow-sm">
          <AccountForm />
        </div>
      </section>

      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <History className="h-3 w-3 text-zinc-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Purchase History
              </span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">
              Recent <span className="text-zinc-300">Orders</span>
            </h2>
          </div>
          <Link
            href="/orders"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-black hover:opacity-60 transition-all mb-1"
          >
            View All Orders <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
          {(!orders || orders.length === 0) ? (
            <div className="py-24 text-center bg-zinc-50/50">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-300 italic">
                No orders found
              </span>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {orders.map((order) => (
                <div key={order.id} className="p-6 transition-colors hover:bg-zinc-50">
                  <OrderItem order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Manage your profile and view orders.',
  openGraph: mergeOpenGraph({ title: 'Account', url: '/account' }),
  title: 'Account',
}