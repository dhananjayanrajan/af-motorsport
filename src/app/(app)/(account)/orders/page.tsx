import type { Order } from '@/payload-types'
import type { Metadata } from 'next'

import { OrderItem } from '@/components/OrderItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { Cpu, History } from 'lucide-react'
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
      <div className="flex flex-col gap-4 border-b border-zinc-900 pb-12">
        <div className="flex items-center gap-3">
          <History className="h-4 w-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className={cn("text-[9px] uppercase font-black", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
            Transaction Registry
          </span>
        </div>
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
          Order <span className="text-zinc-800">/ History</span>
        </h1>
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold max-w-sm leading-relaxed">
          Retrieving encrypted acquisition records from the AF Motorsport database.
        </p>
      </div>

      <div className="relative">
        {(!orders || !Array.isArray(orders) || orders?.length === 0) ? (
          <div
            className="p-12 border border-dashed border-zinc-900 flex flex-col items-center justify-center text-center gap-4"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
          >
            <div className="h-2 w-2 bg-zinc-800 rotate-45" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 italic">
              No Transaction Data Found
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8">
            {orders?.map((order, index) => (
              <li
                key={order.id}
                className="relative group transition-transform duration-500 hover:-translate-y-1"
              >
                <div
                  className="absolute -left-4 top-0 bottom-0 w-[1px] bg-zinc-900 transition-colors group-hover:bg-[currentColor]"
                  style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                />
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-12 flex items-center gap-4 text-zinc-800 border-t border-zinc-900/50">
        <Cpu className="h-4 w-4" />
        <span className="text-[8px] font-bold uppercase tracking-[0.5em] italic">
          Secure Archive Access Protocol v4.01
        </span>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Your orders.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
  title: 'Orders',
}