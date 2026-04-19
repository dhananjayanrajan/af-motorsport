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
    <div className="w-full space-y-16">
      <div className="flex flex-col gap-8 border-b-4 border-black-pure pb-12 relative">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-black-pure" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-black-pure">
            PAST DATA
          </span>
        </div>
        <h1 className="text-6xl font-black text-black-pure uppercase tracking-tighter leading-none">
          MY <span className="text-tertiary-500">ORDERS</span>
        </h1>
        <p className="text-xs font-black text-black-pure uppercase tracking-tight max-w-sm leading-tight">
          VIEW YOUR ENTIRE BUYING HISTORY AND TRACK YOUR CURRENT ITEMS.
        </p>
        <div className="absolute -bottom-1 left-0 flex gap-1">
          <div className="h-1 w-32 bg-tertiary-500" />
          <div className="h-1 w-8 bg-black-pure" />
        </div>
      </div>

      <div className="bg-white-pure border-4 border-black-pure overflow-hidden">
        {(!orders || !Array.isArray(orders) || orders?.length === 0) ? (
          <div className="p-32 flex flex-col items-center justify-center text-center gap-6 bg-white-pure">
            <div className="size-16 border-4 border-black-pure flex items-center justify-center">
              <History className="h-8 w-8 text-black-pure opacity-10" />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] font-black text-black-pure/20">
              NO ORDERS FOUND
            </p>
          </div>
        ) : (
          <div className="divide-y-4 divide-black-pure">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="p-10 transition-colors hover:bg-tertiary-500/5"
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