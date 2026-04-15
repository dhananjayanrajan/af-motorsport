import type { Order } from '@/payload-types'
import type { Metadata } from 'next'

import { OrderItem } from '@/components/OrderItem'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { History } from 'lucide-react'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Orders() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent('Please login to access your orders.')}`)
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 0,
      pagination: false,
      user,
      overrideAccess: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
  } catch (error) { }

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col gap-6 border-b border-zinc-200 pb-10">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-zinc-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Purchase History
          </span>
        </div>
        <h1 className="text-4xl font-black text-black italic uppercase tracking-tighter leading-none">
          My <span className="text-zinc-300">Orders</span>
        </h1>
        <p className="text-[11px] text-zinc-400 uppercase tracking-tight font-bold max-w-sm">
          Review your past orders and track current shipments.
        </p>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
        {(!orders || !Array.isArray(orders) || orders?.length === 0) ? (
          <div className="p-24 flex flex-col items-center justify-center text-center gap-4 bg-zinc-50/50">
            <p className="text-[11px] uppercase tracking-widest font-black text-zinc-300 italic">
              No orders found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="p-6 transition-colors hover:bg-zinc-50"
              >
                <OrderItem order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'View your order history.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
  title: 'Orders',
}